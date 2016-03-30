'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';

import __boolean = services.boolean;

import { IToggleParams } from '../checkbox/checkbox';

export let moduleName: string = 'rl.ui.components.buttonToggle';
export let componentName: string = 'rlButtonToggle';
export let controllerName: string = 'ButtonToggleController';

export interface IButtonToggleBindings {
	type: string;
	size: string;
	onToggle(param: IToggleParams): void;
	disabled: boolean;
}

export interface IButtonToggleController extends IButtonToggleBindings {
	isActive: boolean;
	buttonClass: string;
	buttonSize: string;

	clicked(): void;
}

class ButtonToggleController implements IButtonToggleController {
	type: string;
	size: string;
	onToggle: { (param: IToggleParams): void };
	disabled: boolean;

	isActive: boolean;
	buttonClass: string;
	buttonSize: string;

	ngModel: angular.INgModelController;

	static $inject: string[] = ['$scope', __boolean.serviceName];
	constructor($scope: angular.IScope, bool: __boolean.IBooleanUtility) {
		this.buttonClass = this.type != null ? this.type : 'default';
		this.buttonSize = this.size != null ? 'btn-' + this.size : null;

		$scope.$watch('buttonToggle.ngModel.$modelValue', (value: boolean): void => {
			this.isActive = bool.toBool(value);

			if (value != null && _.isFunction(this.onToggle)) {
				this.onToggle({ value: value });
			}
		});
	}

	clicked(): void {
		this.ngModel.$setViewValue(!this.ngModel.$viewValue);
	}
}

let buttonToggle: angular.IComponentOptions = {
	require: { ngModel: '^ngModel' },
	transclude: true,
	template: require('./buttonToggle.html'),
	controller: controllerName,
	controllerAs: 'buttonToggle',
	bindings: {
		type: '@',
		size: '@',
		onToggle: '&',
		disabled: '<?ngDisabled',
	},
};

angular.module(moduleName, [__boolean.moduleName])
	.component(componentName, buttonToggle)
	.controller(controllerName, ButtonToggleController);
