/// <reference path='../../../typings/angularjs/angular.d.ts' />
/// <reference path='../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

/// <reference path='dialog.service.ts' />

module rl.ui.services.dialog {
	'use strict';

	export var baseDialogServiceName: string = 'baseDialog';

	export class BaseDialogService implements IDialogImplementation<ng.ui.bootstrap.IModalSettings> {
		static $inject: string[] = ['$modal'];
		constructor(private $modal: ng.ui.bootstrap.IModalService) { }

		open(options: ng.ui.bootstrap.IModalSettings): void {
			this.$modal.open(options);
		}
	}
}
