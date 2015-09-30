// /// <reference path='../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { dataPager } from '../dataSources/dataSources.module';
import { ICardContainerService } from '../cardContainer';

export var moduleName: string = 'rl.ui.components.cardContainer.pageSize';
export var directiveName: string = 'rlPageSize';
export var controllerName: string = 'PageSizeController';

export var availablePageSizes: number[] = [10, 25, 50, 100];
export var defaultPageSize: number = 10;

export class PageSizeController {
	selectedPageSize: number;
	pageSizes: number[];
	hasPageFilter: boolean;
	private containerService: ICardContainerService;

	static $inject: string[] = ['$scope', '$element'];
	constructor($scope: angular.IScope
			, $element: angular.IAugmentedJQuery) {
		this.selectedPageSize = defaultPageSize;
		this.pageSizes = availablePageSizes;
		this.hasPageFilter = true;

		var pager: dataPager.IDataPager = this.containerService.pager;

		if (pager == null) {
			this.hasPageFilter = false;
		} else {
			$scope.$watch((): number => { return this.selectedPageSize; }, (newPageSize: number): void => {
				if (pager != null) {
					pager.pageSize = newPageSize;
					this.containerService.dataSource.refresh();
				}
			});
		}
	}
}

export function pageSize(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./pageSize.html'),
		controller: controllerName,
		controllerAs: 'controller',
		scope: {},
		bindToController: {
			containerService: '=',
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, pageSize)
	.controller(controllerName, PageSizeController);
