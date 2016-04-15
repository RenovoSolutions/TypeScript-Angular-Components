import * as Rx from 'rx';
export declare var moduleName: string;
export declare var factoryName: string;
export declare var defaultPageSize: number;
export interface IDataPager {
    pageNumber: number;
    pageSize: number;
    pageNumberObservable: Rx.Subject<number>;
    pageSizeObservable: Rx.Subject<number>;
    startItem: number;
    filter<T>(dataSet: T[]): T[];
}
export declare class DataPager implements IDataPager {
    private _pageNumber;
    private _pageSize;
    pageNumberObservable: Rx.Subject<number>;
    pageSizeObservable: Rx.Subject<number>;
    constructor();
    pageNumber: number;
    pageSize: number;
    startItem: number;
    filter(dataSet: any[]): any[];
}
export interface IDataPagerFactory {
    getInstance(): IDataPager;
}
export declare function dataPagerFactory(): IDataPagerFactory;
