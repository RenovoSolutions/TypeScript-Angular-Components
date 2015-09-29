import { ICompareFunction } from '../sort';
export declare var moduleName: string;
export declare var serviceName: string;
export interface IMergeSort {
    sort<TDataType>(data: TDataType[], compare?: ICompareFunction<TDataType>): TDataType[];
}
export declare class MergeSort implements IMergeSort {
    sort<TDataType>(data: TDataType[], compare?: ICompareFunction<TDataType>): TDataType[];
    private defaultCompare<TDataType>(a, b);
    private merge<TDataType>(left, right, compare);
}
