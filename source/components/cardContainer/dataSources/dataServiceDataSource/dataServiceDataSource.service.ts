import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __array = services.array;
import __synchronizedRequests = services.synchronizedRequests;

import { IAsyncDataSource, AsyncDataSource, IDataSetFunction } from '../asyncDataSource.service';
import { IDataSourceProcessor, processorServiceName } from '../dataSourceProcessor.service';

export { IAsyncDataSource };

export interface IDataServiceFunction<TDataType> {
	(): Promise<TDataType[]>;
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
