// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { buildInput, moduleName as inputModule } from '../input/input';

export const moduleName: string = 'rl.ui.components.textarea';
export const componentName: string = 'rlTextarea';

const textarea: angular.IComponentOptions = buildInput({
	template: require('./textarea.html'),
	bindings: {
		rows: '<?',
		ngDisabled: '<?',
		maxlength: '<?',
	},
});

angular.module(moduleName, [inputModule])
	.component(componentName, textarea);
