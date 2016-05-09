import { services } from 'typescript-angular-utilities';
import __array = services.array;
import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { IDataSourceProcessor } from '../dataSourceProcessor.service';
export declare var moduleName: string;
export declare var factoryName: string;
export declare class SimpleDataSource<TDataType> extends DataSourceBase<TDataType> {
    constructor(data: TDataType[], dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility);
}
export interface ISimpleDataSourceFactory {
    getInstance<TDataType>(data: TDataType[]): IDataSource<TDataType>;
}
export declare function simpleDataSourceFactory(dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility): ISimpleDataSourceFactory;
