// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { buildButton, ButtonController } from '../button/button';

export let moduleName: string = 'rl.ui.components.buttonLink';
export let componentName: string = 'rlButtonLink';
export let controllerName: string = 'ButtonLinkController';

export class ButtonLinkController extends ButtonController {
	// bindings
	link: string;
	newTab: boolean;

	target: string;

	constructor() {
		super();
		this.target = this.newTab ? '_blank' : '_self';
	}
}

let buttonLink: angular.IComponentOptions = buildButton({
	template: require('./buttonLink.html'),
	bindings: {
		link: '@',
		newTab: '<?',
		action: null,
	},
	controller: controllerName,
});

angular.module(moduleName, [])
	.component(componentName, buttonLink)
	.controller(controllerName, ButtonLinkController);
