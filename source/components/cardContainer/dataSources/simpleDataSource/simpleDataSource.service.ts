import { services } from 'typescript-angular-utilities';
import __array = services.array;

import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { IDataSourceProcessor } from '../dataSourceProcessor.service';

export { IDataSource };

export class SimpleDataSource<TDataType> extends DataSourceBase<TDataType> {
	constructor(data: TDataType[]
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility) {
		super(dataSourceProcessor, array);
		this.countFilterGroups = false;
		this.rawDataSet = data;
		this.isEmpty = !(data && data.length);
		this.processData();
	}
}
