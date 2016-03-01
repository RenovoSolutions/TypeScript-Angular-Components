import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export declare var defaultSearchPlaceholder: string;
export declare var defaultSearchDelay: number;
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
    private cardContainer;
    private searchFilter;
    static $inject: string[];
    constructor($scope: angular.IScope, $timeout: angular.ITimeoutService);
    $onInit(): void;
    private validateSearchLength(search, minLength);
}
export declare function cardSearch(): angular.IDirective;
