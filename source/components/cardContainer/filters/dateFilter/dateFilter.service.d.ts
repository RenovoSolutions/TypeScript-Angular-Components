import { filters, services } from 'typescript-angular-utilities';
import __date = services.date;
export declare let factoryName: string;
export interface IDateFilterSettings {
    type: string;
    valueSelector: string;
}
export interface IDateFilter extends filters.IFilter {
    selectedDate1: Date;
    selectedDate2: Date;
    includeTime: boolean;
    type: string;
    dateRange: boolean;
    filter(item: any): boolean;
}
export interface IDateFilterFactory {
    getInstance(settings: IDateFilterSettings): IDateFilter;
}
export declare function dateFilterFactory(dateUtility: __date.IDateUtility): IDateFilterFactory;
