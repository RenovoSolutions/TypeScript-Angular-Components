// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.buttonLink';
export var componentName: string = 'rlButtonLink';
export var controllerName: string = 'ButtonLinkController';

export class ButtonLinkController {
	// bindings
	link: string;
	type: string;
	ngDisabled: boolean;
	size: string;
	newTab: boolean;

	target: string;
	configuredSize: string;

	constructor() {
		this.type = this.type != null ? this.type : 'default';
		this.configuredSize = this.size != null ? 'btn-' + this.size : null;
		this.target = this.newTab ? '_blank' : '_self';
	}
}

let buttonLink: angular.IComponentOptions = {
	transclude: true,
	template: require('./buttonLink.html'),
	bindings: {
		link: '@',
		type: '@',
		ngDisabled: '<?',
		size: '@',
		newTab: '<?',
	},
	controller: controllerName,
	controllerAs: 'button',
};

angular.module(moduleName, [])
	.component(componentName, buttonLink)
	.controller(controllerName, ButtonLinkController);
