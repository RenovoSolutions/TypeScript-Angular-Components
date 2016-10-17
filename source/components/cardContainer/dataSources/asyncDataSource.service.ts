import { Subject, Observable } from 'rxjs';

import { services, filters } from 'typescript-angular-utilities';
import __array = services.array;

import { IDataSourceOld } from './dataSource';
import { DataSourceBase } from './dataSourceBase.service';
import { IDataSourceProcessor } from './dataSourceProcessor.service';

export { IDataSourceOld };

export interface IDataSetFunction<TDataType> {
	(params: any): Promise<TDataType[]> | Observable<TDataType[]>;
}

export interface IAsyncDataSource<TDataType> extends IDataSourceOld<TDataType> {
	reload();
	getDataSet: IDataSetFunction<TDataType>;
	reloaded: Subject<void>;
}

export class AsyncDataSource<TDataType> extends DataSourceBase<TDataType> implements IAsyncDataSource<TDataType> {
	protected synchronizedRequests: Subject<Observable<TDataType[]>> = new Subject<Observable<TDataType[]>>();
	reloaded: Subject<void>;
	getDataSet: IDataSetFunction<TDataType>;

	constructor(getDataSet: IDataSetFunction<TDataType>
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility) {
		super(dataSourceProcessor, array);
		this.getDataSet = getDataSet;
		this.reloaded = new Subject<void>();
		this.synchronizedRequests.switch().subscribe(data => this.resolveReload(data));
	}

	reload(): void {
		this.dataSet = null;
		this.rawDataSet = null;
		this.loadingDataSet = true;

		this.synchronizedRequests.next(Observable.from(this.getDataSet(this.getParams())));
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
