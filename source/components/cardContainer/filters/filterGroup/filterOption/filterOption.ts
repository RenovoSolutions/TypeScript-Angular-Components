// /// <reference path='../../../../../../typings/commonjs.d.ts' />

'use strict';
import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.cardContainer.filters.filterGroup.filterOption';
export var directiveName: string = 'rlFilterOption';

export function filterOption(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./filterOption.html'),
		scope: {
			activate: '&',
			isActive: '=active',
			option: '=',
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, filterOption);
