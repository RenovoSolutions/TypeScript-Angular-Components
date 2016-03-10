import './checkbox.css';
import * as angular from 'angular';
export declare var moduleName: string;
export declare var componentName: string;
export declare var controllerName: string;
export declare class CheckboxController {
    useDefaultTheme: boolean;
    ngDisabled: boolean;
    active: boolean;
    ngModel: angular.INgModelController;
    checked: boolean;
    toggle(): void;
    static $inject: string[];
    constructor(useDefaultTheme: boolean);
    $onInit(): void;
}
export declare let checkbox: angular.IComponentOptions;
