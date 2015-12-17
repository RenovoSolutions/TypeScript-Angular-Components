/// <reference path='../../../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';

export let directiveName: string = 'rlSelectFilter';
export let controllerName: string = 'SelectFilterController';


export interface ISelectFilterBindings {
	data: any;
}

export interface ISelectFilterController {
}

export class SelectFilterController {
	data: any;
}

export function selectFilter(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./selectFilter.html'),
		controller: controllerName,
		controllerAs: 'filter',
		scope: {},
		bindToController: {
			data: '=',
		},
	};
}
