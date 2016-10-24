import { Component, Input, ContentChild, ContentChildren, ViewChildren, QueryList, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { isUndefined, isObject, each, map, find, take, every } from 'lodash';

import { IViewDataEntity } from '../../types/viewData';
import { IDataSource } from './dataSources/index';
import { DataPager } from './paging/dataPager/dataPager.service';
import { IColumn, ISecondarySorts, IBreakpointSize } from './column';
import { ISort, IPartialSort, SortDirection, ISortDirections, SortManagerService } from './sorts/index';
import { IFilter, SearchFilter } from './filters/index';

import { CardComponent } from './card/card';
import { CardContentTemplate, CardFooterTemplate } from '../cards/index';
import { ContainerHeaderTemplate, ContainerFooterTemplate, ColumnContentTemplate } from './templates/index';
import { ColumnHeaderTemplate } from './templates/columnHeader.template';
import { ISaveAction } from '../form/form';

import { ICardContainerConstructor, CardContainerBuilderService, CardContainerType } from './builder/cardContainerBuilder.service';

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
	providers: [DataPager, SearchFilter, SortManagerService],
})
export class CardContainerComponent<T> implements OnInit {
	builder: ICardContainerConstructor<T>;
	save: ISaveAction<any>;
	searchPlaceholder: string;

	dataSource: IDataSource<T>;
	filters: IFilter<T, any>[];
	searchFilter: SearchFilter;
	paging: boolean;
	columns: IColumn<any>[];
	clickableCards: boolean;
	maxColumnSorts: number;
	permanentFooters: boolean;
	saveWhenInvalid: boolean;
	sortDirection: ISortDirections;

	protected _numberSelected: BehaviorSubject<number>;
	numberSelected$: Observable<number>;

	injectedPager: DataPager;
	injectedSearchFilter: SearchFilter;
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

	get hasItems$(): Observable<boolean> {
		return this.dataSource.dataSet$.map(dataSet => dataSet && !!dataSet.length);
	}

	constructor(pager: DataPager
			, searchFilter: SearchFilter
			, sortManager: SortManagerService) {
		this.injectedPager = pager;
		this.injectedSearchFilter = searchFilter;
		this.sortManager = sortManager;
		this.save = <ISaveAction>() => null;
		this._numberSelected = new BehaviorSubject(0);
	}

	ngOnInit(): void {
		if (this.builder != null) {
			this.paging = this.builder.paging;
			this.maxColumnSorts = this.builder.maxColumnSorts;
			this.permanentFooters = this.builder.permanentFooters;
			this.columns = this.builder.columns;
			this.dataSource = this.builder.dataSource;
			this.filters = this.builder.filters;

			if (this.builder.search) {
				this.searchFilter = this.injectedSearchFilter;
				this.filters.push(this.searchFilter);
			}
		}

		this.permanentFooters = isUndefined(this.permanentFooters) ? false : this.permanentFooters;
		this.maxColumnSorts = this.maxColumnSorts || defaultMaxColumnSorts;
		this.sortDirection = SortDirection;

		this.syncFilters();

		this.setupPaging();

		// need a way to customize the sorts?
		this.sortManager.setup([], name => this.lookupColumn(name), this.maxColumnSorts);

		this.dataSource.sorts$ = this.sortManager.sortList$;

		this.dataSource.init();
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
				this.dataSource.pager = this.injectedPager;
			}
		}
	}

	private lookupColumn(label: string): IColumn<any> {
		return find(this.columns, (column: IColumn<any>): boolean => {
			return column.label === label;
		});
	}
}
