// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

export let moduleName: string = 'rl.ui.components.button';
export let componentName: string = 'rlButton';
export let controllerName: string = 'ButtonController';

export interface IButtonOptions {
	require?: any;
	template?: string;
	transclude?: boolean;
	controller?: string | Function;
	controllerAs?: string;
	bindings?: any;
}

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

export function buildButton(options: IButtonOptions): angular.IComponentOptions {
	let clone: any = _.clone(button);
	clone.require = options.require;
	clone.transclude = options.transclude != null ? options.transclude : clone.transclude;
	clone.template = options.template;
	clone.controller = options.controller || clone.controller;
	clone.controllerAs = options.controllerAs || clone.controllerAs;
	clone.bindings = _.assign({}, clone.bindings, options.bindings);
	_.each(clone.bindings, (binding: any, key: string): any => {
		if (binding == null) {
			delete clone.bindings[key];
		}
	});
	return clone;
}

angular.module(moduleName, [])
	.component(componentName, button)
	.controller(controllerName, ButtonController);
