import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, each, take, reject, drop } from 'lodash';

import { ISort, IPartialSort, SortDirection, ISortDirections } from '../sort';
import { Sorter } from '../sorter/sorter.service';
import { IColumn, ISecondarySorts } from '../../column';

export {
	ISort,
	SortDirection,
};

@Injectable()
export class SortManagerService {
	getColumn: { (name: string): IColumn<any> };
	maxColumnSorts: number;

	private _sortList: BehaviorSubject<ISort[]>;
	private sorter: Sorter;

	constructor(sorter: Sorter) {
		this.sorter = sorter;
		this._sortList = new BehaviorSubject(null);
	}

	setup(sortList: ISort[], getColumn: { (name: string): IColumn<any> }, maxColumnSorts: number): void {
		this.getColumn = getColumn;
		this.maxColumnSorts = maxColumnSorts;
		this._sortList.next(sortList);
	}

	get sortList$(): Observable<ISort[]> {
		return this._sortList.asObservable();
	}

	get visualColumnSorting$(): Observable<ISort[]> {
		return this.sortList$.map(sorts => map(sorts, (sort: ISort, index: number): ISort => {
			// Only first sort should have visible direction
			if (index === 0) {
				this.updateVisualSortIndicator(sort);
			} else {
				this.clearVisualSortIndicator(sort);
			}
			return sort;
		}));
	}

	sort(data$: Observable<any[]>): Observable<any[]> {
		return data$.combineLatest(this.sortList$).map(([data, sorts]) => {
			return this.sorter.sort(data, sorts);
		});
	}

	updateSorts(column: IColumn<any>): void {
		const sortList = this._sortList.getValue();
		let updatedSortList;
		let firstSort: ISort = sortList[0];

		// If column is already the primary sort, change the direction
		if (firstSort != null && firstSort.column === column) {
			updatedSortList = this.toggleFirstSort(firstSort, column.secondarySorts != null, sortList);
		} else {
			updatedSortList = this.setFirstSort(column, sortList);
		}

		firstSort = updatedSortList[0];
		this.updateVisualColumnSorting(updatedSortList);

		// If column has secondary sorts, wipe the sort order and just apply the secondary sorts
		if (firstSort != null && column.secondarySorts != null) {
			let secondarySorts: ISort[] = this.buildSecondarySorts(firstSort.direction, column.secondarySorts);
			updatedSortList = [firstSort, ...secondarySorts];
		} else {
			// If not using column secondary sorts, limit the maximum number
			//  of sorts applied to the maximum number of sorts
			updatedSortList = take(updatedSortList, this.maxColumnSorts);
		}

		this._sortList.next(updatedSortList);
	}

	toggleFirstSort(firstSort: ISort, hasSecondarySorts: boolean, sortList: ISort[]): ISort[] {
		firstSort.direction = SortDirection.toggle(firstSort.direction);

		// Clear sort
		if (firstSort.direction === SortDirection.none) {
			this.clearVisualSortIndicator(firstSort);
			firstSort = null;

			// If the column has secondary sorts don't fall back to a
			//  secondary sort, instead just clear all sorts
			if (hasSecondarySorts) {
				return [];
			} else { // otehrwise, clear the primary sort and fallback to previous sort
				return drop(sortList, 1);
			}
		} else {
			return sortList;
		}
	}

	setFirstSort(column: IColumn<any>, sortList: ISort[]): ISort[] {
		// Make column primary ascending sort

		// Remove any existing non-primary sorts on column
		const listWithSortRemoved = reject(sortList, (sort: ISort): boolean => {
			return column === sort.column;
		});

		// Build ascending sort for column
		let newSort: ISort = {
			column: column,
			direction: SortDirection.ascending,
		};

		return [newSort, ...sortList];
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

	private updateVisualColumnSorting(sorts: ISort[]): void {
		each(sorts, (sort: ISort, index: number): void => {
			// Only first sort should have visible direction
			if (index === 0) {
				this.updateVisualSortIndicator(sort);
			} else {
				this.clearVisualSortIndicator(sort);
			}
		});
	}

	private updateVisualSortIndicator(sort: ISort): void {
		sort.column.sortDirection = sort.direction;
	}

	private clearVisualSortIndicator(sort: ISort): void {
		sort.column.sortDirection = null;
	}
}
