'use strict';

import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.cardContainer.itemCount';
export var directiveName: string = 'rlItemCount';

export function itemCount(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		require: { cardContainer: '?^^rlCardContainer' },
		template: require('./itemCount.html'),
		controller(): void {},
		controllerAs: 'itemCount',
		scope: {},
		bindToController: true,
	};
}

angular.module(moduleName, [])
	.directive(directiveName, itemCount);
