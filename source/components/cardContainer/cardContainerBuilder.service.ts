'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { filters, services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

import { IColumn } from './column';
import * as dataSources from './dataSources/dataSources.module';
import * as filterGroup from './filters/filterGroup/filterGroup.module';
import { factoryName as columnSearchFactoryName, IColumnSearchFilterFactory, IColumnSearchFilter } from './filters/columnSearchFilter/columnSearchFilter.service';

export let factoryName: string = 'cardContainerBuilder';

export interface ICardContainerBuilder {
	dataSource: IDataSourceBuilder;
	filters: IFilterBuilder;

	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	maxColumnSorts: number;
	disableSelection: { (item: any): string };

	useSearch(): __genericSearchFilter.IGenericSearchFilter;
	usePaging(): void;
	addColumn(column: IColumn): void;
	useClickableCards(): void;
	usePermanentFooters(): void;
	useSelection(): void;
}

export interface IDataSourceBuilder {
	buildSimpleDataSource<TDataType>(data: TDataType[]): dataSources.IDataSource<TDataType>;
	buildDataServiceDataSource<TDataType>(getDataSet: dataSources.dataServiceDataSource.IDataServiceFunction<TDataType>): dataSources.IDataSource<TDataType>;
}

export interface IFilterBuilder {
	buildFilterGroup(settings: filterGroup.IFilterGroupSettings): filterGroup.IFilterGroup;
	buildModeFilterGroup(settings: filterGroup.modeFilterGroup.IModeFilterGroupSettings): filterGroup.modeFilterGroup.IModeFilterGroup;
	buildRangeFilterGroup(settings: filterGroup.rangeFilterGroup.IRangeFilterGroupSettings): filterGroup.rangeFilterGroup.IRangeFilterGroup;
	buildColumnSearchFilter(): IColumnSearchFilter;
}

export class CardContainerBuilder implements ICardContainerBuilder {
	_dataSource: dataSources.IDataSource<any>;
	_filters: filters.IFilter[];
	_paging: boolean;
	_columns: IColumn[];
	_clickableCards: boolean;
	_permanentFooters: boolean;
	_selectableCards: boolean;
	_disableSelection: { (item: any): string };
	_searchFilter: filters.IFilter[];

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

	useSearch(): __genericSearchFilter.IGenericSearchFilter {
		let factory: __genericSearchFilter.IGenericSearchFilterFactory = this.$injector.get(__genericSearchFilter.factoryName);
		this._searchFilter = factory.getInstance();
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
}

export class DataSourceBuilder implements IDataSourceBuilder {
	constructor(private $injector: angular.auto.IInjectorService
			, private parent: CardContainerBuilder) {
		let factory: dataSources.simpleDataSource.ISimpleDataSourceFactory = this.$injector.get(dataSources.simpleDataSource.factoryName);
		parent._dataSource = factory.getInstance([]);
	}

	buildSimpleDataSource<TDataType>(data: TDataType[]): dataSources.IDataSource<TDataType> {
		let factory: dataSources.simpleDataSource.ISimpleDataSourceFactory = this.$injector.get(dataSources.simpleDataSource.factoryName);
		this.parent._dataSource = factory.getInstance(data);
		return this.parent._dataSource;
	}

	buildDataServiceDataSource<TDataType>(getDataSet: dataSources.dataServiceDataSource.IDataServiceFunction<TDataType>): dataSources.IDataSource<TDataType> {
		let factory: dataSources.dataServiceDataSource.IDataServiceDataSourceFactory = this.$injector.get(dataSources.dataServiceDataSource.factoryName);
		this.parent._dataSource = factory.getInstance(getDataSet);
		return this.parent._dataSource;
	}

	buildServerSearchDataSource<TDataType>(getDataSet: dataSources.serverSearchDataSource.IDataServiceSearchFunction<TDataType>
										, getFilterModel?: dataSources.serverSearchDataSource.IGetFilterModel<TDataType>
										, validateModel?: dataSources.serverSearchDataSource.IValidateFilterModel<TDataType>): dataSources.IDataSource<TDataType> {
		if (_.isUndefined(this.parent._searchFilter)) {
			this.parent.useSearch();
		}

		let factory: dataSources.serverSearchDataSource.IServerSearchDataSourceFactory = this.$injector.get(dataSources.serverSearchDataSource.factoryName);
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
		let factory: filterGroup.IFilterGroupFactory = this.$injector.get(filterGroup.factoryName);
		let filter: filterGroup.IFilterGroup = factory.getInstance(settings);
		this.parent._filters.push(filter);
		return filter;
	}

	buildModeFilterGroup(settings: filterGroup.modeFilterGroup.IModeFilterGroupSettings): filterGroup.modeFilterGroup.IModeFilterGroup {
		let factory: filterGroup.modeFilterGroup.IModeFilterGroupFactory = this.$injector.get(filterGroup.modeFilterGroup.factoryName);
		let filter: filterGroup.modeFilterGroup.IModeFilterGroup = factory.getInstance(settings);
		this.parent._filters.push(filter);
		return filter;
	}

	buildRangeFilterGroup(settings: filterGroup.rangeFilterGroup.IRangeFilterGroupSettings): filterGroup.rangeFilterGroup.IRangeFilterGroup {
		let factory: filterGroup.rangeFilterGroup.IRangeFilterGroupFactory = this.$injector.get(filterGroup.rangeFilterGroup.factoryName);
		let filter: filterGroup.rangeFilterGroup.IRangeFilterGroup = factory.getInstance(settings);
		this.parent._filters.push(filter);
		return filter;
	}

	buildColumnSearchFilter(): IColumnSearchFilter {
		let factory: IColumnSearchFilterFactory = this.$injector.get(columnSearchFactoryName);
		let filter: IColumnSearchFilter = factory.getInstance();
		this.parent._filters.push(filter);
		return filter;
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
