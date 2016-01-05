'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { filters, services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

import { CardContainerController } from './cardContainer';
import { IColumn } from './column';
import * as dataSources from './dataSources/dataSources.module';
import * as filterGroup from './filters/filterGroup/filterGroup.module';
import * as selectFilter from './filters/selectFilter/selectFilter.module';
import { factoryName as columnSearchFactoryName, IColumnSearchFilterFactory, IColumnSearchFilter } from './filters/columnSearchFilter/columnSearchFilter.service';

import IDataSource = dataSources.IDataSource;
import IDataSourceDataServiceFunction = dataSources.dataServiceDataSource.IDataServiceFunction;
import IServerSearchDataServiceFunction = dataSources.serverSearchDataSource.IDataServiceSearchFunction;
import IGetFilterModel = dataSources.serverSearchDataSource.IGetFilterModel;
import IValidateFilterModel = dataSources.serverSearchDataSource.IValidateFilterModel;
import IFilter = filters.IFilter;
import IGenericSearchFilter = __genericSearchFilter.IGenericSearchFilter;
import IFilterGroup = filterGroup.IFilterGroup;
import IFilterGroupSettings = filterGroup.IFilterGroupSettings;
import IModeFilterGroup = filterGroup.modeFilterGroup.IModeFilterGroup;
import IModeFilterGroupSettings = filterGroup.modeFilterGroup.IModeFilterGroupSettings;
import IRangeFilterGroup = filterGroup.rangeFilterGroup.IRangeFilterGroup;
import IRangeFilterGroupSettings = filterGroup.rangeFilterGroup.IRangeFilterGroupSettings;
import ISelectFilter = selectFilter.ISelectFilter;

export let factoryName: string = 'cardContainerBuilder';

export {
	IColumn,
	IDataSource,
	IDataSourceDataServiceFunction,
	IServerSearchDataServiceFunction,
	IGetFilterModel,
	IValidateFilterModel,
	IFilter,
	IGenericSearchFilter,
	IColumnSearchFilter,
	IFilterGroup,
	IFilterGroupSettings,
	IModeFilterGroup,
	IModeFilterGroupSettings,
	IRangeFilterGroup,
	IRangeFilterGroupSettings,
	ISelectFilter,
}

export interface ICardContainerBuilder {
	dataSource: IDataSourceBuilder;
	filters: IFilterBuilder;

	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	maxColumnSorts: number;
	disableSelection: { (item: any): string };

	useSearch(): IGenericSearchFilter;
	usePaging(): void;
	addColumn(column: IColumn): void;
	useClickableCards(): void;
	usePermanentFooters(): void;
	useSelection(): void;
}

export interface IDataSourceBuilder {
	buildSimpleDataSource<TDataType>(data: TDataType[]): IDataSource<TDataType>;
	buildDataServiceDataSource<TDataType>(getDataSet: IDataSourceDataServiceFunction<TDataType>): IDataSource<TDataType>;
	buildServerSearchDataSource<TDataType>(getDataSet: IServerSearchDataServiceFunction<TDataType>
										, getFilterModel?: IGetFilterModel<TDataType>
										, validateModel?: IValidateFilterModel<TDataType>): IDataSource<TDataType>
}

export interface IFilterBuilder {
	buildFilterGroup(settings: IFilterGroupSettings): IFilterGroup;
	buildModeFilterGroup(settings: IModeFilterGroupSettings): IModeFilterGroup;
	buildRangeFilterGroup(settings: IRangeFilterGroupSettings): IRangeFilterGroup;
	buildSelectFilter<T>(valueSelector: string | { (item: T): string }): ISelectFilter<T>;
	buildColumnSearchFilter(): IColumnSearchFilter;
	addCustomFilter(filter: IFilter): void;
}

export class CardContainerBuilder implements ICardContainerBuilder {
	_dataSource: IDataSource<any>;
	_filters: filters.IFilter[];
	_paging: boolean;
	_columns: IColumn[];
	_clickableCards: boolean;
	_permanentFooters: boolean;
	_selectableCards: boolean;
	_disableSelection: { (item: any): string };
	_searchFilter: IGenericSearchFilter;

	dataSource: IDataSourceBuilder;
	filters: IFilterBuilder;

	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	maxColumnSorts: number;

	constructor(private $injector: angular.auto.IInjectorService) {
		this.dataSource = new DataSourceBuilder($injector, this);
		this.filters = new FilterBuilder($injector, this);
		this._columns = [];
	}

	useSearch(filter?: IGenericSearchFilter): IGenericSearchFilter {
		if (filter == null) {
			let factory: __genericSearchFilter.IGenericSearchFilterFactory = this.$injector.get<any>(__genericSearchFilter.factoryName);
			filter = factory.getInstance();
		}

		this._searchFilter = filter;
		return this._searchFilter;
	}

	usePaging(): void {
		this._paging = true;
	}

