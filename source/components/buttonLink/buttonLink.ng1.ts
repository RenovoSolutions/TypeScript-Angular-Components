// /// <reference path='../../../typings/commonjs.d.ts' />

import * as angular from 'angular';

import { buildButton, ButtonController } from '../button/button.ng1';

export const moduleName: string = 'rl.ui.components.buttonLink';
export const componentName: string = 'rlButtonLink';
export const controllerName: string = 'ButtonLinkController';

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

const buttonLink: angular.IComponentOptions = buildButton({
	template: require('./buttonLink.ng1.html'),
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
