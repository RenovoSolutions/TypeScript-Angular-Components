// /// <reference path='../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { IDataSource, dataPager } from '../dataSources/dataSources.module';
import { CardContainerController } from '../cardContainer';

export let moduleName: string = 'rl.ui.components.cardContainer.pager';
export let componentName: string = 'rlPager';
export let controllerName: string = 'PagerController';

export let defaultVisiblePageCount: number = 5;

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
	private cardContainer: CardContainerController;
	private pager: dataPager.IDataPager;
	private dataSource: IDataSource<any>;
	private lastPage: number;
	private visiblePageCount: number;

	static $inject: string[] = ['$scope'];
	constructor(private $scope: angular.IScope) {}

	$onInit(): void {
		if (this.cardContainer == null) {
			return;
		}

		this.pager = this.cardContainer.dataSource.pager;

		if (this.pager == null) {
			this.hasPageFilter = false;
		} else {
			this.visiblePageCount = this.pageCount != null ? this.pageCount : defaultVisiblePageCount;
			this.lastPage = 1;
			this.dataSource = this.cardContainer.dataSource;

			this.$scope.$watch((): number => { return this.dataSource.count; }, this.updatePageCount);
			this.pager.pageSizeObservable.subscribe(this.updatePageCount);

			this.$scope.$watch((): number => { return this.currentPage; }, (page: number): void => {
				this.updatePaging();

				this.pager.pageNumber = page;
				this.dataSource.onPagingChange();
			});
		}
	}

	private updatePageCount: {(): void} = (): void => {
		let totalItems: number = this.dataSource.count;

		let newLastPage: number = Math.ceil(totalItems / this.pager.pageSize);

		if (newLastPage !== this.lastPage) {
			this.lastPage = newLastPage;
			this.currentPage = 1;
		}

		this.updatePaging();
	}

	private updatePaging(): void {
		let page: number = this.currentPage;
		this.canGoBack = page > 1;
		this.canGoForward = page < this.lastPage;

		let nonCurrentVisiblePages: number = this.visiblePageCount - 1;

		let before: number = Math.floor(nonCurrentVisiblePages / 2);
		let after: number = Math.ceil(nonCurrentVisiblePages / 2);

		let startPage: number = page - before;
		let endPage: number = page + after;

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

let pager: angular.IComponentOptions = {
	require: { cardContainer: '?^^rlCardContainer' },
	template: require('./pager.html'),
	controller: controllerName,
	controllerAs: 'pager',
	bindings: {
		pageCount: '<?visiblePages',
	},
};

angular.module(moduleName, [])
	.component(componentName, pager)
	.controller(controllerName, PagerController);
