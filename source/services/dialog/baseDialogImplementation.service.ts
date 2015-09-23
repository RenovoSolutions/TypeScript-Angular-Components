// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />

/// <reference path='dialog.service.ts' />

module rl.ui.services.dialog {
	'use strict';

	export var baseDialogServiceName: string = 'baseDialog';

	export class BaseDialogService implements IDialogImplementation<ng.ui.bootstrap.IModalSettings> {
		closeHandler: IDialogCloseHandler;

		static $inject: string[] = ['$modal', '$rootScope'];
		constructor(private $modal: ng.ui.bootstrap.IModalService, $rootScope: ng.IRootScopeService) {
			$rootScope.$on('modal.closing', this.modalClosing);
		}

		open(options: ng.ui.bootstrap.IModalSettings, closeHandler?: IDialogCloseHandler): void {
			this.closeHandler = closeHandler;
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
		}
	}
}
