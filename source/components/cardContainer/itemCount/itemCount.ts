'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.cardContainer.itemCount';
export var directiveName: string = 'rlItemCount';

export function itemCount(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		require: '^^rlCardContainer',
		template: require('./itemCount.html'),
		scope: {
			builder: '=',
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, itemCount);
