import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export declare class CheckboxController {
    ngDisabled: boolean;
    ngModel: angular.INgModelController;
    checked: boolean;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery);
}
export declare function checkbox(): angular.IDirective;
