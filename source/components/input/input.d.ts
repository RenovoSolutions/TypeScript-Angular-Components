import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import { INgModelValidator } from '../../types/formValidators';
import { RequiredController } from '../../behaviors/required/required';
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare var moduleName: string;
export declare var controllerName: string;
export declare class InputController {
    protected $scope: angular.IScope;
    private componentValidatorFactory;
    validator: __validation.IValidationHandler;
    label: string;
    ngModel: INgModelValidator;
    required: RequiredController;
    inputValidator: IComponentValidator;
    inputValue: string;
    static $inject: string[];
    constructor($scope: angular.IScope, componentValidatorFactory: IComponentValidatorFactory);
    $onInit(): void;
}
export declare let input: angular.IComponentOptions;
