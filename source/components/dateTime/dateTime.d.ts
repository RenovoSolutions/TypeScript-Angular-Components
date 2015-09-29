import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export interface IDateTimeScope extends angular.IScope {
    minuteStepping: number;
    ngModel: any;
    useDate: boolean;
    useTime: boolean;
    min: string | Date | moment.Moment;
    max: string | Date | moment.Moment;
    dateTimePickerOpen: boolean;
    validFormat: boolean;
    format: string;
}
