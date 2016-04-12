// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { buildInput, moduleName as inputModule } from '../input/input';

export var moduleName: string = 'rl.ui.components.textarea';
export var componentName: string = 'rlTextarea';

let textarea: angular.IComponentOptions = buildInput({
	template: require('./textarea.html'),
	bindings: {
		rows: '<?',
		ngDisabled: '<?',
		maxlength: '<?',
	},
});

angular.module(moduleName, [inputModule])
	.component(componentName, textarea);
