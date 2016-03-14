'use strict';
import * as ng from 'angular';

import * as bootstrapModalDialog from './bootstrapModalDialog/bootstrapModalDialog.module';

export { bootstrapModalDialog };

export let moduleName: string = 'rl.ui.services.dialog';
export let serviceName: string = 'dialog';

export interface IDialogCloseHandler {
	(explicit: boolean): boolean;
}

export interface IDialogInstance {
	close(): void;
	dismiss(): void;
}

export interface IPromptSettings {
	acceptHandler(): void;
	cancelHandler?: {(): void};
	message: string;
	okButton?: string;
	cancelButton?: string;
}

export interface IPromptInstance extends IDialogInstance {
	accept(): void;
	cancel(): void;
}

export interface IDialogImplementation<TDialogSettings> {
	open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance;
	prompt(options: IPromptSettings, template: string): IPromptInstance;
}

export interface IDialogService<TDialogSettings> {
	open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance;
	prompt(options: IPromptSettings): IPromptInstance;
}

export class DialogService<TDialogSettings> implements IDialogService<TDialogSettings> {
	constructor(private dialog: IDialogImplementation<TDialogSettings>) { }

	open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance {
		return this.dialog.open(options, closeHandler);
	}

	prompt(options: IPromptSettings): IPromptInstance {
		options.okButton = options.okButton || 'Ok';
		options.cancelButton = options.cancelButton || 'Cancel';

		return this.dialog.prompt(options, require('./promptDialog.html'));
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
	provider.$get.$inject = [bootstrapModalDialog.serviceName];
	return provider;
}

ng.module(moduleName, [bootstrapModalDialog.moduleName])
	.provider(serviceName, dialogServiceProvider);
