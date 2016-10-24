import { Injector, Injectable } from '@angular/core';
import { isUndefined } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;

import * as dataSources from '../dataSources/index';
import { ISorter, Sorter } from '../sorts/index';
import { CardContainerBuilderOld } from './cardContainerBuilderOld.service';

export interface IDataSourceBuilderOld {
	buildSimpleDataSource<TDataType>(data: TDataType[]): dataSources.IDataSourceOld<TDataType>;
	buildDataServiceDataSource<TDataType>(getDataSet: dataSources.IDataServiceFunction<TDataType>): dataSources.IAsyncDataSource<TDataType>;
	buildClientServerDataSource<TDataType>(getDataSet: dataSources.IDataServiceSearchFunction<TDataType>
											, getFilterModel?: dataSources.IGetFilterModel<TDataType>
											, validateModel?: dataSources.IValidateFilterModel<TDataType>): dataSources.IAsyncDataSource<TDataType>;
	buildServerSideDataSource<TDataType>(getDataSet: dataSources.IServerSearchFunction<TDataType>): dataSources.IAsyncDataSource<TDataType>;
	buildSmartDataSource<TDataType>(getDataSet: dataSources.IServerSearchFunction<TDataType>): dataSources.IAsyncDataSource<TDataType>;
	buildCustomDataSource<TDataType>(dataSource: dataSources.IDataSourceOld<TDataType>): dataSources.IDataSourceOld<TDataType>;
}

@Injectable()
export class DataSourceBuilderOld implements IDataSourceBuilderOld {
	private injector: Injector;
	private parent: CardContainerBuilderOld;
	private object: __object.ObjectUtility;
	private array: __array.IArrayUtility;
	private sorter: Sorter;

	constructor(injector: Injector
			, object: __object.ObjectUtility
			, array: __array.ArrayUtility
			, sorter: Sorter) {
		this.injector = injector;
		this.object = object;
		this.array = array;
		this.sorter = sorter;
	}

	init(parent: CardContainerBuilderOld): void {
		this.parent = parent;

		parent._dataSource = this.buildSimpleDataSource([]);
	}

	buildSimpleDataSource<TDataType>(data: TDataType[]): dataSources.IDataSourceOld<TDataType> {
		let processor: dataSources.IDataSourceProcessorOld = new dataSources.DataSourceProcessorOld(this.object, this.sorter);
		this.parent._dataSource = new dataSources.SimpleDataSource(data, processor, this.array);
		return this.parent._dataSource;
	}

	buildDataServiceDataSource<TDataType>(getDataSet: dataSources.IDataServiceFunction<TDataType>): dataSources.IAsyncDataSource<TDataType> {
		let processor: dataSources.IDataSourceProcessorOld = new dataSources.DataSourceProcessorOld(this.object, this.sorter);
		this.parent._dataSource = new dataSources.DataServiceDataSource(getDataSet, processor, this.array);
		return <any>this.parent._dataSource;
	}

	buildClientServerDataSource<TDataType>(getDataSet: dataSources.IDataServiceFunction<TDataType>
										, getFilterModel?: dataSources.IGetFilterModel<TDataType>
										, validateModel?: dataSources.IValidateFilterModel<TDataType>): dataSources.IAsyncDataSource<TDataType> {
		if (isUndefined(this.parent._searchFilter)) {
			this.parent.useSearch();
		}

		let processor: dataSources.IDataSourceProcessorOld = new dataSources.DataSourceProcessorOld(this.object, this.sorter);
		this.parent._dataSource = new dataSources.ClientServerDataSource(getDataSet, this.parent._searchFilter, getFilterModel, validateModel, processor, this.array, this.object);
		return <any>this.parent._dataSource;
	}

	buildServerSideDataSource<TDataType>(getDataSet: dataSources.IServerSearchFunction<TDataType>): dataSources.IAsyncDataSource<TDataType> {
		let processor: dataSources.IDataSourceProcessorOld = new dataSources.DataSourceProcessorOld(this.object, this.sorter);
		this.parent._dataSource = new dataSources.ServerSideDataSource(getDataSet, processor, this.array, this.object);
		return <any>this.parent._dataSource;
	}

	buildSmartDataSource<TDataType>(getDataSet: dataSources.IServerSearchFunction<TDataType>): dataSources.IAsyncDataSource<TDataType> {
		let processor: dataSources.IDataSourceProcessorOld = new dataSources.DataSourceProcessorOld(this.object, this.sorter);
		this.parent._dataSource = new dataSources.SmartDataSource(getDataSet, processor, this.array, this.object);
		return <any>this.parent._dataSource;
	}

	buildCustomDataSource<TDataType>(dataSource: dataSources.IDataSourceOld<TDataType>): dataSources.IDataSourceOld<TDataType>{
		this.parent._dataSource = dataSource;
		return this.parent._dataSource;
	}
}
