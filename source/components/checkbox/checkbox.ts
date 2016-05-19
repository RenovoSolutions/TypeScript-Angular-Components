// /// <reference path='../../../typings/commonjs.d.ts' />

import * as angular from 'angular';

import { defaultThemeValueName } from '../componentsDefaultTheme';

export const moduleName: string = 'rl.ui.components.checkbox';
export const componentName: string = 'rlCheckbox';
export const controllerName: string = 'CheckboxController';

export interface IToggleParams {
	value: boolean;
}

export interface ICheckboxBindings {
	ngDisabled?: boolean;
	active?: boolean;
	onToggle?: {(params: IToggleParams): void}
}

export class CheckboxController implements ICheckboxBindings {
	// bindings
	ngDisabled: boolean;
	active: boolean;
	onToggle: {(params: IToggleParams): void}

	ngModel: angular.INgModelController;

	get checked(): boolean {
		return this.ngModel.$viewValue;
	}

	set checked(value: boolean) {
		this.ngModel.$setViewValue(value);
	}

	toggle(): void {
		if (this.active && !this.ngDisabled) {
			this.checked = !this.checked;
			this.onToggle({ value: this.checked });
		}
	}

	static $inject: string[] = [defaultThemeValueName];
	constructor(public useDefaultTheme: boolean) {}

	$onInit(): void {
		this.active = this.active != null ? this.active : true;
	}
}

const checkbox: angular.IComponentOptions = {
	require: { ngModel: 'ngModel' },
	transclude: true,
	template: require('./checkbox.html'),
	controller: controllerName,
	controllerAs: 'checkbox',
	bindings: {
		ngDisabled: '<?',
		active: '<?',
		onToggle: '&',
	},
};

angular.module(moduleName, [])
	.component(componentName, checkbox)
	.controller(controllerName, CheckboxController);
