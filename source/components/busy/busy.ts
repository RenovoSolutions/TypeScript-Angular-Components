import './busy.css';

import * as angular from 'angular';

import { defaultThemeValueName } from '../componentsDefaultTheme';

export const moduleName: string = 'rl.ui.components.busy';
export const componentName: string = 'rlBusy';

class BusyController {
	static $inject: string[] = [defaultThemeValueName];
	constructor(public useDefaultTheme: boolean) { }
}

const busy: angular.IComponentOptions = {
	template: `<i class="busy rl-{{::busy.size}}" ng-class="{ 'default-theme': busy.useDefaultTheme }" ng-show="busy.loading"></i>`,
	controller: BusyController,
	controllerAs: 'busy',
	bindings: {
		loading: '<',
		// Valid values are:
		// `lg`, `2x`, `3x`, `4x`, and `5x`
		size: '@',
	},
};

angular.module(moduleName, [])
	.component(componentName, busy);
