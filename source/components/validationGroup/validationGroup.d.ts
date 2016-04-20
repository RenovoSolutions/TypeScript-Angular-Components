import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import { IFormValidator } from '../../types/formValidators';
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare var moduleName: string;
export declare var componentName: string;
export declare var controllerName: string;
export interface IValidationGroupScope extends angular.IScope {
    validationGroupForm: IFormValidator;
}
export declare class ValidationGroupController {
    private $scope;
    private $timeout;
    private componentValidatorFactory;
    validator: __validation.IValidationHandler;
    validators: __validation.IValidationHandler[];
    groupValidator: IComponentValidator;
    static $inject: string[];
    constructor($scope: IValidationGroupScope, $timeout: angular.ITimeoutService, componentValidatorFactory: IComponentValidatorFactory);
    $onInit(): void;
}
