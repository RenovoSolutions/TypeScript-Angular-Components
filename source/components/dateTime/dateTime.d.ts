import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare let moduleName: string;
export declare let directiveName: string;
export declare let controllerName: string;
export interface IDateTimeBindings {
    minuteStepping: number;
    useDate: boolean;
    useTime: boolean;
    min: string | Date | moment.Moment;
    max: string | Date | moment.Moment;
    dateTimePickerOpen: boolean;
    validFormat: boolean;
    format: string;
    validator: __validation.IValidationHandler;
    onClearEvent(): void;
}
export interface IDateTimeScope extends angular.IScope {
    dateTime: DateTimeController;
}
export declare class DateTimeController {
    minuteStepping: number;
    useDate: boolean;
    useTime: boolean;
    clearButton: boolean;
    onClearEvent: {
        (): void;
    };
    min: string | Date | moment.Moment;
    max: string | Date | moment.Moment;
    dateTimePickerOpen: boolean;
    validFormat: boolean;
    format: string;
    validator: __validation.IValidationHandler;
    ngModel: angular.INgModelController;
    dateTimeValidator: IComponentValidator;
    static $inject: string[];
    constructor($scope: angular.IScope, componentValidatorFactory: IComponentValidatorFactory);
    onClearClick(): void;
}
