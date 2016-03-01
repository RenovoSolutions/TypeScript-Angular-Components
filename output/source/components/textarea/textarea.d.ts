import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export declare class TextareaController {
    name: string;
    rows: number;
    ngDisabled: boolean;
    label: string;
    validator: __validation.IValidationHandler;
    maxlength: number;
    ngModel: angular.INgModelController;
    textareaValidator: IComponentValidator;
    text: string;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery, $scope: angular.IScope, componentValidatorFactory: IComponentValidatorFactory);
}
export declare function textarea(): angular.IDirective;
