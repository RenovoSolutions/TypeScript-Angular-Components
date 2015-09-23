// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='autosaveDialog.service.ts' />

module rl.ui.services.autosaveDialog {
	'use strict';

	export var controllerName: string = 'AutosaveDialogController';

	export class AutosaveDialogController {
		static $inject: string[] = ['$scope'];
		constructor(private $scope: IAutosaveDialogScope) {
			_.each($scope.data, (property: any, key: string): void => {
				// don't allow data properties to overwrite controller properties
				if (this[key] == null) {
					this[key] = property;
				}
			});

			$scope.$on('modal.closing', this.dialogClosing);

			if ($scope.form != null) {
				var unbind: Function = $scope.$watch((): any => { return $scope[$scope.form]; }, (form: ng.IFormController): void => {
					if (form != null) {
						$scope.autosave.contentForm = form;
						unbind();
					}
				});
			}
			else if ($scope.formGetter != null) {
				var unbind: Function = $scope.$watch((): any => { return $scope.formGetter($scope); }, (form: ng.IFormController): void => {
					if (form != null) {
						$scope.autosave.contentForm = form;
						unbind();
					}
				});
			}
		}

		dialogClosing: { (event: ng.IAngularEvent, reason: any, explicitlyClosed: boolean): void }
		= (event: ng.IAngularEvent, reason: any, explicitlyClosed: boolean): void => {
			if (explicitlyClosed) {
				return;
			}

			var canClose: boolean = this.$scope.autosave.autosave(this);
			if (!canClose) {
				event.preventDefault();
			}
		}
	}
}
