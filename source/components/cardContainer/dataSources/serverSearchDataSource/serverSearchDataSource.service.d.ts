import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import __object = services.object;
import __genericSearchFilter = services.genericSearchFilter;
import __synchronizedRequests = services.synchronizedRequests;
import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { IDataSourceProcessor } from '../dataSourceProcessor.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IServerSearchDataSource<TDataType> extends IDataSource<TDataType> {
    reload(): void;
    getDataSet: IDataServiceSearchFunction<TDataType>;
}
export interface IDataServiceSearchFunction<TDataType> {
    (search: string): angular.IPromise<TDataType[]>;
}
export declare class ServerSearchDataSource<TDataType> extends DataSourceBase<TDataType> {
    private searchFilter;
    private object;
    private minSearchLength;
    private search;
    private synchronizedRequests;
    constructor(getDataSet: IDataServiceSearchFunction<TDataType>, searchFilter: __genericSearchFilter.IGenericSearchFilter, observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, object: __object.IObjectUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory);
    getDataSet: IDataServiceSearchFunction<TDataType>;
    refresh(): void;
    reload(): void;
    private resolveReload;
}
export interface IServerSearchDataSourceFactory {
    getInstance<TDataType>(getDataSet: {
        (search: string): angular.IPromise<TDataType>;
    }, searchFilter: __genericSearchFilter.IGenericSearchFilter): IDataSource<TDataType>;
}
export declare function serverSearchDataSourceFactory(observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, object: __object.IObjectUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory): IServerSearchDataSourceFactory;
