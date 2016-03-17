import * as angular from 'angular';
export declare let moduleName: string;
export declare let directiveName: string;
export declare let controllerName: string;
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
    $onInit(): void;
}
