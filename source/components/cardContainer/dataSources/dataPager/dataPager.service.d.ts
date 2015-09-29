export declare var moduleName: string;
export declare var factoryName: string;
export declare var defaultPageSize: number;
export interface IDataPager {
    pageNumber: number;
    pageSize: number;
    filter<T>(dataSet: T[]): T[];
}
export declare class DataPager implements IDataPager {
    pageNumber: number;
    pageSize: number;
    filter(dataSet: any[]): any[];
}
export interface IDataPagerFactory {
    getInstance(): IDataPager;
}
export declare function dataPagerFactory(): IDataPagerFactory;
