import * as angular from 'angular';
import { Subject } from 'rxjs';
import { services } from 'typescript-angular-utilities';
import __array = services.array;
import __synchronizedRequests = services.synchronizedRequests;
import { IDataSource } from './dataSource';
import { DataSourceBase } from './dataSourceBase.service';
import { IDataSourceProcessor } from './dataSourceProcessor.service';
export interface IDataSetFunction<TDataType> {
    (params: any): angular.IPromise<TDataType[]>;
}
export interface IAsyncDataSource<TDataType> extends IDataSource<TDataType> {
    reload(): any;
    getDataSet: IDataSetFunction<TDataType>;
    reloaded: Subject<void>;
}
export declare class AsyncDataSource<TDataType> extends DataSourceBase<TDataType> implements IAsyncDataSource<TDataType> {
    protected synchronizedRequests: __synchronizedRequests.ISynchronizedRequestsService;
    reloaded: Subject<void>;
    constructor(getDataSet: IDataSetFunction<TDataType>, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory);
    getDataSet: IDataSetFunction<TDataType>;
    reload(): void;
    protected resolveReload(data: TDataType[]): void;
    protected getParams(): any;
}
