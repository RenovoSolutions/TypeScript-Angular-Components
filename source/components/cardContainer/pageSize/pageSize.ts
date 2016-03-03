// /// <reference path='../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { dataPager } from '../dataSources/dataSources.module';
import { CardContainerController } from '../cardContainer';

export var moduleName: string = 'rl.ui.components.cardContainer.pageSize';
export var directiveName: string = 'rlPageSize';
export var controllerName: string = 'PageSizeController';

export var availablePageSizes: number[] = [10, 25, 50, 100];
export var defaultPageSize: number = 10;

export class PageSizeController {
	selectedPageSize: number;
	pageSizes: number[];
	hasPageFilter: boolean;
	private cardContainer: CardContainerController;

	static $inject: string[] = ['$scope'];
	constructor(private $scope: angular.IScope) {}

	$onInit(): void {
		if (this.cardContainer == null) {
			return;
		}

		this.selectedPageSize = defaultPageSize;
		this.pageSizes = availablePageSizes;
		this.hasPageFilter = true;

		var pager: dataPager.IDataPager = this.cardContainer.dataSource.pager;

		if (pager == null) {
			this.hasPageFilter = false;
		} else {
			this.$scope.$watch((): number => { return this.selectedPageSize; }, (newPageSize: number): void => {
				if (pager != null) {
					pager.pageSize = newPageSize;
					this.cardContainer.dataSource.onPagingChange();
				}
			});
		}
	}
}

export function pageSize(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		require: { cardContainer: '?^^rlCardContainer' },
		template: require('./pageSize.html'),
		controller: controllerName,
		controllerAs: 'controller',
		scope: {},
		bindToController: {},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, pageSize)
	.controller(controllerName, PageSizeController);
