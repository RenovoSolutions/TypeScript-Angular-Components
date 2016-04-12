import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import { INgModelValidator } from '../../types/formValidators';
import { RequiredController } from '../../behaviors/required/required';
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare var moduleName: string;
export declare var controllerName: string;
export interface IInputAttributes extends angular.IAttributes {
    name: string;
}
export interface IInputOptions {
    template: string;
    controller?: string | Function;
    controllerAs?: string;
    bindings?: any;
}
export declare class InputController {
    protected $scope: angular.IScope;
    protected $attrs: IInputAttributes;
    private componentValidatorFactory;
    validator: __validation.IValidationHandler;
    label: string;
    name: string;
    ngModel: INgModelValidator;
    required: RequiredController;
    inputValidator: IComponentValidator;
    inputType: string;
    inputValue: string;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: IInputAttributes, componentValidatorFactory: IComponentValidatorFactory);
    $onInit(): void;
}
export declare function buildInput(options: IInputOptions): angular.IComponentOptions;
