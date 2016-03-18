'use strict';
import * as ng from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __promise = services.promise;

import * as bootstrapModalDialog from './bootstrapModalDialog/bootstrapModalDialog.module';
import * from './dialogTypes';
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
	open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance;
	prompt(options: IPromptSettings): IPromptInstance;
	openAutosaveForm(options: IAutosaveDialogSettings): void;
}

export class DialogService<TDialogSettings> implements IDialogService<TDialogSettings> {
	private autosave: IAutosaveService;
	private data: any;

	constructor(private dialog: IDialogImplementation<TDialogSettings>
			, private $rootScope: ng.IRootScopeService
			, private autosaveFactory: IAutosaveServiceFactory
			, private promise: __promise.IPromiseUtility) { }

	open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance {
		return this.dialog.open(options, closeHandler);
	}

	prompt(options: IPromptSettings): IPromptInstance {
		options.okButton = options.okButton || 'Ok';
		options.cancelButton = options.cancelButton || 'Cancel';

		return this.dialog.prompt(options, require('./promptDialog.html'));
	}

	openAutosaveForm(options: IAutosaveDialogSettings): void {
		this.promise.resolvePromises(options.resolve).then((resolveData: any): void => {
			let scope: IAutosaveDialogScope = <IAutosaveDialogScope>options.scope;

			if (scope == null) {
				scope = <IAutosaveDialogScope>this.$rootScope.$new();
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

			this.dialog.open(options, this.autosaveCloseHandler);
		});
	}

	private autosaveCloseHandler: IDialogCloseHandler = (explicit: boolean): boolean => {
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

export interface IDialogServiceProvider<TDialogSettings> extends ng.IServiceProvider {
	setImplementation(dialogImplementation: IDialogImplementation<TDialogSettings>): void;
	$get(bootstrapModalDialog: bootstrapModalDialog.IBootstrapModalDialogService): IDialogService<TDialogSettings>;
}

export function dialogServiceProvider<TDialogSettings>(): IDialogServiceProvider<TDialogSettings> {
	'use strict';

	let provider: IDialogServiceProvider<TDialogSettings> = {
		setImplementation: (dialogImplementation: IDialogImplementation<TDialogSettings>): void => {
			this.dialogImplementation = dialogImplementation;
		},
		$get: (bootstrapModalDialog: bootstrapModalDialog.IBootstrapModalDialogService): IDialogService<TDialogSettings> => {
			let dialogImplementation: IDialogImplementation<TDialogSettings> = this.dialogImplementation != null
																			? this.dialogImplementation
																			: bootstrapModalDialog;
			return new DialogService<TDialogSettings>(dialogImplementation);
		},
	};
	provider.$get.$inject = [bootstrapModalDialog.serviceName, '$rootScope', autosaveFactoryName, __promise.serviceName];
	return provider;
}

ng.module(moduleName, [bootstrapModalDialog.moduleName, autosaveModule])
	.provider(serviceName, dialogServiceProvider);
