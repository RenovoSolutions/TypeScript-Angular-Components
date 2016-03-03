import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export declare class LazyLoadController {
    show: boolean;
    init: boolean;
    static $inject: string[];
    constructor($scope: angular.IScope);
}
