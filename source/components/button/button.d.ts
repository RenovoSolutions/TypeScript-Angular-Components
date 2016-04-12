import * as angular from 'angular';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
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
    constructor();
}
export declare function buildButton(options: IButtonOptions): angular.IComponentOptions;
