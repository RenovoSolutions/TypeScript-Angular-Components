import { ISort } from '../sort';
import { IMergeSort } from '../mergeSort/mergeSort.service';
export declare var moduleName: string;
export declare var serviceName: string;
export interface ISorter {
    sort<TDataType>(data: TDataType[], sort: ISort | ISort[]): TDataType[];
}
export declare class Sorter implements ISorter {
    private mergeSort;
    static $inject: string[];
    constructor(mergeSort: IMergeSort);
    sort<TDataType>(data: TDataType[], sort: ISort | ISort[]): TDataType[];
    private singleSort<TDataType>(data, sort);
    private buildSortFunction<TDataType>(sort);
}
