import { Injector, Injectable } from '@angular/core';

import { filters, services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

import { CardContainerComponent } from '../cardContainer';
import { IColumn } from '../column';
import * as dataSources from '../dataSources/index';
import * as paging from '../paging/index';

import { IDataSourceBuilder, DataSourceBuilder } from './dataSourceBuilder.service';
import { IFilterBuilder, FilterBuilder } from './filterBuilder.service';

export interface ICardContainerBuilder {
	dataSource: IDataSourceBuilder;
	filters: IFilterBuilder;

	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	maxColumnSorts: number;
	disableSelection: { (item: any): string };

	useSearch(tokenized?: boolean): __genericSearchFilter.IGenericSearchFilter;
	searchFilter(filter: __genericSearchFilter.IGenericSearchFilter): __genericSearchFilter.IGenericSearchFilter;
	usePaging(): void;
	addColumn<TItemType>(column: IColumn<TItemType>): void;
	useClickableCards(): void;
	usePermanentFooters(): void;
	useSelection(): void;
	renderFilters(): void;
	saveWhenInvalid(): void;
}


@Injectable()
export class CardContainerBuilder implements ICardContainerBuilder {
	_dataSource: dataSources.IDataSource<any>;
	_filters: filters.IFilter[];
	_paging: boolean;
	_columns: IColumn<any>[];
	_clickableCards: boolean;
	_permanentFooters: boolean;
	_selectableCards: boolean;
	_disableSelection: { (item: any): string };
	_searchFilter: __genericSearchFilter.IGenericSearchFilter;
	_pager: paging.IDataPager;
	_renderFilters: boolean;
	_saveWhenInvalid: boolean;

	dataSource: DataSourceBuilder;
	filters: FilterBuilder;

	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	maxColumnSorts: number;

	private injector: Injector;

	constructor(injector: Injector
			, dataSourceBuilder: DataSourceBuilder
			, filterBuilder: FilterBuilder) {
		this.injector = injector;
		this.dataSource = dataSourceBuilder;
		this.dataSource.init(this);
		this.filters = filterBuilder;
		this.filters.init(this);
		this._columns = [];
	}

	useSearch(tokenized?: boolean): __genericSearchFilter.IGenericSearchFilter {
		let factory: __genericSearchFilter.IGenericSearchFilterFactory = this.injector.get(__genericSearchFilter.genericSearchFilterToken);
		this._searchFilter = factory.getInstance(tokenized);
		return this._searchFilter;
	}

	searchFilter(filter: __genericSearchFilter.IGenericSearchFilter): __genericSearchFilter.IGenericSearchFilter {
		this._searchFilter = filter;
		return this._searchFilter;
	}

	usePaging(): void {
		this._paging = true;
	}

	addColumn<TItemType>(column: IColumn<TItemType>): void {
		this._columns.push(column);
	}

	useClickableCards(): void {
		this._clickableCards = true;
	}

	usePermanentFooters(): void {
		this._permanentFooters = true;
	}

	useSelection(): void {
		this._selectableCards = true;
	}

	renderFilters(): void {
		this._renderFilters = true;
	}

	saveWhenInvalid(): void {
		this._saveWhenInvalid = true;
	}

	set disableSelection(value: { (item: any): string }) {
		if (!this._selectableCards) {
			this.useSelection();
		}

		this._disableSelection = value;
	}

	setCardContainerProperties(cardContainer: CardContainerComponent<any>): void {
		if (this._searchFilter != null) {
			this._filters.push(this._searchFilter);
		}

		cardContainer.dataSource = this._dataSource;
		cardContainer.filters = this._filters;
		cardContainer.searchFilter = this._searchFilter;
		cardContainer.paging = this._paging;
		cardContainer.columns = this._columns;
		// cardContainer.containerData = this.containerData;
		cardContainer.clickableCards = this._clickableCards;
		cardContainer.maxColumnSorts = this.maxColumnSorts;
		cardContainer.permanentFooters = this._permanentFooters;
		// cardContainer.selectableCards = this._selectableCards;
		// cardContainer.disableSelection = this._disableSelection;
		// cardContainer.renderFilters = this._renderFilters;
		cardContainer.saveWhenInvalid = this._saveWhenInvalid;
	}
}
