'use strict';
import * as ng from 'angular';

import { serviceName, BaseDialogService } from './baseDialog.service';

export var controllerName: string = 'BaseDialogController';

export interface IBaseDialogScope extends ng.IScope {
	modalController: string | Function;
}

export class BaseDialogController {
	static $inject: string[] = ['$scope', '$controller', serviceName];
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
