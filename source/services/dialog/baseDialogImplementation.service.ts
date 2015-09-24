// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />

/// <reference path='dialog.service.ts' />

module rl.ui.services.dialog {
	'use strict';

	export var baseDialogServiceName: string = 'baseDialog';

	export interface IBaseDialogService extends IDialogService<ng.ui.bootstrap.IModalSettings> { }

	export class BaseDialogService implements IDialogImplementation<ng.ui.bootstrap.IModalSettings> {
		private unbindWatcher: Function;
		closeHandler: IDialogCloseHandler;

		static $inject: string[] = ['$modal'];
		constructor(private $modal: ng.ui.bootstrap.IModalService) {}

		open(options: ng.ui.bootstrap.IModalSettings, closeHandler?: IDialogCloseHandler): void {
			this.closeHandler = closeHandler;
			this.unbindWatcher = options.scope.$on('modal.closing', this.modalClosing);
			this.$modal.open(options);
		}

		modalClosing: { (event: ng.IAngularEvent, reason: any, explicitlyClosed: boolean): void }
			= (event: ng.IAngularEvent, reason: any, explicitlyClosed: boolean): void => {
			let canClose: boolean = true;

			if (_.isFunction(this.closeHandler)) {
				canClose = this.closeHandler(explicitlyClosed);
			}

			if (!canClose) {
				event.preventDefault();
			}

			this.unbindWatcher();
		}
	}
}
