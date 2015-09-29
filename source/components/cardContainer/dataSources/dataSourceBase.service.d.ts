import { services, filters } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import { IDataSource } from './dataSource';
import { IDataSourceProcessor } from './dataSourceProcessor.service';
import { ISort } from '../sorts/sort';
import { IDataPager } from './dataPager/dataPager.service';
export declare class DataSourceBase<TDataType> implements IDataSource<TDataType> {
    private dataSourceProcessor;
    private array;
    dataSet: TDataType[];
    filteredDataSet: TDataType[];
    rawDataSet: TDataType[];
    sorts: ISort[];
    filters: {
        [index: string]: filters.IFilter;
    };
    pager: IDataPager;
    count: number;
    countFilterGroups: boolean;
    loadingDataSet: boolean;
    observable: __observable.IObservableService;
    constructor(observableFactory: __observable.IObservableServiceFactory, dataSourceProcessor: IDataSourceProcessor, array: __array.IArrayUtility);
    watch<TReturnType>(action: __observable.IAction<TReturnType>, event?: string): __observable.IUnregisterFunction;
    processData(): void;
    refresh: {
        (): void;
    };
    remove(data: TDataType): void;
    push(data: TDataType): void;
    replace(oldData: TDataType, newData: TDataType): void;
}
