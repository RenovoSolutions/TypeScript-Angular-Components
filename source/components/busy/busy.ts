'use strict';

import './busy.css';

import * as angular from 'angular';

import { defaultThemeValueName } from '../componentsDefaultTheme';

export var moduleName: string = 'rl.ui.components.busy';
export var directiveName: string = 'rlBusy';

interface IBusyScope extends angular.IScope {
	useDefaultTheme: boolean;
}

busy.$inject = [defaultThemeValueName];
function busy(useDefaultTheme: boolean): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: `<i class="busy rl-{{::size}}" ng-class="{ 'default-theme': useDefaultTheme }" ng-show="loading"></i>`,
		scope: {
			loading: '<',
			// Valid values are:
			// `lg`, `2x`, `3x`, `4x`, and `5x`
			size: '@',
		},
		link: (scope: IBusyScope) => {
			scope.useDefaultTheme = useDefaultTheme;
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, busy);
