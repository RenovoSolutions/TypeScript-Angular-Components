'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import {
	moduleName as autosaveActionModuleName,
	serviceName as autosaveActionServiceName,
	IAutosaveActionService,
} from '../autosaveAction/autosaveAction.service';
import * as triggers from './triggers/triggers';

export { triggers };

export var moduleName: string = 'rl.utilities.services.autosave';
export var factoryName: string = 'autosaveFactory';

export interface IAutosaveService {
	autosave(...data: any[]): boolean;
	contentForm: angular.IFormController;
}

export interface IAutosaveServiceOptions {
	save: { (...data: any[]): angular.IPromise<void> };
	validate?: { (): boolean };
	contentForm?: angular.IFormController;
	debounceDuration?: number;
	setChangeListener?: { (callback: IChangeListener): IClearChangeListener };
	triggers?: string;
}

export interface IChangeListener {
	(): void;
}

export interface IClearChangeListener {
	(): void;
}

class AutosaveService implements IAutosaveService {
	private hasValidator: boolean;
	contentForm: angular.IFormController;
	save: { (...data: any[]): angular.IPromise<void> };
	validate: { (): boolean };

	constructor(private $rootScope: angular.IRootScopeService
			, private $timeout: angular.ITimeoutService
			, private autosaveService: IAutosaveActionService
			, options: IAutosaveServiceOptions
			, private triggerService: triggers.ITriggerService) {
		this.hasValidator = options.validate != null;

		this.contentForm = options.contentForm || this.nullForm();
		this.save = options.save;
		this.validate = options.validate;

		this.configureTriggers(options);
		triggerService.setTriggers(options.triggers, this.autosave);
	}

	autosave: { (...data: any[]): boolean } = (...data: any[]): boolean => {
		if (this.contentForm.$pristine) {
			return true;
		}

		var valid: boolean = true;
		if (this.hasValidator) {
			valid = this.validate();
			if (valid === undefined) {
				valid = true;
			}
		}

		if (valid) {
			var promise: angular.IPromise<void> = this.save(...data);

			if (!_.isUndefined(promise)) {
				this.autosaveService.trigger(promise.then((): void => {
					if (this.contentForm != null) {
						this.contentForm.$setPristine();
					}
				}));
			}

			return true;
		} else {
			return false;
		}
	}

	private configureTriggers(options: IAutosaveServiceOptions): void {
		this.triggerService.triggers.onChange.configure({
			form: options.contentForm,
			setChangeListener: options.setChangeListener,
			debounceDuration: options.debounceDuration,
		});
	}

	private nullForm(): angular.IFormController {
		return <any>{
			$pristine: false,
			$dirty: true,
			$setPristine(): void {
				return;
			},
		};
	}
}

export interface IAutosaveServiceFactory {
	getInstance(options: IAutosaveServiceOptions): IAutosaveService;
}

autosaveServiceFactory.$inject = ['$rootScope', '$timeout', autosaveActionServiceName, triggers.serviceName];
function autosaveServiceFactory($rootScope: angular.IRootScopeService
							, $timeout: angular.ITimeoutService
							, autosaveService: IAutosaveActionService
							, triggerService: triggers.ITriggerService): IAutosaveServiceFactory {
	'use strict';
	return {
		getInstance(options: IAutosaveServiceOptions): IAutosaveService {
			return new AutosaveService($rootScope, $timeout, autosaveService, options, triggerService);
		}
	};
}

angular.module(moduleName, [autosaveActionModuleName, triggers.moduleName])
	.factory(factoryName, autosaveServiceFactory);
