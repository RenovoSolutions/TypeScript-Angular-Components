import * as angular from 'angular';
import { IToggleParams } from '../checkbox/checkbox';
import { ButtonController } from '../button/button';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
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
