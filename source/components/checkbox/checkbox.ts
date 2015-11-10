// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.checkbox';
export var directiveName: string = 'rlCheckbox';
export var controllerName: string = 'CheckboxController';

export class CheckboxController {
	// bindings
	ngDisabled: boolean;

	ngModel: angular.INgModelController;

	get checked(): boolean {
		return this.ngModel.$viewValue;
	}

	set checked(value: boolean) {
		this.ngModel.$setViewValue(value);
	}

	static $inject: string[] = ['$element'];
	constructor($element: angular.IAugmentedJQuery) {
		this.ngModel = $element.controller('ngModel');
	}
}

export function checkbox(): angular.IDirective {
	return {
		restrict: 'E',
		require: 'ngModel',
		transclude: true,
		template: require('./checkbox.html'),
		controller: controllerName,
		controllerAs: 'checkbox',
		scope: {},
		bindToController: {
			ngDisabled: '=',
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, checkbox)
	.controller(controllerName, CheckboxController);
