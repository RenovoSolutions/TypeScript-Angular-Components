import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;
import { IToggleParams } from '../checkbox/checkbox';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export interface IButtonToggleBindings {
    type: string;
    size: string;
    onToggle(param: IToggleParams): void;
    disabled: boolean;
}
export interface IButtonToggleController extends IButtonToggleBindings {
    buttonClass: string;
    buttonSize: string;
    clicked(): void;
}
export declare class ButtonToggleController implements IButtonToggleController {
    type: string;
    size: string;
    onToggle: {
        (param: IToggleParams): void;
    };
    disabled: boolean;
    buttonClass: string;
    buttonSize: string;
    ngModel: angular.INgModelController;
    checked: boolean;
    static $inject: string[];
    constructor($scope: angular.IScope, bool: __boolean.IBooleanUtility);
    clicked(): void;
}
