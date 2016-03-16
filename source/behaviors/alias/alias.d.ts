import * as angular from 'angular';
export declare let moduleName: string;
export declare let directiveName: string;
export declare let controllerName: string;
export interface IAliasAttributes extends angular.IAttributes {
    rlAlias: string;
}
export declare class AliasController {
    private $scope;
    private $attrs;
    private $parse;
    private $interpolate;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: IAliasAttributes, $parse: angular.IParseService, $interpolate: angular.IInterpolateService);
    private expression;
    private getValue();
    private resolveAlias(value);
}
export declare function alias(): angular.IDirective;
