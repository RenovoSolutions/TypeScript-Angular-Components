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
    private ngModel;
    name: string;
    selection: any;
    constructor(ngModel: ng.INgModelController, name?: string);
}
export declare class RadioGroupController {
    private $scope;
    private $attrs;
    private object;
    group: RadioGroup;
    ngModel: ng.INgModelController;
    static $inject: string[];
    constructor($scope: ng.IScope, $attrs: IRadioGroupAttributes, object: __object.IObjectUtility);
    $onInit(): void;
}
export declare function radioGroup(): ng.IDirective;
