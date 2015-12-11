'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { filters, services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

import { IColumn } from './column';
import * as dataSources from './dataSources/dataSources.module';

export interface ICardContainerBuilder {
	dataSource: IDataSourceBuilder;

	useSearch(): __genericSearchFilter.IGenericSearchFilter;
}

export interface IDataSourceBuilder {
	buildSimpleDataSource<TDataType>(data: TDataType[]): dataSources.IDataSource<TDataType>;
	buildDataServiceDataSource<TDataType>(getDataSet: dataSources.dataServiceDataSource.IDataServiceFunction<TDataType>): dataSources.IDataSource<TDataType>;
}

export class CardContainerBuilder implements ICardContainerBuilder {
	_dataSource: dataSources.IDataSource<any>;
	_filters: filters.IFilter[];
	_paging: boolean;
	_columns: IColumn[];
	_containerData: any;
	_cardController: string;
	_cardControllerAs: string;
	_cardAs: string;
	_clickableCards: boolean;
	_maxColumnSorts: number;
	_permanentFooters: boolean;
	_selectableCards: boolean;
	_disableSelection: { (item: any): string };
	_searchFilter: filters.IFilter[];

	dataSource: IDataSourceBuilder;

	constructor(private $injector: angular.auto.IInjectorService) {
		this.dataSource = new DataSourceBuilder($injector, this);
	}

	useSearch(): __genericSearchFilter.IGenericSearchFilter {
		let factory: __genericSearchFilter.IGenericSearchFilterFactory = this.$injector.get(__genericSearchFilter.factoryName);
		this._searchFilter = factory.getInstance();
		return this._searchFilter;
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

export interface ICardContainerBuilderFactory {
	getInstance(): ICardContainerBuilder;
}

cardContainerBuilderFactory.$inject = ['$injector'];
function cardContainerBuilderFactory($injector: angular.auto.IInjectorService): ICardContainerBuilderFactory {
	return {
		getInstance(): ICardContainerBuilder {
			return new CardContainerBuilder($injector);
		},
	};
}
