import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import __string = services.string;
import { IColumn } from '../../column';
export declare var moduleName: string;
export declare var factoryName: string;
export declare var filterName: string;
export interface IColumnSearchFilter extends filters.IFilter {
    searchText: string;
    caseSensitive: boolean;
    column: IColumn<any>;
}
export declare class ColumnSearchFilter implements IColumnSearchFilter {
    private object;
    private string;
    type: string;
    searchText: string;
    caseSensitive: boolean;
    column: IColumn<any>;
    constructor(object: __object.IObjectUtility, string: __string.IStringUtility);
    filter<TItemType>(item: TItemType): boolean;
}
export interface IColumnSearchFilterFactory {
    getInstance(): IColumnSearchFilter;
}
export declare function columnSearchFilterFactory(object: __object.IObjectUtility, string: __string.IStringUtility): IColumnSearchFilterFactory;
