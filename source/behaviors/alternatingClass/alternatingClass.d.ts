import * as angular from 'angular';
export declare const moduleName: string;
export declare const directiveName: string;
export declare const controllerName: string;
export interface IAlternatingClassAttributes extends angular.IAttributes {
    rlAlternatingClass: string;
}
export declare class AlternatingClassController {
    private $scope;
    private $attrs;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: IAlternatingClassAttributes);
    message: string;
    $onInit(): void;
    checkForIndex(scope: any): number;
}
