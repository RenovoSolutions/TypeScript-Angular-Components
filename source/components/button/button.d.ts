import * as angular from 'angular';
export declare const moduleName: string;
export declare const componentName: string;
export declare const controllerName: string;
export interface IButtonOptions {
    require?: any;
    template?: string;
    transclude?: boolean;
    controller?: string | Function;
    controllerAs?: string;
    bindings?: any;
}
export declare class ButtonController {
    action: {
        (): void;
    };
    type: string;
    ngDisabled: boolean;
    size: string;
    configuredSize: string;
    types: string;
    constructor();
}
export declare function buildButton(options: IButtonOptions): angular.IComponentOptions;
