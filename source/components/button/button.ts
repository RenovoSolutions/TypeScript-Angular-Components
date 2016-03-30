// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.button';
export var componentName: string = 'rlButton';
export var controllerName: string = 'ButtonController';

export class ButtonController {
	// bindings
	action: {(): void};
	type: string;
	ngDisabled: boolean;
	size: string;

	configuredSize: string;

	constructor() {
		this.type = this.type != null ? this.type : 'default';
		this.configuredSize = this.size != null ? 'btn-' + this.size : null;
	}
}

let button: angular.IComponentOptions = {
	transclude: true,
	template: require('./button.html'),
	bindings: {
		action: '&',
		type: '@',
		ngDisabled: '<?',
		size: '@',
	},
	controller: controllerName,
	controllerAs: 'button',
};

angular.module(moduleName, [])
	.component(componentName, button)
	.controller(controllerName, ButtonController);
