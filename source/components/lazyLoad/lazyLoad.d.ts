import * as angular from 'angular';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export declare class LazyLoadController {
    show: boolean;
    init: boolean;
    static $inject: string[];
    constructor($scope: angular.IScope);
}
