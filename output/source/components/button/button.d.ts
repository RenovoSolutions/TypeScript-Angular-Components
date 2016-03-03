import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
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
export declare function button(): angular.IDirective;
