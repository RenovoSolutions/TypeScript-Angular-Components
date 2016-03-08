import * as angular from 'angular';
import { IColumn } from '../../column';
export declare var directiveName: string;
export declare var controllerName: string;
export interface IHeaderColumnBindings {
    column: IColumn<any>;
    item: any;
    alias: string;
}
export declare class HeaderColumnController {
    private $scope;
    column: IColumn<any>;
    item: any;
    alias: string;
    value: string | number | boolean;
    renderedTemplate: JQuery;
    static $inject: string[];
    constructor($scope: angular.IScope);
    private update;
}
export declare function headerColumn($compile: angular.ICompileService): angular.IDirective;
