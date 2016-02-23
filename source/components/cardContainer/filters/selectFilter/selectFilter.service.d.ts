import { filters } from 'typescript-angular-utilities';
export declare let factoryName: string;
export interface ISelectFilter<T> extends filters.IFilter {
    selectedValue: any;
}
export interface IEqualityFunction<TFilterType> {
    (item1: TFilterType, item2: TFilterType): boolean;
}
export interface ISelectFilterFactory {
    getInstance<T>(valueSelector: string | {
        (item: T): any;
    }, comparer?: IEqualityFunction<T>): ISelectFilter<T>;
}
export declare function selectFilterFactory(): ISelectFilterFactory;
