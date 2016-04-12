'use strict';

import * as angular from 'angular';

import { IToggleParams } from '../checkbox/checkbox';

import { buildButton, ButtonController } from '../button/button';

export let moduleName: string = 'rl.ui.components.buttonToggle';
export let componentName: string = 'rlButtonToggle';
export let controllerName: string = 'ButtonToggleController';

export interface IButtonToggleBindings {
	type: string;
	size: string;
	onToggle(param: IToggleParams): void;
	ngDisabled: boolean;
}

export interface IButtonToggleController extends IButtonToggleBindings {
	clicked(): void;
}

export class ButtonToggleController implements IButtonToggleController extends ButtonController {
	onToggle: { (param: IToggleParams): void };

	ngModel: angular.INgModelController;

	get checked(): boolean {
		return this.ngModel.$viewValue;
	}

	set checked(value: boolean) {
		this.ngModel.$setViewValue(value);
	}

	constructor() {
		super();
	}

	clicked(): void {
		if (!this.ngDisabled) {
			this.checked = !this.checked;
			this.onToggle({ value: this.checked });
		}
	}
}

let buttonToggle: angular.IComponentOptions = buildButton({
	require: { ngModel: '^ngModel' },
	template: require('./buttonToggle.html'),
	controller: controllerName,
	controllerAs: 'buttonToggle',
	bindings: {
		onToggle: '&',
	},
});

angular.module(moduleName, [])
	.component(componentName, buttonToggle)
	.controller(controllerName, ButtonToggleController);
