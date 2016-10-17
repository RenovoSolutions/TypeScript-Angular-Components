import { DataSourceBase } from '../dataSourceBase.service';
import { Sorter } from '../../sorts/index';

export { IDataSource } from '../dataSource';

export class SimpleDataSource<TDataType> extends DataSourceBase<TDataType> {
	constructor(data: TDataType[]
			, sorter: Sorter) {
		super(sorter);
		this.countFilterGroups = false;
		this._rawDataSet.next(data);
	}

	init(): void {
		this.processData();
	}
}
