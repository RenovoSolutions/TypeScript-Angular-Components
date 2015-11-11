import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
export declare var moduleName: string;
export declare var factoryName: string;
export interface IComponentValidatorOptions {
    ngModel: angular.INgModelController;
    $scope: angular.IScope;
    validators: __validation.IValidationHandler[];
}
export interface IComponentValidator {
    error: string;
}
export declare class ComponentValidator implements IComponentValidator {
    validator: __validation.IValidator;
    error: string;
    private $scope;
    private ngModel;
    constructor(validationService: __validation.IValidationService, options: IComponentValidatorOptions);
    private setValidator();
}
export interface IComponentValidatorFactory {
    getInstance(options: IComponentValidatorOptions): IComponentValidator;
}
export declare function componentValidatorFactory(validationService: __validation.IValidationService): IComponentValidatorFactory;
