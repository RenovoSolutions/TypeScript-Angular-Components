import * as angular from 'angular';
export declare const moduleName: string;
export declare const directiveName: string;
export declare const controllerName: string;
export interface IRequiredAttributes extends angular.IAttributes {
    rlRequired: string;
}
export declare class RequiredController {
    private $scope;
    private $attrs;
    private $interpolate;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: IRequiredAttributes, $interpolate: angular.IInterpolateService);
    message: string;
}
