import * as angular from 'angular';
import { services, filters } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import __object = services.object;
import __synchronizedRequests = services.synchronizedRequests;
import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { IDataSourceProcessor } from '../dataSourceProcessor.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IServerSideDataSource<TDataType> extends IDataSource<TDataType> {
    reload(): void;
    getDataSet: IServerSearchFunction<TDataType>;
    filters: {
        [index: string]: filters.ISerializableFilter;
    };
}
export interface IServerSearchFunction<TDataType> {
    (searchParams: any): angular.IPromise<TDataType[]>;
}
export declare class ServerSideDataSource<TDataType> extends DataSourceBase<TDataType> {
    private object;
    private synchronizedRequests;
    constructor(getDataSet: IServerSearchFunction<TDataType>, observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, object: __object.IObjectUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory);
    getDataSet: IServerSearchFunction<TDataType>;
    refresh(): void;
    reload(): void;
    private resolveReload;
}
export interface IServerSideDataSourceFactory {
    getInstance<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IDataSource<TDataType>;
}
export declare function serverSideDataSourceFactory(observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, object: __object.IObjectUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory): IServerSideDataSourceFactory;
