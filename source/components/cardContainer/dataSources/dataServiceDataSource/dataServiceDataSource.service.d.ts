import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __array = services.array;
import __synchronizedRequests = services.synchronizedRequests;
import { IAsyncDataSource, AsyncDataSource } from '../asyncDataSource.service';
import { IDataSourceProcessor } from '../dataSourceProcessor.service';
export declare var moduleName: string;
export declare var factoryName: string;
export { IAsyncDataSource };
export interface IDataServiceFunction<TDataType> {
    (): angular.IPromise<TDataType[]>;
}
export declare class DataServiceDataSource<TDataType> extends AsyncDataSource<TDataType> implements IAsyncDataSource<TDataType> {
    constructor(getDataSet: IDataServiceFunction<TDataType>, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory);
}
export interface IDataServiceDataSourceFactory {
    getInstance<TDataType>(getDataSet: IDataServiceFunction<TDataType>): IAsyncDataSource<TDataType>;
}
export declare function dataServiceDataSourceFactory(dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, synchronizedRequests: __synchronizedRequests.ISynchronizedRequestsFactory): IDataServiceDataSourceFactory;
