import * as angular from 'angular';
import { services, filters } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import __object = services.object;
import __synchronizedRequests = services.synchronizedRequests;
import { IAsyncDataSource, AsyncDataSource } from '../asyncDataSource.service';
import { IDataSourceProcessor } from '../dataSourceProcessor.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IServerSideDataSource<TDataType> extends IAsyncDataSource<TDataType> {
    filters: filters.ISerializableFilter<any>[];
}
export interface IServerSearchFunction<TDataType> {
    (searchParams: IServerSearchParams): angular.IPromise<IDataResult<TDataType>>;
}
export interface IServerSearchParams {
    filters: {
        [index: string]: any;
    };
    sorts: ISortParams[];
    paging: IPagingParams;
}
export interface ISortParams {
    column: string;
    direction: string;
}
export interface IPagingParams {
    pageNumber: number;
    pageSize: number;
}
export interface IDataResult<TDataType> {
    dataSet: TDataType[];
    count: number;
}
export declare class ServerSideDataSource<TDataType> extends AsyncDataSource<TDataType> {
    private object;
    constructor(getDataSet: IServerSearchFunction<TDataType>, observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, object: __object.IObjectUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory);
    refresh(): void;
    protected getParams(): IServerSearchParams;
    protected resolveReload(result: any): void;
}
export interface IServerSideDataSourceFactory {
    getInstance<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType>;
}
export declare function serverSideDataSourceFactory(observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, object: __object.IObjectUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory): IServerSideDataSourceFactory;
