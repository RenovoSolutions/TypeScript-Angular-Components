// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />

/// <reference path='../dialog.service.ts' />
/// <reference path='baseDialog.controller.ts' />

module rl.ui.services.dialog.baseDialog {
	'use strict';

	export var moduleName: string = 'rl.ui.services.dialog.baseDialog';
	export var serviceName: string = 'baseDialog';

	export interface IBaseDialogService extends IDialogService<ng.ui.bootstrap.IModalSettings> { }

	export class BaseDialogService implements IDialogImplementation<ng.ui.bootstrap.IModalSettings> {
		closeHandler: IDialogCloseHandler;

		static $inject: string[] = ['$modal', '$rootScope'];
		constructor(private $modal: ng.ui.bootstrap.IModalService
				, private $rootScope: ng.IRootScopeService) { }

		open(options: ng.ui.bootstrap.IModalSettings, closeHandler?: IDialogCloseHandler): void {
			this.closeHandler = closeHandler;
			options = this.configureModalSettings(options);
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

		private configureModalSettings(options: ng.ui.bootstrap.IModalSettings): ng.ui.bootstrap.IModalSettings {
			let modalScope: IBaseDialogScope = <IBaseDialogScope>options.scope;

			if (modalScope == null) {
				modalScope = <IBaseDialogScope>this.$rootScope.$new();
			}

			modalScope.modalController = options.controller;
			options.controller = controllerName;
			options.scope = modalScope;
			return options;
		}
	}

	angular.module(moduleName, [])
		.controller(controllerName, BaseDialogController)
		.service(serviceName, BaseDialogService);
}
