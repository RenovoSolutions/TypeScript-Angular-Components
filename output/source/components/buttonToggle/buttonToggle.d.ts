import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IButtonToggleScope extends angular.IScope {
    ngModel: angular.INgModelController;
    type: string;
    size: string;
    onToggle(param: IToggleParam): void;
    disabled: boolean;
}
export interface IToggleParam {
    value: boolean;
}
export interface IButtonToggleController {
    isActive: boolean;
    buttonClass: string;
    buttonSize: string;
    clicked(): void;
}
