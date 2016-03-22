// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.buttonLink';
export var directiveName: string = 'rlButtonLink';
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

export function buttonLink(): angular.IDirective {
	return {
		restrict: 'E',
		transclude: true,
		template: require('./buttonLink.html'),
		scope: {},
		bindToController: {
			link: '@',
			type: '@',
			ngDisabled: '<?',
			size: '@',
			newTab: '<?',
		},
		controller: controllerName,
		controllerAs: 'button',
	};
}

angular.module(moduleName, [])
	.directive(directiveName, buttonLink)
	.controller(controllerName, ButtonLinkController);
