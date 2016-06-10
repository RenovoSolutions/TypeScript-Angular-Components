// /// <reference path='../../../typings/commonjs.d.ts' />

import * as _ from 'lodash';
import * as angular from 'angular';

export const moduleName: string = 'rl.ui.components.button';
export const componentName: string = 'rlButton';
export const controllerName: string = 'ButtonController';

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
	action: { (): void };
	type: string;
	ngDisabled: boolean;
	size: string;

	configuredSize: string;

	get types() {
		let typesList: string[] = this.type.split(' ');
		typesList.forEach((type: string, index: number) => {
			//the for each for places that used btn-block for example in the type attribute do not break
			if (type.indexOf('btn-') === -1) {
				type = 'btn-' + type;
			}
			typesList[index] = type;
		});
		return typesList.join(' ');
	}

	constructor() {
		this.type = this.type != null ? this.type : 'default';
		this.configuredSize = this.size != null && this.size !== '' ? 'btn-' + this.size : null;
	}
}

const button: angular.IComponentOptions = {
	transclude: true,
	template: require('./button.ng1.html'),
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
	const clone: any = _.clone(button);
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
