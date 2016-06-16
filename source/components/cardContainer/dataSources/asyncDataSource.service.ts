import { Subject } from 'rxjs';

import { services, filters } from 'typescript-angular-utilities';
import __array = services.array;
import __synchronizedRequests = services.synchronizedRequests;

import { IDataSource } from './dataSource';
import { DataSourceBase } from './dataSourceBase.service';
import { IDataSourceProcessor } from './dataSourceProcessor.service';

export { IDataSource };

export interface IDataSetFunction<TDataType> {
	(params: any): Promise<TDataType[]>;
}

export interface IAsyncDataSource<TDataType> extends IDataSource<TDataType> {
	reload();
	getDataSet: IDataSetFunction<TDataType>;
	reloaded: Subject<void>;
}

export class AsyncDataSource<TDataType> extends DataSourceBase<TDataType> implements IAsyncDataSource<TDataType> {
	protected synchronizedRequests: __synchronizedRequests.ISynchronizedRequestsService;
	reloaded: Subject<void>;

	constructor(getDataSet: IDataSetFunction<TDataType>
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility
			, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory) {
		super(dataSourceProcessor, array);
		this.synchronizedRequests = synchronizedRequestsFactory.getInstance(getDataSet, this.resolveReload.bind(this));
		this.reloaded = new Subject<void>();
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
		this.reloaded.next(null);
		this.redrawing.next(null);
		this.changed.next(null);
	}

	// override with params for getDataSet
	protected getParams(): any {
		return null;
	}
}
