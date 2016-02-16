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
export interface IClientServerDataSource<TDataType> extends IDataSource<TDataType> {
    reload(): void;
    getDataSet: IDataServiceSearchFunction<TDataType>;
    getFilterModel: IGetFilterModel<any>;
    validateModel: IValidateFilterModel<any>;
}
export interface IDataServiceSearchFunction<TDataType> {
    (search: string | any): angular.IPromise<TDataType[]>;
}
export interface IGetFilterModel<TFilterModelType> {
    (): TFilterModelType;
}
export interface IValidateFilterModel<TFilterModelType> {
    (filterModel: TFilterModelType): boolean;
}
export declare class ClientServerDataSource<TDataType> extends DataSourceBase<TDataType> {
    private searchFilter;
    getFilterModel: IGetFilterModel<any>;
    validateModel: IValidateFilterModel<any>;
    private object;
    private minSearchLength;
    private search;
    private filterModel;
    private synchronizedRequests;
    constructor(getDataSet: IDataServiceSearchFunction<TDataType>, searchFilter: __genericSearchFilter.IGenericSearchFilter, getFilterModel: IGetFilterModel<any>, validateModel: IValidateFilterModel<any>, observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, object: __object.IObjectUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory);
    getDataSet: IDataServiceSearchFunction<TDataType>;
    refresh(): void;
    reload(): void;
    private resolveReload;
    private filterModelChanged();
    private buildSearchParams();
}
export interface IClientServerDataSourceFactory {
    getInstance<TDataType>(getDataSet: IDataServiceSearchFunction<TDataType>, searchFilter: __genericSearchFilter.IGenericSearchFilter, getFilterModel?: IGetFilterModel<any>, validateModel?: IValidateFilterModel<any>): IDataSource<TDataType>;
}
export declare function clientServerDataSourceFactory(observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, object: __object.IObjectUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory): IClientServerDataSourceFactory;
