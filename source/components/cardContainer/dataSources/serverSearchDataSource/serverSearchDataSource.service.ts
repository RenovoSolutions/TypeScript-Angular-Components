'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import __object = services.object;
import __genericSearchFilter = services.genericSearchFilter;
import __synchronizedRequests = services.synchronizedRequests;

import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { IDataSourceProcessor, processorServiceName } from '../dataSourceProcessor.service';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.serverSearchDataSource';
export var factoryName: string = 'serverSearchDataSource';

export interface IServerSearchDataSource<TDataType> extends IDataSource<TDataType> {
	reload(): void;
	getDataSet: IDataServiceSearchFunction<TDataType>;
}

export interface IDataServiceSearchFunction<TDataType> {
	(search: string): angular.IPromise<TDataType[]>;
}

export class ServerSearchDataSource<TDataType> extends DataSourceBase<TDataType> {
	private minSearchLength: number = 4;
	private search: string;
	private synchronizedRequests: __synchronizedRequests.ISynchronizedRequestsService;

	constructor(getDataSet: IDataServiceSearchFunction<TDataType>
			, private searchFilter: __genericSearchFilter.IGenericSearchFilter
			, observableFactory: __observable.IObservableServiceFactory
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility
			, private object: __object.IObjectUtility
			, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory) {
		super(observableFactory, dataSourceProcessor, array);
		this.countFilterGroups = true;
		this.search = searchFilter.searchText;
		searchFilter.minSearchLength = this.minSearchLength;
		this.synchronizedRequests = synchronizedRequestsFactory.getInstance(getDataSet, this.resolveReload.bind(this));
	}

	set getDataSet(value: IDataServiceSearchFunction<TDataType>) {
		this.synchronizedRequests.dataProvider = value;
	}

	refresh(): void {
		if (this.searchFilter.searchText !== this.search) {
			this.reload();
		} else {
			super.refresh();
		}
	}

	reload(): void {
		this.search = this.searchFilter.searchText;

		if (this.object.isNullOrEmpty(this.searchFilter.searchText)
			|| this.searchFilter.searchText.length < this.minSearchLength) {
			this.resolveReload(null);
			return;
		}

		this.dataSet = null;
		this.rawDataSet = null;
		this.loadingDataSet = true;

		this.synchronizedRequests.getData(this.search);
	}

	private resolveReload: { (data: TDataType[]): void } = (data: TDataType[]): void => {
		this.loadingDataSet = false;
		this.rawDataSet = data;

		this.refresh();
		this.observable.fire('reloaded');
		this.observable.fire('changed');
	}
}

export interface IServerSearchDataSourceFactory {
	getInstance<TDataType>(getDataSet: {(search: string): angular.IPromise<TDataType>}
						, searchFilter: __genericSearchFilter.IGenericSearchFilter): IDataSource<TDataType>;
}

serverSearchDataSourceFactory.$inject = [__observable.factoryName, processorServiceName, __array.serviceName, __object.serviceName, __synchronizedRequests.factoryName];
export function serverSearchDataSourceFactory(observableFactory: __observable.IObservableServiceFactory
												, dataSourceProcessor: IDataSourceProcessor
												, array: __array.IArrayUtility
												, object: __object.IObjectUtility
												, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory): IServerSearchDataSourceFactory {
	'use strict';
	return {
		getInstance<TDataType>(getDataSet: IDataServiceSearchFunction<TDataType>
							, searchFilter: __genericSearchFilter.IGenericSearchFilter): IDataSource<TDataType> {
			return new ServerSearchDataSource<TDataType>(getDataSet, searchFilter, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory);
		},
	};
}

angular.module(moduleName, [__observable.moduleName, __array.moduleName, __object.moduleName, __synchronizedRequests.moduleName])
	.factory(factoryName, serverSearchDataSourceFactory);
