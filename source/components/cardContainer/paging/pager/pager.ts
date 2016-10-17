import { Component, Input, OnInit, Inject, forwardRef } from '@angular/core';
import { range } from 'lodash';

import { IDataSourceOld } from '../../dataSources/index';
import { IDataPager } from '../dataPager/dataPager.service';
import { CardContainerComponent } from '../../cardContainer';

export const defaultVisiblePageCount: number = 5;

@Component({
	selector: 'rlPager',
	template: require('./pager.html'),
})
export class PagerComponent<T> implements OnInit {
	@Input() pageCount: number;

	pages: number[];
	lastPage: number;
	visiblePageCount: number;

	cardContainer: CardContainerComponent<T>;
	pager: IDataPager;
	dataSource: IDataSourceOld<any>;

	get canGoBack(): boolean {
		return this.pager.pageNumber > 1;
	}

	get canGoForward(): boolean {
		return this.pager.pageNumber < this.lastPage;
	}

	constructor(@Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>) {
		this.cardContainer = cardContainer;
		this.pager = this.cardContainer.dataSource.pager;
	}

	ngOnInit(): void {
		if (this.pager) {
			this.visiblePageCount = this.pageCount != null ? this.pageCount : defaultVisiblePageCount;
			this.lastPage = 1;
			this.dataSource = this.cardContainer.dataSource;

			this.dataSource.countChanges.subscribe(this.updatePageCount);
			this.pager.pageSizeChanges.subscribe(this.updatePageCount);
			this.updatePageCount();
		}
	}

	setPage(page: number): void {
		this.pager.pageNumber = page;
		this.updatePaging();
	}

	first(): void {
		this.setPage(1);
	}

	previous(): void {
		if (this.pager.pageNumber > 1) {
			this.setPage(this.pager.pageNumber - 1);
		}
	}

	goto(page: number): void {
		if (page >= 1 && page <= this.lastPage) {
			this.setPage(page);
		}
	}

	next(): void {
		if (this.pager.pageNumber < this.lastPage) {
			this.setPage(this.pager.pageNumber + 1);
		}
	}

	last(): void {
		this.setPage(this.lastPage);
	}

	private updatePageCount: {(): void} = (): void => {
		const totalItems: number = this.dataSource.count;

		const newLastPage: number = Math.ceil(totalItems / this.pager.pageSize);

		if (newLastPage !== this.lastPage) {
			this.lastPage = newLastPage;
			this.setPage(1);
		}

		this.updatePaging();
	}

	private updatePaging(): void {
		const page: number = this.pager.pageNumber;

		const nonCurrentVisiblePages: number = this.visiblePageCount - 1;

		const before: number = Math.floor(nonCurrentVisiblePages / 2);
		const after: number = Math.ceil(nonCurrentVisiblePages / 2);

		let startPage: number = page - before;
		let endPage: number = page + after;

		if (startPage < 1) {
			startPage = 1;
			endPage = Math.min(this.visiblePageCount, this.lastPage);
		} else if (endPage > this.lastPage) {
			endPage = this.lastPage;
			startPage = Math.max(this.lastPage - nonCurrentVisiblePages, 1);
		}

		this.pages = range(startPage, endPage + 1);
	}
}
