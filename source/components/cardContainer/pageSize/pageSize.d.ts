import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export declare var availablePageSizes: number[];
export declare var defaultPageSize: number;
export declare class PageSizeController {
    private $scope;
    selectedPageSize: number;
    pageSizes: number[];
    hasPageFilter: boolean;
    private cardContainer;
    static $inject: string[];
    constructor($scope: angular.IScope);
    $onInit(): void;
}
export declare function pageSize(): angular.IDirective;
