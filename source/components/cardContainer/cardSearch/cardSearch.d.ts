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
    delay: number;
    searchPlaceholder: string;
    searchText: string;
    hasSearchFilter: boolean;
    private cardContainerController;
    private searchFilter;
    static $inject: string[];
    constructor($scope: angular.IScope, $timeout: angular.ITimeoutService, $element: angular.IAugmentedJQuery);
}
export declare function cardSearch(): angular.IDirective;
