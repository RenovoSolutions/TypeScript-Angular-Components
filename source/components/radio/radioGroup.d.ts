import * as ng from 'angular';
import { services } from 'typescript-angular-utilities';
import __object = services.object;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IRadioGroupAttributes extends ng.IAttributes {
    rlRadioGroup: string;
    name: string;
}
export declare class RadioGroup {
    name: string;
    selection: any;
    constructor($scope: ng.IScope, ngModel: ng.INgModelController, name?: string);
}
export declare class RadioGroupController {
    private static nextId;
    group: RadioGroup;
    static $inject: string[];
    constructor($scope: ng.IScope, $attrs: IRadioGroupAttributes, $element: ng.IAugmentedJQuery, object: __object.IObjectUtility);
    registerButton(): RadioGroup;
    private getNextId();
}
export declare function radioGroup(): ng.IDirective;
