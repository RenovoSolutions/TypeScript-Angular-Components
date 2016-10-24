import { Observable } from 'rxjs';

import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { Sorter } from '../../sorts/index';

export { IDataSource };

export class ObservableDataSource<TDataType> extends DataSourceBase<TDataType> implements IDataSource<TDataType> {
	private dataStream$: Observable<TDataType[]>;

	constructor(dataSet$: Observable<TDataType[]>
			, sorter: Sorter) {
		super(sorter);
		this.countFilterGroups = true;
		this.dataStream$ = dataSet$;
	}

	init(): void {
		this._dataSet.next(null);
		this._rawDataSet.next(null);
		this._loadingDataSet.next(true);

		this.dataStream$.subscribe(data => {
			this._rawDataSet.next(data);
			this._loadingDataSet.next(!data);
			this.processData();
		});
	}
}
