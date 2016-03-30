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
