'use strict';

import * as angular from 'angular';

import { services, filters } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import __object = services.object;
import __genericSearchFilter = services.genericSearchFilter;
import __synchronizedRequests = services.synchronizedRequests;

import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { IDataSourceProcessor, processorServiceName } from '../dataSourceProcessor.service';
import * as events from '../dataSourceEvents';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.serverSideDataSource';
export var factoryName: string = 'serverSideDataSource';

export interface IServerSideDataSource<TDataType> extends IDataSource<TDataType> {
	reload(): void;
	getDataSet: IServerSearchFunction<TDataType>;
	filters: { [index: string]: filters.ISerializableFilter };
}

export interface IServerSearchFunction<TDataType> {
	(searchParams: any): angular.IPromise<TDataType[]>;
}

export class ServerSideDataSource<TDataType> extends DataSourceBase<TDataType> {
	private synchronizedRequests: __synchronizedRequests.ISynchronizedRequestsService;

	constructor(getDataSet: IServerSearchFunction<TDataType>
			, observableFactory: __observable.IObservableServiceFactory
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility
			, private object: __object.IObjectUtility
			, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory) {
		super(observableFactory, dataSourceProcessor, array);

		this.synchronizedRequests = synchronizedRequestsFactory.getInstance(getDataSet, this.resolveReload.bind(this));
	}

	set getDataSet(value: IServerSearchFunction<TDataType>) {
		this.synchronizedRequests.dataProvider = value;
	}

	refresh(): void {
		// if filters changed, reload
		// if () {
			// this.reload();
		// } else {
			super.refresh();
		// }
	}

	reload(): void {
		this.dataSet = null;
		this.rawDataSet = null;
		this.loadingDataSet = true;

		this.synchronizedRequests.getData();
	}

	private resolveReload: { (data: TDataType[]): void } = (data: TDataType[]): void => {
		this.loadingDataSet = false;
		this.rawDataSet = data;

		this.refresh();
		this.observable.fire(events.async.reloaded);
		this.observable.fire(events.changed);
	}
}

export interface IServerSideDataSourceFactory {
	getInstance<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IDataSource<TDataType>;
}

serverSideDataSourceFactory.$inject = [__observable.factoryName, processorServiceName, __array.serviceName, __object.serviceName,  __synchronizedRequests.factoryName];
export function serverSideDataSourceFactory(observableFactory: __observable.IObservableServiceFactory
												, dataSourceProcessor: IDataSourceProcessor
												, array: __array.IArrayUtility
												, object: __object.IObjectUtility
												, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory): IServerSideDataSourceFactory {
	'use strict';
	return {
		getInstance<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IDataSource<TDataType> {
			return new ServerSideDataSource<TDataType>(getDataSet, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory);
		},
	};
}

angular.module(moduleName, [])
	.factory(factoryName, serverSideDataSourceFactory);
