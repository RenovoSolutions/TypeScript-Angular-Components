import * as ng from 'angular';

import { serviceName, BootstrapModalDialogService } from './bootstrapModalDialog.service';

export var controllerName: string = 'BootstrapModalDialogController';

export interface IBootstrapModalDialogScope extends ng.IScope {
	modalController: string | Function | (string | Function)[];
	resolveData: any;
}

export class BootstrapModalDialogController {
	static $inject: string[] = ['$scope', '$controller', serviceName];
	constructor($scope: IBootstrapModalDialogScope
			, $controller: ng.IControllerService
			, baseDialog: BootstrapModalDialogService) {
		let controller: any;

		if ($scope.modalController != null) {
			let locals: any = $scope.resolveData || {};
			$scope.resolveData = null;
			locals.$scope = $scope;

			controller = $controller(<any>$scope.modalController, locals);
		}

		$scope.$on('modal.closing', baseDialog.modalClosing);

		return controller;
	}
}
