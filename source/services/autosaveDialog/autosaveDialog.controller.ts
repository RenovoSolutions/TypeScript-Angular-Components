'use strict';

import * as ng from 'angular';

import { IAutosaveDialogScope } from './autosaveDialog.service';
import { IFormValidator } from '../../types/formValidators';

export var controllerName: string = 'AutosaveDialogController';

export class AutosaveDialogController {
	form: string;
	formGetter: { (scope: ng.IScope): IFormValidator };
	setForm: { (form: IFormValidator): void };
	data: any;

	static $inject: string[] = ['$scope'];
	constructor(private $scope: IAutosaveDialogScope) {
		if ($scope.form != null) {
			var unbind: Function = $scope.$watch($scope.form, (form: IFormValidator): void => {
				if (form != null) {
					$scope.setForm(form);
					unbind();
				}
			});
		}
		else if ($scope.formGetter != null) {
			var unbind: Function = $scope.$watch((): any => { return $scope.formGetter($scope); }, (form: IFormValidator): void => {
				if (form != null) {
					$scope.setForm(form);
					unbind();
				}
			});
		}
	}
}
