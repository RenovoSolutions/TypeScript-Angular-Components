import { filters } from 'typescript-angular-utilities';
export declare let factoryName: string;
export interface ISelectFilter<T> extends filters.IFilter {
    selectedValue: any;
}
export interface ISelectFilterFactory {
    getInstance<T>(valueSelector: string | {
        (item: T): any;
    }): ISelectFilter<T>;
}
export declare function selectFilterFactory(): ISelectFilterFactory;
