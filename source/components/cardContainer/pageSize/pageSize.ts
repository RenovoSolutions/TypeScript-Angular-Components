// /// <reference path='../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { dataPager } from '../dataSources/dataSources.module';
import { CardContainerBuilder } from '../cardContainerBuilder.service';

export var moduleName: string = 'rl.ui.components.cardContainer.pageSize';
export var directiveName: string = 'rlPageSize';
export var controllerName: string = 'PageSizeController';

export var availablePageSizes: number[] = [10, 25, 50, 100];
export var defaultPageSize: number = 10;

export class PageSizeController {
	selectedPageSize: number;
	pageSizes: number[];
	hasPageFilter: boolean;
	builder: CardContainerBuilder;

	static $inject: string[] = ['$scope'];
	constructor($scope: angular.IScope) {
		if (this.builder == null) {
			return;
		}

		this.selectedPageSize = defaultPageSize;
		this.pageSizes = availablePageSizes;
		this.hasPageFilter = true;

		var pager: dataPager.IDataPager = this.builder._pager;

		if (pager == null) {
			this.hasPageFilter = false;
		} else {
			$scope.$watch((): number => { return this.selectedPageSize; }, (newPageSize: number): void => {
				if (pager != null) {
					pager.pageSize = newPageSize;
					this.builder._dataSource.onPagingChange();
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
			builder: '=',
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, pageSize)
	.controller(controllerName, PageSizeController);
