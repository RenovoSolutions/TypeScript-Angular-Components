import { filters } from 'typescript-angular-utilities';
export declare let factoryName: string;
export interface ISelectFilterSettings<TDataType, TFilterType> {
    valueSelector: string | {
        (item: TDataType): any;
    };
    comparer: IEqualityFunction<TFilterType>;
    options: any[];
    getOptions?: {
        (): angular.IPromise<any[]>;
    };
    label: string;
    displayNameSelector: string | {
        (item: any): string;
    };
    nullOption: string;
}
export interface ISelectFilter<T> extends filters.IFilter {
    selectedValue: any;
}
export interface IEqualityFunction<TFilterType> {
    (item1: TFilterType, item2: TFilterType): boolean;
}
export interface ISelectFilterFactory {
    getInstance<TDataType, TFilterType>(settings: ISelectFilterSettings<TDataType, TFilterType>): ISelectFilter<TDataType>;
}
export declare function selectFilterFactory(): ISelectFilterFactory;
