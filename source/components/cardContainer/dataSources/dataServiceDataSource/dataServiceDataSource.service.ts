import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import __array = services.array;

import { IAsyncDataSource, AsyncDataSource, IDataSetFunction } from '../asyncDataSource.service';
import { IDataSourceProcessor } from '../dataSourceProcessor.service';

export { IAsyncDataSource };

export interface IDataServiceFunction<TDataType> {
	(): Promise<TDataType[]> | Observable<TDataType[]>;
}

export class DataServiceDataSource<TDataType> extends AsyncDataSource<TDataType> implements IAsyncDataSource<TDataType> {
	constructor(getDataSet: IDataServiceFunction<TDataType>
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility) {
		super(getDataSet, dataSourceProcessor, array);
		this.countFilterGroups = true;

		if (_.isFunction(getDataSet)) {
			this.reload();
		}
	}
}
