'use strict';
import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __promise = services.promise;

import * as bootstrapModalDialog from './bootstrapModalDialog/bootstrapModalDialog.module';
import * as types from './dialogTypes';
import {
	factoryName as autosaveFactoryName,
	moduleName as autosaveModule,
	IAutosaveService,
	IAutosaveServiceFactory,
} from '../autosave/autosave.service';
import { IFormValidator } from '../../types/formValidators';

export { bootstrapModalDialog };
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

	constructor(private dialog: types.IDialogImplementation<TDialogSettings>
			, private $rootScope: angular.IRootScopeService
			, private autosaveFactory: IAutosaveServiceFactory
			, private promise: __promise.IPromiseUtility) { }

	open(options: TDialogSettings, closeHandler?: types.IDialogCloseHandler): types.IDialogInstance {
		return this.dialog.open(options, closeHandler);
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
			scope.$save = (): void => { this.autosave.autosave(this.data); };

			let instance: types.IAutosaveDialogInstance = <any>this.open(<any>options, this.autosaveCloseHandler);
			dialogInstance.close = instance.close;
			dialogInstance.dismiss = instance.dismiss;
			dialogInstance.save = instance.save;
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
	}
}

export interface IDialogServiceProvider<TDialogSettings> extends angular.IServiceProvider {
	setImplementation(dialogImplementation: types.IDialogImplementation<TDialogSettings>): void;
	$get(bootstrapModalDialog: bootstrapModalDialog.IBootstrapModalDialogService
		, $rootScope: angular.IRootScopeService
		, autosaveFactory: IAutosaveServiceFactory
		, promise: __promise.IPromiseUtility): IDialogService<TDialogSettings>;
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
			, promise: __promise.IPromiseUtility): IDialogService<TDialogSettings> => {
			let dialogImplementation: types.IDialogImplementation<TDialogSettings> = this.dialogImplementation != null
																			? this.dialogImplementation
																			: bootstrapModalDialog;
			return new DialogService<TDialogSettings>(dialogImplementation, $rootScope, autosaveFactory, promise);
		},
	};
	provider.$get.$inject = [bootstrapModalDialog.serviceName, '$rootScope', autosaveFactoryName, __promise.serviceName];
	return provider;
}

angular.module(moduleName, [bootstrapModalDialog.moduleName, autosaveModule])
	.provider(serviceName, dialogServiceProvider);
