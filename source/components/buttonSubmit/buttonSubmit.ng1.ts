// /// <reference path='../../../typings/commonjs.d.ts' />

import * as angular from 'angular';

import { buildButton } from '../button/button.ng1';

export const moduleName: string = 'rl.ui.components.buttonSubmit';
export const componentName: string = 'rlButtonSubmit';

const buttonSubmit: angular.IComponentOptions = buildButton({
		template: require('./buttonSubmit.ng1.html'),
		bindings: {
			rightAligned: '<?',
			saving: '<?',
			action: null,
		},
	});

angular.module(moduleName, [])
	.component(componentName, buttonSubmit);
