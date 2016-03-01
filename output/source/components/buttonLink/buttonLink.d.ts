import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export declare class ButtonLinkController {
    link: string;
    type: string;
    ngDisabled: boolean;
    size: string;
    newTab: boolean;
    target: string;
    configuredSize: string;
    constructor();
}
export declare function buttonLink(): angular.IDirective;
