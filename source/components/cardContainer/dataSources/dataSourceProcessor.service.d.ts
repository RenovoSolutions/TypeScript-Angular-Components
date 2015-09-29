import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import { ISort } from '../sorts/sort';
import { IDataPager } from './dataPager/dataPager.service';
import { ISorter } from '../sorts/sorter/sorter.service';
export declare var processorServiceName: string;
export interface IProcessResult<TDataType> {
    count: number;
    filteredDataSet: TDataType[];
    dataSet: TDataType[];
}
export interface IWrappedItem<TItemType> {
    data: TItemType;
    filterData: any;
}
export interface IDataSourceProcessor {
    process<TDataType>(sorts: ISort[], filters: {
        [index: string]: filters.IFilter;
    }, pager: IDataPager, data: TDataType[]): IProcessResult<TDataType>;
    processAndCount<TDataType>(sorts: ISort[], filters: {
        [index: string]: filters.IFilterWithCounts;
    }, pager: IDataPager, data: TDataType[]): IProcessResult<TDataType>;
}
export declare class DataSourceProcessor implements IDataSourceProcessor {
    private object;
    private sorter;
    static $inject: string[];
    constructor(object: __object.IObjectUtility, sorter: ISorter);
    process<TDataType>(sorts: ISort[], filters: {
        [index: string]: filters.IFilter;
    }, pager: IDataPager, data: TDataType[]): IProcessResult<TDataType>;
    processAndCount<TDataType>(sorts: ISort[], filters: {
        [index: string]: filters.IFilterWithCounts;
    }, pager: IDataPager, data: TDataType[]): IProcessResult<TDataType>;
    private wrapData<TDataType>(data);
    private unwrapData<TDataType>(data);
}
