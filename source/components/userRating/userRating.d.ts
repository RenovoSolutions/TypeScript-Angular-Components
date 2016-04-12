import './userRating.css';
import * as angular from 'angular';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export interface IStar {
    value: number;
    filled: boolean;
}
export interface IUserRatingBindings {
    range: number;
}
export interface IUserRatingController extends IUserRatingBindings {
    stars: IStar[];
    setRating(rating: number): void;
}
export declare class UserRatingController implements IUserRatingController {
    private $timeout;
    useDefaultTheme: boolean;
    range: number;
    stars: IStar[];
    ngModel: angular.INgModelController;
    static $inject: string[];
    constructor($timeout: angular.ITimeoutService, useDefaultTheme: boolean);
    $onInit(): void;
    setRating(rating: number): void;
    private updateStarView(rating);
}
