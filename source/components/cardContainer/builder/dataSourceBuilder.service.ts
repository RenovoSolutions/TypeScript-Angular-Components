import { Injector, Injectable, Inject } from '@angular/core';
import { isUndefined } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __synchronizedRequests = services.synchronizedRequests;

import * as dataSources from '../dataSources/index';
import { ISorter, Sorter } from '../sorts/index';
import { CardContainerBuilder } from './cardContainerBuilder.service';

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

@Injectable()
export class DataSourceBuilder implements IDataSourceBuilder {
	private injector: Injector;
	private parent: CardContainerBuilder;
	private object: __object.IObjectUtility;
	private array: __array.IArrayUtility;
	private synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory;
	private sorter: ISorter;

	constructor(injector: Injector
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__array.arrayToken) array: __array.IArrayUtility
			, @Inject(__synchronizedRequests.synchronizedRequestsToken) synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory
			, sorter: Sorter) {
		this.injector = injector;
		this.object = object;
		this.array = array;
		this.synchronizedRequestsFactory = synchronizedRequestsFactory;
		this.sorter = sorter;
	}

	init(parent: CardContainerBuilder): void {
		this.parent = parent;

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