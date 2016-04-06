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
    private $scope;
    private $timeout;
    delay: number;
    searchPlaceholder: string;
    searchText: string;
    searchLengthError: boolean;
    minSearchLength: number;
    hasSearchFilter: boolean;
    minSearchError: string;
    private cardContainer;
    private searchFilter;
    static $inject: string[];
    constructor($scope: angular.IScope, $timeout: angular.ITimeoutService);
    $onInit(): void;
    private validateSearchLength(search, minLength);
}
