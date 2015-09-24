// /// <reference path='../../../../typings/angularjs/angular.d.ts' />

/// <reference path='baseDialog.service.ts' />

module rl.ui.services.dialog.baseDialog {
	'use strict';

	export var controllerName: string = 'BaseDialogController';

	export interface IBaseDialogScope extends ng.IScope {
		modalController: string | Function;
	}

	export class BaseDialogController {
		static $inject: string[] = ['$scope', '$controller', baseDialog.serviceName];
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
