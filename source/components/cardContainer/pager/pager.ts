// /// <reference path='../../../../typings/commonjs.d.ts' />

import * as angular from 'angular';
import * as _ from 'lodash';

import { IDataSource, IDataPager } from '../dataSources/index';
import { CardContainerController } from '../cardContainer.ng1';

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
	pages: number[];
	private cardContainer: CardContainerController;
	private pager: IDataPager;
	private dataSource: IDataSource<any>;
	private lastPage: number;
	private visiblePageCount: number;

	get currentPage(): number {
		return this.pager.pageNumber;
	}

	set currentPage(page: number) {
		this.pager.pageNumber = page;
		this.updatePaging();
	}

	$onInit(): void {
		if (this.cardContainer == null) {
			return;
		}

		this.pager = this.cardContainer.dataSource.pager;

		if (this.pager) {
			this.visiblePageCount = this.pageCount != null ? this.pageCount : defaultVisiblePageCount;
			this.lastPage = 1;
			this.dataSource = this.cardContainer.dataSource;

			this.dataSource.countChanges.subscribe(this.updatePageCount);
			this.pager.pageSizeChanges.subscribe(this.updatePageCount);
			this.updatePageCount();
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
