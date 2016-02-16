'use strict';

import * as angular from 'angular';

import { services, filters } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import __object = services.object;
import __genericSearchFilter = services.genericSearchFilter;
import __synchronizedRequests = services.synchronizedRequests;

import { IAsyncDataSource, AsyncDataSource, IDataSetFunction } from '../asyncDataSource.service';
import { IDataSourceProcessor, processorServiceName } from '../dataSourceProcessor.service';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.serverSideDataSource';
export var factoryName: string = 'serverSideDataSource';

export interface IServerSideDataSource<TDataType> extends IAsyncDataSource<TDataType> {
	filters: { [index: string]: filters.ISerializableFilter };
}

export interface IServerSearchFunction<TDataType> {
	(searchParams: any): angular.IPromise<TDataType[]>;
}

export class ServerSideDataSource<TDataType> extends AsyncDataSource<TDataType> {
	constructor(getDataSet: IServerSearchFunction<TDataType>
			, observableFactory: __observable.IObservableServiceFactory
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility
			, private object: __object.IObjectUtility
			, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory) {
		super(getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory);
	}

	refresh(): void {
		// if filters changed, reload
		// if () {
			// this.reload();
		// } else {
			super.refresh();
		// }
	}
}

export interface IServerSideDataSourceFactory {
	getInstance<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType>;
}

serverSideDataSourceFactory.$inject = [__observable.factoryName, processorServiceName, __array.serviceName, __object.serviceName,  __synchronizedRequests.factoryName];
export function serverSideDataSourceFactory(observableFactory: __observable.IObservableServiceFactory
												, dataSourceProcessor: IDataSourceProcessor
												, array: __array.IArrayUtility
												, object: __object.IObjectUtility
												, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory): IServerSideDataSourceFactory {
	'use strict';
	return {
		getInstance<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType> {
			return new ServerSideDataSource<TDataType>(getDataSet, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory);
		},
	};
}

angular.module(moduleName, [])
	.factory(factoryName, serverSideDataSourceFactory);
