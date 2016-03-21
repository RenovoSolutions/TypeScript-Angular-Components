'use strict';
import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __promise = services.promise;
import __notification = services.notification;

import * as bootstrapModalDialog from './bootstrapModalDialog/bootstrapModalDialog.module';
import * as types from './dialogTypes';
import {
	factoryName as autosaveFactoryName,
	moduleName as autosaveModule,
	IAutosaveService,
	IAutosaveServiceFactory,
} from '../autosave/autosave.service';
import { IFormService, serviceName as formServiceName, moduleName as formModule } from '../form/form.service';
import { IFormValidator } from '../../types/formValidators';

export { bootstrapModalDialog };
export { directiveName, controllerName, DialogController } from '../../components/dialog/dialog';
export * from './dialogTypes';

export let moduleName: string = 'rl.ui.services.dialog';
export let serviceName: string = 'dialog';

export interface IDialogService<TDialogSettings> {
	open(options: TDialogSettings, closeHandler?: types.IDialogCloseHandler): types.IDialogInstance;
	prompt(options: types.IPromptSettings): types.IPromptInstance;
	openAutosaveForm(options: types.IAutosaveDialogSettings): types.IAutosaveDialogInstance;
}

export class DialogService<TDialogSettings> implements IDialogService<TDialogSettings> {
	private autosave: IAutosaveService;
	private data: any;
	private form: IFormValidator;

	constructor(private dialog: types.IDialogImplementation<TDialogSettings>
			, private $rootScope: angular.IRootScopeService
			, private autosaveFactory: IAutosaveServiceFactory
			, private promise: __promise.IPromiseUtility
			, private notification: __notification.INotificationService
			, private formService: IFormService) { }

	open(options: TDialogSettings, closeHandler?: types.IDialogCloseHandler): types.IDialogInstance {
		let dialogInstance: types.IDialogInstance = this.dialog.open(options, closeHandler);
		dialogInstance.validateAndNotify = (): boolean => {
			let valid: boolean = this.form.$valid;

			if (!valid) {
				this.notification.warning(this.formService.getAggregateError(this.form));
			}

			return valid;
		};
		return dialogInstance;
	}

	prompt(options: types.IPromptSettings): types.IPromptInstance {
		options.okButton = options.okButton || 'Ok';
		options.cancelButton = options.cancelButton || 'Cancel';

		return this.dialog.prompt(options, require('./promptDialog.html'));
	}

	openAutosaveForm(options: types.IAutosaveDialogSettings): types.IAutosaveDialogInstance {
		let dialogInstance: types.IAutosaveDialogInstance = {
			close(): void {},
			dismiss(): void { },
			save(): void { },
			saveAndClose(): void { },
			validateAndNotify(): void { },
		};

		this.promise.resolvePromises(options.resolve).then((resolveData: any): void => {
			let scope: types.IAutosaveDialogScope = <types.IAutosaveDialogScope>options.scope;

			if (scope == null) {
				scope = <types.IAutosaveDialogScope>this.$rootScope.$new();
				options.scope = scope;
			}

			if (options.data == null) {
				options.data = {};
			}

			if (options.triggers == null) {
				options.triggers = 'none';
			}

			this.autosave = this.autosaveFactory.getInstance({
				save: options.save,
				triggers: options.triggers,
			});

			this.data = _.extend(options.data, resolveData);
			scope.dialog = this.data;

			let instance: types.IAutosaveDialogInstance = <any>this.open(<any>options, this.autosaveCloseHandler);
			dialogInstance.close = instance.close;
			dialogInstance.dismiss = instance.dismiss;

			let $save: {(): any} = (): any => { return this.autosave.validateAndSave(this.data); };
			scope.$save = $save;
			scope.$saveAndClose = (): void => {
				let canClose: boolean = $save();
				if (canClose) {
					instance.close();
				}
			};

			dialogInstance.save = scope.$save;
			dialogInstance.saveAndClose = scope.$saveAndClose;
			dialogInstance.validateAndNotify = instance.validateAndNotify;
		});

		return dialogInstance;
	}

	private autosaveCloseHandler: types.IDialogCloseHandler = (explicit: boolean): boolean => {
		if (explicit) {
			return true;
		}

		return this.autosave.autosave(this.data);
	}

	setForm(form: IFormValidator): void {
		if (this.autosave != null) {
			this.autosave.contentForm = form;
		}
		this.form = form;
	}
}

export interface IDialogServiceProvider<TDialogSettings> extends angular.IServiceProvider {
	setImplementation(dialogImplementation: types.IDialogImplementation<TDialogSettings>): void;
	$get(bootstrapModalDialog: bootstrapModalDialog.IBootstrapModalDialogService
		, $rootScope: angular.IRootScopeService
		, autosaveFactory: IAutosaveServiceFactory
		, promise: __promise.IPromiseUtility
		, notification: __notification.INotificationService
		, formService: IFormService): IDialogService<TDialogSettings>;
}

export function dialogServiceProvider<TDialogSettings>(): IDialogServiceProvider<TDialogSettings> {
	'use strict';

	let provider: IDialogServiceProvider<TDialogSettings> = {
		setImplementation: (dialogImplementation: types.IDialogImplementation<TDialogSettings>): void => {
			this.dialogImplementation = dialogImplementation;
		},
		$get: (bootstrapModalDialog: bootstrapModalDialog.IBootstrapModalDialogService
			, $rootScope: angular.IRootScopeService
			, autosaveFactory: IAutosaveServiceFactory
			, promise: __promise.IPromiseUtility
			, notification: __notification.INotificationService
			, formService: IFormService): IDialogService<TDialogSettings> => {
			let dialogImplementation: types.IDialogImplementation<TDialogSettings> = this.dialogImplementation != null
																			? this.dialogImplementation
																			: bootstrapModalDialog;
			return new DialogService<TDialogSettings>(dialogImplementation, $rootScope, autosaveFactory, promise, notification, formService);
		},
	};
	provider.$get.$inject = [bootstrapModalDialog.serviceName, '$rootScope', autosaveFactoryName, __promise.serviceName, __notification.serviceName, formServiceName];
	return provider;
}

angular.module(moduleName, [bootstrapModalDialog.moduleName, autosaveModule, __notification.moduleName, formModule])
	.provider(serviceName, dialogServiceProvider);
