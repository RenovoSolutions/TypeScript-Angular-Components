// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='autosaveDialog.service.ts' />

module rl.ui.services.autosaveDialog {
	'use strict';

	export var controllerName: string = 'AutosaveDialogController';

	export class AutosaveDialogController {
		form: string;
		formGetter: { (scope: ng.IScope): ng.IFormController };
		setForm: { (form: ng.IFormController): void };
		data: any;

		static $inject: string[] = ['$scope'];
		constructor(private $scope: IAutosaveDialogScope) {
			if ($scope.form != null) {
				var unbind: Function = $scope.$watch($scope.form, (form: ng.IFormController): void => {
					if (form != null) {
						$scope.setForm(form);
						unbind();
					}
				});
			}
			else if ($scope.formGetter != null) {
				var unbind: Function = $scope.$watch((): any => { return $scope.formGetter($scope); }, (form: ng.IFormController): void => {
					if (form != null) {
						$scope.setForm(form);
						unbind();
					}
				});
			}
		}
	}
}
