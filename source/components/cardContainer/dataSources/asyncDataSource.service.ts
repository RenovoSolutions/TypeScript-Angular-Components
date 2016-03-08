'use strict';

import * as angular from 'angular';

import { services, filters } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import __synchronizedRequests = services.synchronizedRequests;

import { IDataSource } from './dataSource';
import { DataSourceBase } from './dataSourceBase.service';
import { IDataSourceProcessor } from './dataSourceProcessor.service';
import * as events from './dataSourceEvents';

export interface IDataSetFunction<TDataType> {
	(params: any): angular.IPromise<TDataType[]>;
}

export interface IAsyncDataSource<TDataType> extends IDataSource<TDataType> {
	reload();
	getDataSet: IDataSetFunction<TDataType>;
}

export class AsyncDataSource<TDataType> extends DataSourceBase<TDataType> implements IAsyncDataSource<TDataType> {
	protected synchronizedRequests: __synchronizedRequests.ISynchronizedRequestsService;

	constructor(getDataSet: IDataSetFunction<TDataType>
			, observableFactory: __observable.IObservableServiceFactory
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility
			, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory) {
		super(observableFactory, dataSourceProcessor, array);
		this.observable.allowableEvents = events.async.all;
		this.synchronizedRequests = synchronizedRequestsFactory.getInstance(getDataSet, this.resolveReload.bind(this));
	}

	set getDataSet(value: IDataSetFunction<TDataType>) {
		this.synchronizedRequests.dataProvider = value;
	}

	reload(): void {
		this.dataSet = null;
		this.rawDataSet = null;
		this.loadingDataSet = true;

		this.synchronizedRequests.getData(this.getParams());
	}

	protected resolveReload(data: TDataType[]): void {
		this.loadingDataSet = false;
		this.rawDataSet = data;

		this.processData();
		this.observable.fire(events.async.reloaded);
		this.observable.fire(events.redrawing);
		this.observable.fire(events.changed);
	}

	// override with params for getDataSet
	protected getParams(): any {
		return null;
	}
}
