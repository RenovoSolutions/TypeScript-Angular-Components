export declare let moduleName: string;
export declare let filterName: string;
export interface IDateFilter {
    (date?: moment.Moment, includeTime?: boolean): string;
}
