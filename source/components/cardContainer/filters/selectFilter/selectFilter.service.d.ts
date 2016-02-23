import { filters } from 'typescript-angular-utilities';
export declare let factoryName: string;
export interface ISelectFilter<T> extends filters.IFilter {
    selectedValue: any;
}
export interface IEqualityFunction<TFilterType> {
    (item1: TFilterType, item2: TFilterType): boolean;
}
export interface ISelectFilterFactory {
    getInstance<TDataType, TFilterType>(valueSelector: string | {
        (item: TDataType): any;
    }, comparer?: IEqualityFunction<TFilterType>): ISelectFilter<TDataType>;
}
export declare function selectFilterFactory(): ISelectFilterFactory;
