// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />

/// <reference path='dialog.service.ts' />

module rl.ui.services.dialog {
	'use strict';

	export var baseDialogServiceName: string = 'baseDialog';
	export var baseDialogControllerName: string = 'BaseDialogController';

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
			options.controller = baseDialogControllerName;
			options.scope = modalScope;
			return options;
		}
	}

	export interface IBaseDialogScope extends ng.IScope {
		modalController: string | Function;
	}

	export class BaseDialogController {
		static $inject: string[] = ['$scope', '$controller', baseDialogServiceName];
		constructor($scope: IBaseDialogScope
				, $controller: ng.IControllerService
				, baseDialog: BaseDialogService) {
			let controller: any;

			if ($scope.modalController != null) {
				controller = $controller(<any>$scope.modalController, { $scope: $scope });
			}

			$scope.$on('modal.closing', baseDialog.modalClosing);

			return controller;
		}
	}
}
