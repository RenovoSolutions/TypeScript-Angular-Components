import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export declare class TextboxController {
    validator: __validation.IValidationHandler;
    label: string;
    ngModel: angular.INgModelController;
    textboxValidator: IComponentValidator;
    text: string;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery, $scope: angular.IScope, componentValidatorFactory: IComponentValidatorFactory);
}
export declare function textbox(): angular.IDirective;
