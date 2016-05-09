import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __array = services.array;
import __object = services.object;
import __genericSearchFilter = services.genericSearchFilter;
import __synchronizedRequests = services.synchronizedRequests;
import { IAsyncDataSource, AsyncDataSource } from '../asyncDataSource.service';
import { IDataSourceProcessor } from '../dataSourceProcessor.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IClientServerDataSource<TDataType> extends IAsyncDataSource<TDataType> {
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
export declare class ClientServerDataSource<TDataType> extends AsyncDataSource<TDataType> {
    private searchFilter;
    getFilterModel: IGetFilterModel<any>;
    validateModel: IValidateFilterModel<any>;
    private object;
    private minSearchLength;
    private search;
    private filterModel;
    constructor(getDataSet: IDataServiceSearchFunction<TDataType>, searchFilter: __genericSearchFilter.IGenericSearchFilter, getFilterModel: IGetFilterModel<any>, validateModel: IValidateFilterModel<any>, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, object: __object.IObjectUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory);
    refresh(): void;
    reload(): void;
    private filterModelChanged();
    protected getParams(): any;
}
export interface IClientServerDataSourceFactory {
    getInstance<TDataType>(getDataSet: IDataServiceSearchFunction<TDataType>, searchFilter: __genericSearchFilter.IGenericSearchFilter, getFilterModel?: IGetFilterModel<any>, validateModel?: IValidateFilterModel<any>): IAsyncDataSource<TDataType>;
}
export declare function clientServerDataSourceFactory(dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, object: __object.IObjectUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory): IClientServerDataSourceFactory;
