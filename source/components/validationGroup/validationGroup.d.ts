import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import { IFormValidator } from '../../types/formValidators';
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IValidationGroupScope extends angular.IScope {
    validationGroupForm: IFormValidator;
}
export declare class ValidationGroupController {
    validator: __validation.IValidationHandler;
    groupValidator: IComponentValidator;
    static $inject: string[];
    constructor($scope: IValidationGroupScope, componentValidatorFactory: IComponentValidatorFactory);
}
export declare function validationGroup(): angular.IDirective;
