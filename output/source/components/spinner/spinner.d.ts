import '../../../libraries/bootstrap-touchspin/index';
import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare let moduleName: string;
export declare let directiveName: string;
export declare let controllerName: string;
export declare let defaultMaxValue: number;
export interface ISpinnerBindings {
    min: number;
    max: number;
    step: number;
    decimals: number;
    prefix: string;
    postfix: string;
    roundToStep: boolean;
    ngDisabled: boolean;
    spinnerId: string;
    name: string;
    validator: __validation.IValidationHandler;
}
export declare class SpinnerController {
    min: number;
    max: number;
    step: number;
    decimals: number;
    prefix: string;
    postfix: string;
    roundToStep: boolean;
    ngDisabled: boolean;
    spinnerId: string;
    name: string;
    validator: __validation.IValidationHandler;
    ngModel: angular.INgModelController;
    spinnerValidator: IComponentValidator;
    static $inject: string[];
    constructor($scope: angular.IScope, componentValidatorFactory: IComponentValidatorFactory);
}
