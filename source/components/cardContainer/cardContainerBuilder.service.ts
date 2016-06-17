import { Injector, Injectable, Inject } from '@angular/core';
import { isUndefined } from 'lodash';

import { filters, services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __date = services.date;
import __string = services.string;
import __transform = services.transform;
import __synchronizedRequests = services.synchronizedRequests;
import __genericSearchFilter = services.genericSearchFilter;

import { CardContainerComponent } from './cardContainer';
import { IColumn } from './column';
import * as dataSources from './dataSources/index';
import * as cardFilters from './filters/index';
import { ISorter, Sorter } from './sorts/index';

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

export interface IDataSourceBuilder {
	buildSimpleDataSource<TDataType>(data: TDataType[]): dataSources.IDataSource<TDataType>;
	buildDataServiceDataSource<TDataType>(getDataSet: dataSources.IDataServiceFunction<TDataType>): dataSources.IAsyncDataSource<TDataType>;
	buildClientServerDataSource<TDataType>(getDataSet: dataSources.IDataServiceFunction<TDataType>
											, getFilterModel?: dataSources.IGetFilterModel<TDataType>
											, validateModel?: dataSources.IValidateFilterModel<TDataType>): dataSources.IAsyncDataSource<TDataType>;
	buildServerSideDataSource<TDataType>(getDataSet: dataSources.IServerSearchFunction<TDataType>): dataSources.IAsyncDataSource<TDataType>;
	buildSmartDataSource<TDataType>(getDataSet: dataSources.IServerSearchFunction<TDataType>): dataSources.IAsyncDataSource<TDataType>;
	buildCustomDataSource<TDataType>(dataSource: dataSources.IDataSource<TDataType>): dataSources.IDataSource<TDataType>;
}

export interface IFilterBuilder {
	buildFilterGroup(settings: cardFilters.IFilterGroupSettings): cardFilters.IFilterGroup;
	buildModeFilterGroup<TItemType>(settings: cardFilters.IModeFilterGroupSettings<TItemType>): cardFilters.IModeFilterGroup;
	buildRangeFilterGroup<TItemType>(settings: cardFilters.IRangeFilterGroupSettings<TItemType>): cardFilters.IRangeFilterGroup;
	buildSelectFilter<TDataType, TFilterType>(settings: cardFilters.ISelectFilterSettings<TDataType, TFilterType>): cardFilters.ISelectFilter<TDataType>;
	buildDateFilter(valueSelector:cardFilters.IDateFilterSettings): cardFilters.IDateFilter;
	buildColumnSearchFilter(): cardFilters.ColumnSearchFilter;
	addCustomFilter(filter: filters.IFilter): void;

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
	_pager: dataSources.IDataPager;
	_renderFilters: boolean;
	_saveWhenInvalid: boolean;

	dataSource: IDataSourceBuilder;
	filters: IFilterBuilder;

	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	maxColumnSorts: number;

	private injector: Injector;

	constructor(injector: Injector
			, dataSourceBuilder: DataSourceBuilder
			, filterBuilder: FilterBuilder) {
		this.dataSource = dataSourceBuilder;
		this.filters = filterBuilder;
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

	setCardContainerProperties(cardContainer: CardContainerComponent): void {
		if (this._searchFilter != null) {
			this._filters.push(this._searchFilter);
		}

		cardContainer.dataSource = this._dataSource;
		cardContainer.filters = this._filters;
		cardContainer.searchFilter = this._searchFilter;
		cardContainer.paging = this._paging;
		cardContainer.columns = this._columns;
		cardContainer.containerData = this.containerData;
		cardContainer.clickableCards = this._clickableCards;
		cardContainer.maxColumnSorts = this.maxColumnSorts;
		cardContainer.permanentFooters = this._permanentFooters;
		cardContainer.selectableCards = this._selectableCards;
		cardContainer.disableSelection = this._disableSelection;
		cardContainer.renderFilters = this._renderFilters;
		cardContainer.saveWhenInvalid = this._saveWhenInvalid;
	}
}

@Injectable()
export class DataSourceBuilder implements IDataSourceBuilder {
	private injector: Injector;
	private parent: CardContainerBuilder;
	private object: __object.IObjectUtility;
	private array: __array.IArrayUtility;
	private synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory;
	private sorter: ISorter;

	constructor(injector: Injector
			, parent: CardContainerBuilder
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__array.arrayToken) array: __array.IArrayUtility
			, @Inject(__synchronizedRequests.synchronizedRequestsToken) synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory
			, sorter: Sorter) {
		this.injector = injector;
		this.parent = parent;
		this.object = object;
		this.array = array;
		this.synchronizedRequestsFactory = synchronizedRequestsFactory;
		this.sorter = sorter;

		parent._dataSource = this.buildSimpleDataSource([]);
	}

	buildSimpleDataSource<TDataType>(data: TDataType[]): dataSources.IDataSource<TDataType> {
		let processor: dataSources.IDataSourceProcessor = new dataSources.DataSourceProcessor(this.object, this.sorter);
		this.parent._dataSource = new dataSources.SimpleDataSource(data, processor, this.array);
		return this.parent._dataSource;
	}

	buildDataServiceDataSource<TDataType>(getDataSet: dataSources.IDataServiceFunction<TDataType>): dataSources.IAsyncDataSource<TDataType> {
		let processor: dataSources.IDataSourceProcessor = new dataSources.DataSourceProcessor(this.object, this.sorter);
		this.parent._dataSource = new dataSources.DataServiceDataSource(getDataSet, processor, this.array, this.synchronizedRequestsFactory);
		return <any>this.parent._dataSource;
	}

	buildClientServerDataSource<TDataType>(getDataSet: dataSources.IDataServiceFunction<TDataType>
										, getFilterModel?: dataSources.IGetFilterModel<TDataType>
										, validateModel?: dataSources.IValidateFilterModel<TDataType>): dataSources.IAsyncDataSource<TDataType> {
		if (isUndefined(this.parent._searchFilter)) {
			this.parent.useSearch();
		}

		let processor: dataSources.IDataSourceProcessor = new dataSources.DataSourceProcessor(this.object, this.sorter);
		this.parent._dataSource = new dataSources.ClientServerDataSource(getDataSet, this.parent._searchFilter, getFilterModel, validateModel, processor, this.array, this.object, this.synchronizedRequestsFactory);
		return <any>this.parent._dataSource;
	}

	buildServerSideDataSource<TDataType>(getDataSet: dataSources.IServerSearchFunction<TDataType>): dataSources.IAsyncDataSource<TDataType> {
		let processor: dataSources.IDataSourceProcessor = new dataSources.DataSourceProcessor(this.object, this.sorter);
		this.parent._dataSource = new dataSources.ServerSideDataSource(getDataSet, processor, this.array, this.object, this.synchronizedRequestsFactory);
		return <any>this.parent._dataSource;
	}

	buildSmartDataSource<TDataType>(getDataSet: dataSources.IServerSearchFunction<TDataType>): dataSources.IAsyncDataSource<TDataType> {
		let processor: dataSources.IDataSourceProcessor = new dataSources.DataSourceProcessor(this.object, this.sorter);
		this.parent._dataSource = new dataSources.SmartDataSource(getDataSet, processor, this.array, this.object, this.synchronizedRequestsFactory);
		return <any>this.parent._dataSource;
	}

	buildCustomDataSource<TDataType>(dataSource: dataSources.IDataSource<TDataType>): dataSources.IDataSource<TDataType>{
		this.parent._dataSource = dataSource;
		return this.parent._dataSource;
	}
}

@Injectable()
export class FilterBuilder implements IFilterBuilder {
	private injector: Injector;
	private parent: CardContainerBuilder;
	private object: __object.IObjectUtility;
	private string: __string.IStringUtility;
	private date: __date.IDateUtility;
	private transformService: __transform.ITransformService;

	constructor(injector: Injector
			, parent: CardContainerBuilder
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__string.stringToken) string: __string.IStringUtility
			, @Inject(__date.dateToken) date: __date.IDateUtility
			, @Inject(__transform.transformToken) transform: __transform.ITransformService) {
		this.injector = injector;
		this.parent = parent;
		this.object = object;
		this.date = date;
		this.transformService = transform;

		this.parent._filters = [];
	}

	buildFilterGroup(settings: cardFilters.IFilterGroupSettings): cardFilters.IFilterGroup {
		let filter: cardFilters.IFilterGroup = new cardFilters.FilterGroup(settings, this.object);
		this.parent._filters.push(filter);
		return filter;
	}

	buildModeFilterGroup<TItemType>(settings: cardFilters.IModeFilterGroupSettings<TItemType>): cardFilters.IModeFilterGroup {
		let filter: cardFilters.IModeFilterGroup = new cardFilters.ModeFilterGroup(settings, this.object, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildRangeFilterGroup<TItemType>(settings: cardFilters.IRangeFilterGroupSettings<TItemType>): cardFilters.IRangeFilterGroup {
		let filter: cardFilters.IRangeFilterGroup = new cardFilters.RangeFilterGroup(settings, this.object, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildSelectFilter<TDataType, TFilterType>(settings: cardFilters.ISelectFilterSettings<TDataType, TFilterType>): cardFilters.ISelectFilter<TDataType> {
		let filter: cardFilters.ISelectFilter<TDataType> = new cardFilters.SelectFilter(settings, this.object, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildDateFilter(settings: cardFilters.IDateFilterSettings): cardFilters.IDateFilter {
		let filter: cardFilters.IDateFilter = new cardFilters.DateFilter(settings, this.date, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildColumnSearchFilter(): cardFilters.ColumnSearchFilter {
		let filter: cardFilters.ColumnSearchFilter = new cardFilters.ColumnSearchFilter(this.object, this.string, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	addCustomFilter(filter: filters.IFilter): void {
		this.parent._filters.push(filter);
	}
}
