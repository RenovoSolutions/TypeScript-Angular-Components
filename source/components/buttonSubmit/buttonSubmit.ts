// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { buildButton } from '../button/button';

export let moduleName: string = 'rl.ui.components.buttonSubmit';
export let componentName: string = 'rlButtonSubmit';

let buttonSubmit: angular.IComponentOptions = buildButton({
		template: require('./buttonSubmit.html'),
		bindings: {
			rightAligned: '<?',
			saving: '<?',
			action: null,
		},
	});

angular.module(moduleName, [])
	.component(componentName, buttonSubmit);
