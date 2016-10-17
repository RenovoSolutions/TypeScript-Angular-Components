import { Component, Input, ContentChild, ContentChildren, ViewChildren, QueryList, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { isUndefined, isObject, each, map, find, take, every } from 'lodash';

import { services, filters } from 'typescript-angular-utilities';
import __array = services.array;
import __genericSearchFilter = services.genericSearchFilter;

import { IViewDataEntity } from '../../types/viewData';
import { IDataSourceOld } from './dataSources/index';
import { DataPagerOld } from './paging/dataPager/dataPagerOld.service';
import { IColumn, ISecondarySorts, IBreakpointSize } from './column';
import { ISort, IPartialSort, SortDirection, ISortDirections, SortManagerService } from './sorts/index';

import { CardComponent } from './card/card';
import { CardContentTemplate, CardFooterTemplate } from '../cards/index';
import { ContainerHeaderTemplate, ContainerFooterTemplate, ColumnContentTemplate } from './templates/index';
import { ColumnHeaderTemplate } from './templates/columnHeader.template';
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
	providers: [DataPagerOld, SortManagerService],
})
export class CardContainerComponent<T> implements OnInit {
	builder: CardContainerBuilder;
	save: ISaveAction<any>;
	searchPlaceholder: string;

	dataSource: IDataSourceOld<T>;
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

	arrayUtility: __array.IArrayUtility;
	injectedPager: DataPagerOld;
	sortManager: SortManagerService;

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

	get hasItems(): boolean {
		return this.dataSource.dataSet && !!this.dataSource.dataSet.length;
	}

	constructor(array: __array.ArrayUtility, pager: DataPagerOld, sortManager: SortManagerService) {
		this.arrayUtility = array;
		this.injectedPager = pager;
		this.sortManager = sortManager;
		this.save = <ISaveAction>() => null;
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

		this.sortManager.setup(this.dataSource.sorts, name => this.lookupColumn(name), this.maxColumnSorts);

		this.sortManager.sortList$.subscribe(sorts => this.dataSource.sorts = sorts);
		this.sortManager.sortChange$.subscribe(() => this.dataSource.onSortChange());
	}

	openCard(): boolean {
		return every(map(this.cards, card => card.close()));
	}

	sort(column: IColumn<any>): void {
		this.sortManager.sort(column);
	}

	getColumnTemplate(columnName: string): ColumnHeaderTemplate {
		return this.columnHeaders.filter(column => column.name === columnName)[0];
	}

	private syncFilters(): void {
		if (this.filters) {
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
}
