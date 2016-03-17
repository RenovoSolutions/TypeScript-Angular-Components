'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __notification = services.notification;

import {
	moduleName as autosaveActionModuleName,
	serviceName as autosaveActionServiceName,
	IAutosaveActionService,
} from '../autosaveAction/autosaveAction.service';
import * as triggers from './triggers/triggers.service';
import { IFormService, serviceName as formServiceName, moduleName as formModule } from '../form/form.service';
import { IFormValidator } from '../../types/formValidators';

export { triggers };

export var moduleName: string = 'rl.ui.services.autosave';
export var factoryName: string = 'autosaveFactory';

export interface IAutosaveService {
	autosave(...data: any[]): boolean;
	contentForm: IFormValidator;
}

export interface IAutosaveServiceOptions {
	save: { (...data: any[]): angular.IPromise<void> };
	contentForm?: IFormValidator;
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
	private triggerService: triggers.ITriggerService;
	contentForm: IFormValidator;
	save: { (...data: any[]): angular.IPromise<void> };

	constructor(private notification: __notification.INotificationService
			, private autosaveService: IAutosaveActionService
			, options: IAutosaveServiceOptions
			, triggerServiceFactory: triggers.ITriggerServiceFactory
			, private formService: IFormService) {
		this.contentForm = options.contentForm || this.nullForm();
		this.save = options.save;

		this.triggerService = triggerServiceFactory.getInstance();
		this.configureTriggers(options);
		this.triggerService.setTriggers(options.triggers, this.autosave);
	}

	autosave: { (...data: any[]): boolean } = (...data: any[]): boolean => {
		if (this.contentForm.$pristine) {
			return true;
		}

		if (this.contentForm.$valid) {
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
			this.notification.warning(this.formService.getAggregateError(this.contentForm));
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

	private nullForm(): IFormValidator {
		return <any>{
			$pristine: false,
			$dirty: true,
			$valid: true,
			$setPristine(): void {
				return;
			},
		};
	}
}

export interface IAutosaveServiceFactory {
	getInstance(options: IAutosaveServiceOptions): IAutosaveService;
}

autosaveServiceFactory.$inject = [__notification.serviceName, autosaveActionServiceName, triggers.factoryName, formServiceName];
function autosaveServiceFactory(notification: __notification.INotificationService
							, autosaveService: IAutosaveActionService
							, triggerServiceFactory: triggers.ITriggerServiceFactory
							, formService: IFormService): IAutosaveServiceFactory {
	'use strict';
	return {
		getInstance(options: IAutosaveServiceOptions): IAutosaveService {
			return new AutosaveService(notification, autosaveService, options, triggerServiceFactory, formService);
		}
	};
}

angular.module(moduleName, [__notification.moduleName, autosaveActionModuleName, triggers.moduleName, formModule])
	.factory(factoryName, autosaveServiceFactory);
