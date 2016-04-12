import './ratingBar.css';
import * as angular from 'angular';
export declare var moduleName: string;
export declare var componentName: string;
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
    useDefaultTheme: boolean;
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
    constructor($scope: angular.IScope, useDefaultTheme: boolean);
    private updateValue(newValue);
}
