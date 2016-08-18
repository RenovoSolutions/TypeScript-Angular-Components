import { Component, Input, ContentChild, ContentChildren, ViewChildren, QueryList, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { isUndefined, isObject, each, map, find, take, every } from 'lodash';

import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __genericSearchFilter = services.genericSearchFilter;
import __isEmpty = filters.isEmpty;

import { IViewDataEntity } from '../../types/viewData';
import { IDataSource } from './dataSources/index';
import { DataPager } from './paging/dataPager/dataPager.service';
import { IColumn, ISecondarySorts, IBreakpointSize } from './column';
import { ISort, IPartialSort, SortDirection, ISortDirections } from './sorts/index';

import { CardComponent } from './card/card';
import { ColumnHeaderComponent } from './container/columnHeader/columnHeader';
import { CardContentTemplate, CardFooterTemplate } from '../cards/index';
import { ContainerHeaderTemplate, ContainerFooterTemplate, ColumnContentTemplate } from './templates/index';
import { ColumnHeaderTemplate } from './templates/columnHeader.template';
import { ContainerHeaderComponent } from './container/containerHeader.component';
import { ContainerFooterComponent } from './container/containerFooter.component';
import { BusyComponent } from '../busy/busy';
import { ISaveAction } from '../form/form';

import { ICardContainerBuilder, CardContainerBuilder, CardContainerType } from './builder/cardContainerBuilder.service';

export const cardContainerInputs = {
	builder: 'builder',
	save: 'save',
	searchPlaceholder: 'searchPlaceholder'
};

export const defaultMaxColumnSorts: number = 2;

@Component({
	selector: 'rlCardContainer',
	template: require('./cardContainer.html'),
	inputs: [
		cardContainerInputs.builder,
		cardContainerInputs.save,
		cardContainerInputs.searchPlaceholder
	],
	providers: [DataPager],
	directives: [
		ContainerHeaderComponent,
		ContainerFooterComponent,
		ColumnHeaderComponent,
		CardComponent,
		BusyComponent,
	],
	pipes: [__isEmpty.IsEmptyPipe],
})
export class CardContainerComponent<T> implements OnInit {
	builder: CardContainerBuilder;
	save: ISaveAction<any>;
	searchPlaceholder: string;

	dataSource: IDataSource<T>;
	filters: filters.IFilter[];
	searchFilter: __genericSearchFilter.IGenericSearchFilter;
	paging: boolean;
	columns: IColumn<any>[];
	clickableCards: boolean;
	maxColumnSorts: number;
	permanentFooters: boolean;
	saveWhenInvalid: boolean;
	sortDirection: ISortDirections;

	numberSelected: number = 0;
	numberSelectedChanges: Subject<number> = new Subject<number>();

	objectUtility: __object.IObjectUtility;
	arrayUtility: __array.IArrayUtility;
	injectedPager: DataPager;

	type: CardContainerType = CardContainerType.standard;

	@ContentChild(ContainerHeaderTemplate) containerHeader: ContainerHeaderTemplate;
	@ContentChild(ContainerFooterTemplate) containerFooter: ContainerFooterTemplate;
	@ContentChild(CardContentTemplate) cardContent: CardContentTemplate;
	@ContentChild(CardFooterTemplate) cardFooter: CardFooterTemplate;
	@ContentChildren(ColumnContentTemplate) columnTemplates: QueryList<ColumnContentTemplate>;
	@ContentChildren(ColumnHeaderTemplate) columnHeaders: QueryList<ColumnHeaderTemplate>;

	@ViewChildren(CardComponent) cardChildren: QueryList<CardComponent<T>>;

	get cards(): CardComponent<T>[] {
		return this.cardChildren.toArray();
	}

	constructor(object: __object.ObjectUtility
			, array: __array.ArrayUtility
			, pager: DataPager) {
		this.objectUtility = object;
		this.arrayUtility = array;
		this.injectedPager = pager;
		this.save = <ISaveAction>() => Promise.resolve();
	}

	ngOnInit(): void {
		if (this.builder != null) {
			this.builder.setCardContainerProperties(this);
		}

		this.permanentFooters = isUndefined(this.permanentFooters) ? false : this.permanentFooters;
		this.maxColumnSorts = this.maxColumnSorts || defaultMaxColumnSorts;
		this.sortDirection = SortDirection;

		this.syncFilters();

		this.setupPaging();

		if (this.dataSource.sorts == null) {
			this.dataSource.sorts = [];
		}
	}

	openCard(): boolean {
		return every(map(this.cards, card => card.close()));
	}

	sort(column: IColumn<any>): void {
		let sortList: ISort[] = this.dataSource.sorts;
		let firstSort: ISort = sortList[0];

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
					sortList.length = 0;
				} else { // otehrwise, clear the primary sort and fallback to previous sort
					sortList.shift();
				}
			}
		} else {
			// Else make column primary ascending sort

			// Remove any existing non-primary sorts on column
			this.arrayUtility.remove(sortList, (sort: ISort): boolean => {
				return column === sort.column;
			});

			// Build ascending sort for column
			let newSort: ISort = {
				column: column,
				direction: SortDirection.ascending,
			};

			sortList.unshift(newSort);

			firstSort = newSort;
		}

		this.updateVisualColumnSorting();

		// If column has secondary sorts, wipe the sort order and just apply the secondary sorts
		if (firstSort != null && column.secondarySorts != null) {
			sortList.length = 0;
			let secondarySorts: ISort[] = this.buildSecondarySorts(firstSort.direction, column.secondarySorts);
			sortList.push(firstSort);
			sortList.push.apply(sortList, secondarySorts);
		} else {
			// If not using column secondary sorts, limit the maximum number
			//  of sorts applied to the maximum number of sorts
			this.dataSource.sorts = take(sortList, this.maxColumnSorts);
		}

		this.dataSource.onSortChange();
	}

	private syncFilters(): void {
		if (!this.objectUtility.isNullOrEmpty(this.filters)) {
			this.dataSource.filters = this.filters;
			this.dataSource.refresh();
		} else if (this.dataSource.filters != null) {
			this.filters = this.dataSource.filters;
		}
	}

	private setupPaging(): void {
		// If paging flag is specified, card container controls pager instance
		if (this.paging != null) {
			if (this.paging === false) {
				this.dataSource.pager = null;
			} else {
				this.builder._pager = this.injectedPager;
				this.dataSource.pager = this.builder._pager;
			}
		} else if (this.dataSource.pager) {
			// If the paging flag is not set and the dataSource has a pager, save a reference here
			this.builder._pager = this.dataSource.pager;
		}

		this.dataSource.initPager();
	}

	private lookupColumn(label: string): IColumn<any> {
		return find(this.columns, (column: IColumn<any>): boolean => {
			return column.label === label;
		});
	}

	private buildSecondarySorts(direction: SortDirection, secondarySorts: ISecondarySorts): ISort[] {
		let sortList: IPartialSort[] = secondarySorts[SortDirection.getFullName(direction)];
		return map(sortList, (sort: IPartialSort): ISort => {
			return {
				direction: sort.direction,
				column: this.lookupColumn(sort.column),
			};
		});
	}

	private updateVisualColumnSorting(): void {
		each(this.dataSource.sorts, (sort: ISort, index: number): void => {
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

	private getColumnTemplate(columnName: string): ColumnHeaderTemplate {
		return this.columnHeaders.filter(column => column.name === columnName)[0];
	}
}