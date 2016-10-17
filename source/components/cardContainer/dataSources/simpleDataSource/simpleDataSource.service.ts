import { services } from 'typescript-angular-utilities';
import __array = services.array;

import { IDataSourceOld } from '../dataSource';
import { DataSourceBaseOld } from '../dataSourceBaseOld.service';
import { IDataSourceProcessorOld } from '../processor/dataSourceProcessorOld.service';

export { IDataSourceOld };

export class SimpleDataSource<TDataType> extends DataSourceBaseOld<TDataType> {
	constructor(data: TDataType[]
			, dataSourceProcessor: IDataSourceProcessorOld
			, array: __array.IArrayUtility) {
		super(dataSourceProcessor, array);
		this.countFilterGroups = false;
		this.rawDataSet = data;
		this.processData();
	}
}