	addColumn(column: IColumn): void {
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

	set disableSelection(value: { (item: any): string }) {
		if (!this._selectableCards) {
			this.useSelection();
		}

		this._disableSelection = value;
	}

	setCardContainerProperties(cardContainer: CardContainerController): void {
		if (this._searchFilter != null) {
			this._filters.push(this._searchFilter);
		}

		cardContainer.source = this._dataSource;
		cardContainer.filters = this._filters;
		cardContainer.paging = this._paging;
		cardContainer.columns = this._columns;
		cardContainer.containerData = this.containerData;
		cardContainer.cardController = this.cardController;
		cardContainer.cardControllerAs = this.cardControllerAs;
		cardContainer.cardAs = this.cardAs;
		cardContainer.clickableCards = this._clickableCards;
		cardContainer.maxColumnSorts = this.maxColumnSorts;
		cardContainer.permanentFooters = this._permanentFooters;
		cardContainer.selectableCards = this._selectableCards;
		cardContainer.disableSelection = this._disableSelection;
	}
}

export class DataSourceBuilder implements IDataSourceBuilder {
	constructor(private $injector: angular.auto.IInjectorService
			, private parent: CardContainerBuilder) {
		let factory: dataSources.simpleDataSource.ISimpleDataSourceFactory = this.$injector.get<any>(dataSources.simpleDataSource.factoryName);
		parent._dataSource = factory.getInstance([]);
	}

	buildSimpleDataSource<TDataType>(data: TDataType[]): IDataSource<TDataType> {
		let factory: dataSources.simpleDataSource.ISimpleDataSourceFactory = this.$injector.get<any>(dataSources.simpleDataSource.factoryName);
		this.parent._dataSource = factory.getInstance(data);
		return this.parent._dataSource;
	}

	buildDataServiceDataSource<TDataType>(getDataSet: IDataSourceDataServiceFunction<TDataType>): IDataSource<TDataType> {
		let factory: dataSources.dataServiceDataSource.IDataServiceDataSourceFactory = this.$injector.get<any>(dataSources.dataServiceDataSource.factoryName);
		this.parent._dataSource = factory.getInstance(getDataSet);
		return this.parent._dataSource;
	}

	buildServerSearchDataSource<TDataType>(getDataSet: IServerSearchDataServiceFunction<TDataType>
										, getFilterModel?: IGetFilterModel<TDataType>
										, validateModel?: IValidateFilterModel<TDataType>): IDataSource<TDataType> {
		if (_.isUndefined(this.parent._searchFilter)) {
			this.parent.useSearch();
		}

		let factory: dataSources.serverSearchDataSource.IServerSearchDataSourceFactory = this.$injector.get<any>(dataSources.serverSearchDataSource.factoryName);
		this.parent._dataSource = factory.getInstance(getDataSet, this.parent._searchFilter, getFilterModel, validateModel);
		return this.parent._dataSource;
	}
}

export class FilterBuilder implements IFilterBuilder {
	constructor(private $injector: angular.auto.IInjectorService
			, private parent: CardContainerBuilder) {
		this.parent._filters = [];
	}

	buildFilterGroup(settings: filterGroup.IFilterGroupSettings): filterGroup.IFilterGroup {
		let factory: filterGroup.IFilterGroupFactory = this.$injector.get<any>(filterGroup.factoryName);
		let filter: filterGroup.IFilterGroup = factory.getInstance(settings);
		this.parent._filters.push(filter);
		return filter;
	}

	buildModeFilterGroup(settings: filterGroup.modeFilterGroup.IModeFilterGroupSettings): filterGroup.modeFilterGroup.IModeFilterGroup {
		let factory: filterGroup.modeFilterGroup.IModeFilterGroupFactory = this.$injector.get<any>(filterGroup.modeFilterGroup.factoryName);
		let filter: filterGroup.modeFilterGroup.IModeFilterGroup = factory.getInstance(settings);
		this.parent._filters.push(filter);
		return filter;
	}

	buildRangeFilterGroup(settings: filterGroup.rangeFilterGroup.IRangeFilterGroupSettings): filterGroup.rangeFilterGroup.IRangeFilterGroup {
		let factory: filterGroup.rangeFilterGroup.IRangeFilterGroupFactory = this.$injector.get<any>(filterGroup.rangeFilterGroup.factoryName);
		let filter: filterGroup.rangeFilterGroup.IRangeFilterGroup = factory.getInstance(settings);
		this.parent._filters.push(filter);
		return filter;
	}

	buildSelectFilter<T>(valueSelector: string | { (item: T): string }): ISelectFilter<T> {
		let factory: selectFilter.ISelectFilterFactory = this.$injector.get<any>(selectFilter.factoryName);
		let filter: ISelectFilter<T> = factory.getInstance(valueSelector);
		this.parent._filters.push(filter);
		return filter;
	}

	buildColumnSearchFilter(): IColumnSearchFilter {
		let factory: IColumnSearchFilterFactory = this.$injector.get<any>(columnSearchFactoryName);
		let filter: IColumnSearchFilter = factory.getInstance();
		this.parent._filters.push(filter);
		return filter;
	}

	addCustomFilter(filter: filters.IFilter): void {
		this.parent._filters.push(filter);
	}
}

export interface ICardContainerBuilderFactory {
	getInstance(): ICardContainerBuilder;
}

cardContainerBuilderFactory.$inject = ['$injector'];
export function cardContainerBuilderFactory($injector: angular.auto.IInjectorService): ICardContainerBuilderFactory {
	return {
		getInstance(): ICardContainerBuilder {
			return new CardContainerBuilder($injector);
		},
	};
}
