import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IStar {
    value: number;
    filled: boolean;
}
export interface IUserRatingController {
    stars: IStar[];
    setRating(rating: number): void;
}
export interface IUserRatingScope extends angular.IScope {
    ngModel: angular.INgModelController;
    range: number;
}
export declare class UserRatingController implements IUserRatingController {
    private $scope;
    stars: IStar[];
    static $inject: string[];
    constructor($scope: IUserRatingScope);
    setRating(rating: number): void;
    private updateStarView(rating);
}
export declare function userRating(): angular.IDirective;
