import { filters, services } from 'typescript-angular-utilities';
import __date = services.date;
export declare let factoryName: string;
export interface IDateFilterSettings {
    type: string;
    valueSelector: {
        (item: any): moment.Moment;
    } | string;
    clearButton?: boolean;
    includeDateRange?: boolean;
    includeTime?: boolean;
    label?: string;
}
export interface IDateFilter extends filters.IFilter {
    selectedDate1: moment.Moment;
    selectedDate2: moment.Moment;
    includeTime: boolean;
    type: string;
    dateRange: boolean;
    filter(item: any): boolean;
}
export interface IDateFilterFactory {
    getInstance(settings: IDateFilterSettings): IDateFilter;
}
export declare function dateFilterFactory(dateUtility: __date.IDateUtility): IDateFilterFactory;
