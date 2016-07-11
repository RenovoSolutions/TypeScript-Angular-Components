import * as angular from 'angular';
import * as _ from 'lodash';

import { services, downgrade } from 'typescript-angular-utilities';
import __notification = services.notification;

import {
	moduleName as autosaveActionModuleName,
	serviceName as autosaveActionServiceName,
	IAutosaveActionService,
} from '../autosaveAction/autosaveAction.service';
import * as triggers from './triggers/triggers.service';
import { IFormService, serviceName as formServiceName, moduleName as formModule } from '../form/form.service.ng1';
import { IFormValidator } from '../../types/formValidators';

export { triggers };

export var moduleName: string = 'rl.ui.services.autosave';
export var factoryName: string = 'autosaveFactory';

export interface IAutosaveService {
	autosave(...data: any[]): boolean;
	validateAndSave(...data: any[]): Promise<void> | boolean;
	contentForm: IFormValidator;
}

export interface IAutosaveServiceOptions {
	save: { (...data: any[]): Promise<void> };
	contentForm?: IFormValidator;
	debounceDuration?: number;
	setChangeListener?: { (callback: triggers.IListener): triggers.IClearListener };
	triggers?: string;
	saveWhenInvalid?: boolean;
}

class AutosaveService implements IAutosaveService {
	private triggerService: triggers.ITriggerService;
	contentForm: IFormValidator;
	save: { (...data: any[]): Promise<void> };
	saveWhenInvalid: boolean;

	constructor(private notification: __notification.INotificationService
			, private autosaveService: IAutosaveActionService
			, options: IAutosaveServiceOptions
			, triggerServiceFactory: triggers.ITriggerServiceFactory
			, private formService: IFormService) {
		this.contentForm = options.contentForm || this.nullForm();
		this.save = options.save;
		this.saveWhenInvalid = options.saveWhenInvalid;

		this.triggerService = triggerServiceFactory.getInstance();
		this.configureTriggers(options);
		this.triggerService.setTriggers(options.triggers, this.autosave);
	}

	autosave: { (...data: any[]): boolean } = (...data: any[]): boolean => {
		let result: boolean | Promise<void> = this.validateAndSave(...data);
		if (_.isBoolean(result)) {
			return result;
		} else {
			this.autosaveService.trigger(result);
			return true;
		}
	}

	validateAndSave(...data: any[]): Promise<void> | boolean {
		if (this.contentForm.$pristine) {
			return true;
		}

		if (this.contentForm.$valid || this.saveWhenInvalid) {
			let promise: Promise<void> = this.save(...data);

			if (!_.isUndefined(promise)) {
				return promise.then((): void => {
					if (this.contentForm != null) {
						this.contentForm.$setPristine();
					}
				});
			}

			return true;
		} else {
			const error = this.formService.getAggregateError(this.contentForm);
			if (error) {
				this.notification.warning(error);
			} else {
				throw new Error('The form is invalid but there are no validation errors to show');
			}
			return false;
		}
	}

	private configureTriggers(options: IAutosaveServiceOptions): void {
		this.triggerService.triggers.onChange.configure({
			form: options.contentForm,
			setChangeListener: options.setChangeListener,
			debounceDuration: options.debounceDuration,
			saveWhenInvalid: options.saveWhenInvalid,
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

autosaveServiceFactory.$inject = [downgrade.notificationServiceName, autosaveActionServiceName, triggers.factoryName, formServiceName];
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

angular.module(moduleName, [downgrade.moduleName, autosaveActionModuleName, triggers.moduleName, formModule])
	.factory(factoryName, autosaveServiceFactory);
