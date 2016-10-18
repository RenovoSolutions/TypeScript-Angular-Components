import { Component, Input, OnInit, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { range } from 'lodash';

import { IDataSource } from '../../dataSources/index';
import { IDataPager } from '../dataPager/dataPager.service';
import { CardContainerComponent } from '../../cardContainer';

export const defaultVisiblePageCount: number = 5;

@Component({
	selector: 'rlPager',
	template: require('./pager.html'),
})
export class PagerComponent<T> implements OnInit {
	@Input() pageCount: number;

	visiblePageCount: number;

	cardContainer: CardContainerComponent<T>;
	pager: IDataPager;
	dataSource: IDataSource<any>;

	constructor(@Inject(forwardRef(() => CardContainerComponent)) cardContainer: CardContainerComponent<T>) {
		this.cardContainer = cardContainer;
		this.pager = this.cardContainer.dataSource.pager;
	}

	get lastPage$(): Observable<number> {
		return this.dataSource.count$.combineLatest(this.pager.pageSize$)
									 .map(([count, pageSize]) => {
				return Math.ceil(count / pageSize);
			});
	}

	get canGoBack$(): Observable<boolean> {
		return this.pager.pageNumber$.map(pageNumber => pageNumber > 1);
	}

	get canGoForward$(): Observable<boolean> {
		return this.pager.pageNumber$.combineLatest(this.lastPage$)
									 .map(([pageNumber, lastPage]) => pageNumber < lastPage);
	}

	get pages$(): Observable<number[]> {
		return this.pager.pageNumber$.combineLatest(this.lastPage$)
									 .map(([page, lastPage]) => {
				const nonCurrentVisiblePages: number = this.visiblePageCount - 1;

				const before: number = Math.floor(nonCurrentVisiblePages / 2);
				const after: number = Math.ceil(nonCurrentVisiblePages / 2);

				let startPage: number = page - before;
				let endPage: number = page + after;

				if (startPage < 1) {
					startPage = 1;
					endPage = Math.min(this.visiblePageCount, lastPage);
				} else if (endPage > lastPage) {
					endPage = lastPage;
					startPage = Math.max(lastPage - nonCurrentVisiblePages, 1);
				}

				return range(startPage, endPage + 1);
			});
	}

	isCurrent(page: number): Observable<boolean> {
		return this.pager.pageNumber$.map(pageNumber => page === pageNumber);
	}

	ngOnInit(): void {
		if (this.pager) {
			this.visiblePageCount = this.pageCount != null ? this.pageCount : defaultVisiblePageCount;
			this.dataSource = this.cardContainer.dataSource;
		}
	}

	first(): void {
		this.pager.setPage(1);
	}

	previous(): void {
		const subscription = this.pager.pageNumber$.subscribe(pageNumber => {
			setTimeout(() => {
				subscription.unsubscribe();
				if (pageNumber > 1) {
					this.pager.setPage(pageNumber - 1);
				}
			});
		});
	}

	goto(page: number): void {
		const subscription = this.lastPage$.subscribe(lastPage => {
			if (page >= 1 && page <= lastPage) {
				this.pager.setPage(page);
			}
			setTimeout(() => subscription.unsubscribe());
		});
	}

	next(): void {
		const subscription = this.pager.pageNumber$.combineLatest(this.lastPage$)
												  .subscribe(([pageNumber, lastPage]) => {
			setTimeout(() => {
				subscription.unsubscribe();
				if (pageNumber < lastPage) {
					this.pager.setPage(pageNumber + 1);
				}
			});
		});

	}

	last(): void {
		const subscription = this.lastPage$.subscribe(lastPage => {
			this.pager.setPage(lastPage);
			setTimeout(() => subscription.unsubscribe());
		});
	}
}
