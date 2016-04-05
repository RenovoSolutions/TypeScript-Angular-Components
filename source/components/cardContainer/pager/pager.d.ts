import * as angular from 'angular';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export declare let defaultVisiblePageCount: number;
export interface IPagerBindings {
    pageCount: number;
}
export declare class PagerController {
    private $scope;
    pageCount: number;
    canGoBack: boolean;
    canGoForward: boolean;
    currentPage: number;
    pages: number[];
    hasPageFilter: boolean;
    private cardContainer;
    private pager;
    private dataSource;
    private lastPage;
    private visiblePageCount;
    static $inject: string[];
    constructor($scope: angular.IScope);
    $onInit(): void;
    private updatePageCount;
    private updatePaging();
    first(): void;
    previous(): void;
    goto(page: number): void;
    next(): void;
    last(): void;
}
