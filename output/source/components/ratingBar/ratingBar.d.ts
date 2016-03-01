import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IDimensions {
    width: number;
    height: number;
}
export interface IRatingBarScopeBindings {
    totalWidth: number;
    height: number;
    value: number;
    min: number;
    max: number;
    background: string;
}
export declare class RatingBarController implements IRatingBarScopeBindings {
    private $scope;
    totalWidth: number;
    height: number;
    value: number;
    min: number;
    max: number;
    background: string;
    backgroundClass: string;
    dimensions: IDimensions;
    width: number;
    barClass: string;
    private ratingBarClass;
    static $inject: string[];
    constructor($scope: angular.IScope);
    private updateValue(newValue);
}
export declare function ratingBar(): angular.IDirective;
