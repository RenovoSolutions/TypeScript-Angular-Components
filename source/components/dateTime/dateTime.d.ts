import '../../../libraries/bootstrap-datetimepicker/index';
import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __timezone = services.timezone;
import { InputController, IInputAttributes } from '../input/input';
import { IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare let moduleName: string;
export declare let componentName: string;
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
    onClearEvent(): void;
}
export interface IDateTimeScope extends angular.IScope {
    dateTime: DateTimeController;
}
export declare class DateTimeController extends InputController {
    private $element;
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
    timezone: __timezone.ITimezone;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: IInputAttributes, componentValidatorFactory: IComponentValidatorFactory, $element: angular.IAugmentedJQuery);
    onClearClick(): void;
    $postLink(): void;
    private getFormatOrDefault();
    private defaultFormat(hasDate, hasTime);
    private setValidity(date);
}
