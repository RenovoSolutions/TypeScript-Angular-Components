'use strict';
import * as ng from 'angular';

import { serviceName, BaseDialogService } from './baseDialog.service';

export var controllerName: string = 'BaseDialogController';

export interface IBaseDialogScope extends ng.IScope {
	modalController: string | Function;
	resolveData: any;
}

export class BaseDialogController {
	static $inject: string[] = ['$scope', '$controller', serviceName];
	constructor($scope: IBaseDialogScope
			, $controller: ng.IControllerService
			, baseDialog: BaseDialogService) {
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
