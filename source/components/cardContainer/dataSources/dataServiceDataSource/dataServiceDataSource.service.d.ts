import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { IDataSourceProcessor } from '../dataSourceProcessor.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IDataServiceDataSource<TDataType> extends IDataSource<TDataType> {
    reload(): void;
    getDataSet: IDataServiceFunction<TDataType>;
}
export interface IDataServiceFunction<TDataType> {
    (): angular.IPromise<TDataType[]>;
}
export declare class DataServiceDataSource<TDataType> extends DataSourceBase<TDataType> implements IDataServiceDataSource<TDataType> {
    getDataSet: IDataServiceFunction<TDataType>;
    private $q;
    constructor(getDataSet: IDataServiceFunction<TDataType>, $q: angular.IQService, observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility);
    reload(): void;
}
export interface IDataServiceDataSourceFactory {
    getInstance<TDataType>(getDataSet: IDataServiceFunction<TDataType>): IDataServiceDataSource<TDataType>;
}
export declare function dataServiceDataSourceFactory(observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility, $q: angular.IQService): IDataServiceDataSourceFactory;
