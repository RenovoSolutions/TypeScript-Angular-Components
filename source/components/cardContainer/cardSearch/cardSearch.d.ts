import * as angular from 'angular';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export declare let defaultSearchPlaceholder: string;
export declare let defaultSearchDelay: number;
export interface ICardSearchBindings {
    delay: number;
}
export declare class CardSearchController {
    private $timeout;
    delay: number;
    searchPlaceholder: string;
    searchLengthError: boolean;
    minSearchLength: number;
    hasSearchFilter: boolean;
    minSearchError: string;
    private _searchText;
    private cardContainer;
    private searchFilter;
    private timer;
    searchText: string;
    static $inject: string[];
    constructor($timeout: angular.ITimeoutService);
    $onInit(): void;
    private validateSearchLength(search, minLength);
}
