// /// <reference path='../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { IDataSource, dataPager } from '../dataSources/dataSources.module';
import { ICardContainerService } from '../cardContainer.service';

export var moduleName: string = 'rl.ui.components.cardContainer.pager';
export var directiveName: string = 'rlPager';
export var controllerName: string = 'PagerController';

export var defaultVisiblePageCount: number = 5;

export interface IPagerBindings {
	pageCount: number;
}

export class PagerController {
	// bindings
	pageCount: number;

	canGoBack: boolean = false;
	canGoForward: boolean = false;
	currentPage: number;
	pages: number[];
	hasPageFilter: boolean = true;
	private containerService: ICardContainerService;
	private pager: dataPager.IDataPager;
	private dataSource: IDataSource<any>;
	private lastPage: number;
	private visiblePageCount: number;

	static $inject: string[] = ['$scope'];
	constructor($scope: angular.IScope) {
		if (this.containerService == null) {
			return;
		}

		this.pager = this.containerService.pager;

		if (this.pager == null) {
			this.hasPageFilter = false;
		} else {
			this.visiblePageCount = this.pageCount != null ? this.pageCount : defaultVisiblePageCount;
			this.lastPage = 1;
			this.dataSource = this.containerService.dataSource;

			$scope.$watch((): number => { return this.dataSource.count; }, this.updatePageCount);
			$scope.$watch((): number => { return this.pager.pageSize; }, this.updatePageCount);

			$scope.$watch((): number => { return this.currentPage; }, (page: number): void => {
				this.updatePaging();

				this.pager.pageNumber = page;
				this.dataSource.refresh();
			});
		}
	}

	private updatePageCount: {(): void} = (): void => {
		var totalItems: number = this.dataSource.count;

		var newLastPage: number = Math.ceil(totalItems / this.pager.pageSize);

		if (newLastPage !== this.lastPage) {
			this.lastPage = newLastPage;
			this.currentPage = 1;
		}

		this.updatePaging();
	}

	private updatePaging(): void {
		var page: number = this.currentPage;
		this.canGoBack = page > 1;
		this.canGoForward = page < this.lastPage;

		var nonCurrentVisiblePages: number = this.visiblePageCount - 1;

		var before: number = Math.floor(nonCurrentVisiblePages / 2);
		var after: number = Math.ceil(nonCurrentVisiblePages / 2);

		var startPage: number = page - before;
		var endPage: number = page + after;

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(this.visiblePageCount, this.lastPage);
		} else if (endPage > this.lastPage) {
			endPage = this.lastPage;
			startPage = Math.max(this.lastPage - nonCurrentVisiblePages, 1);
		}

		this.pages = _.range(startPage, endPage + 1);
	}

	first(): void {
		this.currentPage = 1;
	}

	previous(): void {
		if (this.currentPage > 1) {
			this.currentPage--;
		}
	}

	goto(page: number): void {
		if (page >= 1 && page <= this.lastPage) {
			this.currentPage = page;
		}
	}

	next(): void {
		if (this.currentPage < this.lastPage) {
			this.currentPage++;
		}
	}

	last(): void {
		this.currentPage = this.lastPage;
	}
}

export function pager(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./pager.html'),
		controller: controllerName,
		controllerAs: 'pager',
		scope: {},
		bindToController: {
			pageCount: '=visiblePages',
			containerService: '=',
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, pager)
	.controller(controllerName, PagerController);
