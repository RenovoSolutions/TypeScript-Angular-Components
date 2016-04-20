import * as angular from 'angular';
import { IToggleParams } from '../checkbox/checkbox';
import { ButtonController } from '../button/button';
export declare const moduleName: string;
export declare const componentName: string;
export declare const controllerName: string;
export interface IButtonToggleBindings {
    type: string;
    size: string;
    onToggle(param: IToggleParams): void;
    ngDisabled: boolean;
}
export interface IButtonToggleController extends IButtonToggleBindings {
    clicked(): void;
}
export declare class ButtonToggleController extends ButtonController implements IButtonToggleController {
    onToggle: {
        (param: IToggleParams): void;
    };
    ngModel: angular.INgModelController;
    checked: boolean;
    constructor();
    clicked(): void;
}
