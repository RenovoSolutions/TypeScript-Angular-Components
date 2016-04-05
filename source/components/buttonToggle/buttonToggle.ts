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
	buttonClass: string;
	buttonSize: string;

	clicked(): void;
}

export class ButtonToggleController implements IButtonToggleController {
	type: string;
	size: string;
	onToggle: { (param: IToggleParams): void };
	disabled: boolean;

	buttonClass: string;
	buttonSize: string;

	ngModel: angular.INgModelController;

	get checked(): boolean {
		return this.ngModel.$viewValue;
	}

	set checked(value: boolean) {
		this.ngModel.$setViewValue(value);
	}

	static $inject: string[] = ['$scope', __boolean.serviceName];
	constructor($scope: angular.IScope, bool: __boolean.IBooleanUtility) {
		this.buttonClass = this.type != null ? this.type : 'default';
		this.buttonSize = this.size != null ? 'btn-' + this.size : null;
	}

	clicked(): void {
		if (!this.disabled) {
			this.checked = !this.checked;
			this.onToggle({ value: this.checked });
		}
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
