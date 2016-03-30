import * as angular from 'angular';
export declare var moduleName: string;
export declare var componentName: string;
export declare var controllerName: string;
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
    range: number;
    stars: IStar[];
    ngModel: angular.INgModelController;
    static $inject: string[];
    constructor($timeout: angular.ITimeoutService);
    $onInit(): void;
    setRating(rating: number): void;
    private updateStarView(rating);
}
