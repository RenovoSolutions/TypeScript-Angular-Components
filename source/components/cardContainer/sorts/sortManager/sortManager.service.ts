import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, take, remove } from 'lodash';

import { ISort, IPartialSort, SortDirection, ISortDirections } from '../sort';
import { IColumn, ISecondarySorts } from '../../column';

export {
	ISort,
	SortDirection,
};

@Injectable()
export class SortManagerService {
	sortChange$: Observable<void>;
	sortList$: Observable<ISort[]>;
	getColumn: { (name: string): IColumn<any> };
	maxColumnSorts: number;

	private sortChangeSubject$: Subject<void> = new Subject<void>();
	private _sortList: ISort[];
	private sortListSubject$: BehaviorSubject<ISort[]>;

	setup(sortList: ISort[], getColumn: { (name: string): IColumn<any> }, maxColumnSorts: number): void {
		this.getColumn = getColumn;
		this.maxColumnSorts = maxColumnSorts;

		this._sortList = sortList;
		this.sortListSubject$ = new BehaviorSubject(this._sortList);
		this.sortList$ = this.sortListSubject$.asObservable();
		this.sortChange$ = this.sortChangeSubject$.asObservable();
	}

	sort(column: IColumn<any>): void {
		let firstSort: ISort = this._sortList[0];

		// If column is already the primary sort, change the direction
		if (firstSort != null
			&& firstSort.column === column) {
			firstSort.direction = SortDirection.toggle(firstSort.direction);

			// Clear sort
			if (firstSort.direction === SortDirection.none) {
				this.clearVisualSortIndicator(firstSort);
				firstSort = null;

				// If the column has secondary sorts don't fall back to a
				//  secondary sort, instead just clear all sorts
				if (column.secondarySorts != null) {
					this._sortList.length = 0;
				} else { // otehrwise, clear the primary sort and fallback to previous sort
					this._sortList.shift();
				}
			}
		} else {
			// Else make column primary ascending sort

			// Remove any existing non-primary sorts on column
			remove(this._sortList, (sort: ISort): boolean => {
				return column === sort.column;
			});

			// Build ascending sort for column
			let newSort: ISort = {
				column: column,
				direction: SortDirection.ascending,
			};

			this._sortList.unshift(newSort);

			firstSort = newSort;
		}

		this.updateVisualColumnSorting();

		// If column has secondary sorts, wipe the sort order and just apply the secondary sorts
		if (firstSort != null && column.secondarySorts != null) {
			this._sortList.length = 0;
			let secondarySorts: ISort[] = this.buildSecondarySorts(firstSort.direction, column.secondarySorts);
			this._sortList.push(firstSort);
			this._sortList.push.apply(this._sortList, secondarySorts);
		} else {
			// If not using column secondary sorts, limit the maximum number
			//  of sorts applied to the maximum number of sorts
			this._sortList = take(this._sortList, this.maxColumnSorts);
		}

		this.sortListSubject$.next(this._sortList);
		this.sortChangeSubject$.next(null);
	}

	private buildSecondarySorts(direction: SortDirection, secondarySorts: ISecondarySorts): ISort[] {
		let sortList: IPartialSort[] = secondarySorts[SortDirection.getFullName(direction)];
		return map(sortList, (sort: IPartialSort): ISort => {
			return {
				direction: sort.direction,
				column: this.getColumn(sort.column),
			};
		});
	}

	private updateVisualColumnSorting(): void {
		this._sortList = map(this._sortList, (sort: ISort, index: number): ISort => {
			// Only first sort should have visible direction
			if (index === 0) {
				this.updateVisualSortIndicator(sort);
			} else {
				this.clearVisualSortIndicator(sort);
			}
			return sort;
		});
		this.sortListSubject$.next(this._sortList);
	}

	private updateVisualSortIndicator(sort: ISort): void {
		sort.column.sortDirection = sort.direction;
	}

	private clearVisualSortIndicator(sort: ISort): void {
		sort.column.sortDirection = null;
	}
}
