// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.checkbox';
export var componentName: string = 'rlCheckbox';
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

	$onInit(): void {
	}
}

export let checkbox: angular.IComponentOptions {
	require: { ngModel: 'ngModel' },
	transclude: true,
	template: require('./checkbox.html'),
	controller: controllerName,
	controllerAs: 'checkbox',
	bindings: {
		ngDisabled: '<?',
	},
};

angular.module(moduleName, [])
	.component(componentName, checkbox)
	.controller(controllerName, CheckboxController);
