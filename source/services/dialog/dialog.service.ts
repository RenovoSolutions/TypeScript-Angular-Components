// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

/// <reference path='baseDialogImplementation.service.ts' />

module rl.ui.services.dialog {
	'use strict';

	export var moduleName: string = 'rl.ui.services.dialog';
	export var serviceName: string = 'dialog';

	export interface IDialogCloseHandler {
		(explicit: boolean): boolean;
	}

	export interface IDialogImplementation<TDialogSettings> {
		open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): void;
	}

	export interface IDialogService<TDialogSettings> {
		open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): void;
	}

	export class DialogService<TDialogSettings> implements IDialogService<TDialogSettings> {
		constructor(private dialog: IDialogImplementation<TDialogSettings>) { }

		open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): void {
			this.dialog.open(options, closeHandler);
		}
	}

	export interface IDialogServiceProvider<TDialogSettings> extends ng.IServiceProvider {
		setImplementation(dialogImplementation: IDialogImplementation<TDialogSettings>): void;
		$get(baseDialog: BaseDialogService): IDialogService<TDialogSettings>;
	}

	export function dialogServiceProvider<TDialogSettings>(): IDialogServiceProvider<TDialogSettings> {
		'use strict';

		var provider: IDialogServiceProvider<TDialogSettings> = {
			setImplementation: (dialogImplementation: IDialogImplementation<TDialogSettings>): void => {
				this.dialogImplementation = dialogImplementation;
			},
			$get: (baseDialog: BaseDialogService): IDialogImplementation<TDialogSettings> => {
				let dialogImplementation: IDialogImplementation<TDialogSettings> = this.dialogImplementation != null
																				? this.dialogImplementation
																				: baseDialog;
				return new DialogService<TDialogSettings>(dialogImplementation);
			},
		};
		provider.$get.$inject = [baseDialogServiceName];
		return provider;
	}

	angular.module(moduleName, [])
		.service(baseDialogServiceName, BaseDialogService)
		.provider(serviceName, dialogServiceProvider);
}
