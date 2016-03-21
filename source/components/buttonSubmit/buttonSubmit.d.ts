import * as angular from 'angular';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export declare class ButtonSubmitController {
    private $element;
    type: string;
    ngDisabled: boolean;
    size: string;
    rightAligned: boolean;
    saving: boolean;
    configuredSize: string;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery);
}
