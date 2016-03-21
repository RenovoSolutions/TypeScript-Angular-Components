// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { componentName as formComponentName, FormController } from '../form/form';

export let moduleName: string = 'rl.ui.components.buttonSubmit';
export let componentName: string = 'rlButtonSubmit';
export let controllerName: string = 'ButtonSubmitController';

export class ButtonSubmitController {
	// bindings
	type: string;
	ngDisabled: boolean;
	size: string;
	rightAligned: boolean;
	saving: boolean;

	configuredSize: string;

	static $inject: string[] = ['$element'];
	constructor(private $element: angular.IAugmentedJQuery) {
		this.type = this.type != null ? this.type : 'default';
		this.configuredSize = this.size != null ? 'btn-' + this.size : null;
	}

	save(): void {
		this.$element.trigger('submit');
	}
}

let buttonSubmit: angular.IComponentOptions = {
		transclude: true,
		template: require('./buttonSubmit.html'),
		bindings: {
			type: '@',
			ngDisabled: '<?',
			size: '@',
			rightAligned: '<?',
			saving: '<?',
		},
		controller: controllerName,
		controllerAs: 'button',
	};

angular.module(moduleName, [])
	.component(componentName, buttonSubmit)
	.controller(controllerName, ButtonSubmitController);
