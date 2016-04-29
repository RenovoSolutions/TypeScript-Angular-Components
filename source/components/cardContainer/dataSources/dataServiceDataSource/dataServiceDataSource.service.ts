'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __array = services.array;
import __synchronizedRequests = services.synchronizedRequests;

import { IAsyncDataSource, AsyncDataSource, IDataSetFunction } from '../asyncDataSource.service';
import { IDataSourceProcessor, processorServiceName } from '../dataSourceProcessor.service';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.dataServiceDataSource';
export var factoryName: string = 'dataServiceDataSource';

export { IAsyncDataSource };

export interface IDataServiceFunction<TDataType> {
	(): angular.IPromise<TDataType[]>;
}

export class DataServiceDataSource<TDataType> extends AsyncDataSource<TDataType> implements IAsyncDataSource<TDataType> {
	constructor(getDataSet: IDataServiceFunction<TDataType>
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility
			, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory) {
		super(getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory);
		this.countFilterGroups = true;

		if (_.isFunction(getDataSet)) {
			this.reload();
		}
	}
}

export interface IDataServiceDataSourceFactory {
	getInstance<TDataType>(getDataSet: IDataServiceFunction<TDataType>): IAsyncDataSource<TDataType>;
}

dataServiceDataSourceFactory.$inject = [processorServiceName, __array.serviceName, __synchronizedRequests.factoryName];
export function dataServiceDataSourceFactory(dataSourceProcessor: IDataSourceProcessor
										, array: __array.IArrayUtility
										, synchronizedRequests: __synchronizedRequests.ISynchronizedRequestsFactory): IDataServiceDataSourceFactory {
	'use strict';
	return {
		getInstance<TDataType>(getDataSet: IDataServiceFunction<TDataType>): IAsyncDataSource<TDataType> {
			return new DataServiceDataSource<TDataType>(<any>getDataSet, dataSourceProcessor, array, synchronizedRequests);
		},
	};
}

angular.module(moduleName, [__array.moduleName])
	.factory(factoryName, dataServiceDataSourceFactory);
