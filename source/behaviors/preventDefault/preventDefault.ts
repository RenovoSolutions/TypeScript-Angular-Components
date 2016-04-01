'use strict';

import * as angular from 'angular';

export let moduleName: string = 'rl.ui.behaviors.preventDefault';
export let directiveName: string = 'rlPreventDefault';
export let controllerName: string = 'PreventDefaultController';

function required(): angular.IDirective {
	return {
		restrict: 'A',
		priority: 200,
		link: (scope: angular.IScope, element: angular.IAugmentedJQuery): void => {
			angular.element(element).on('click', (event: any) => {
				event.preventDefault();
			});
		}
	};
}

angular.module(moduleName, [])
	.directive(directiveName, required);