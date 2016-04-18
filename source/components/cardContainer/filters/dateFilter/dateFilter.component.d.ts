import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __date = services.date;
import { IDateFilter } from './dateFilter.service';
import { IDataSource } from '../../datasources/dataSource';
export declare let componentName: string;
export declare let controllerName: string;
export interface IDateFilterBindings {
    clearButton: boolean;
    count: number;
    filter: IDateFilter;
    includeTime: boolean;
    includeDateRange: boolean;
    label: string;
    selectedDate1: moment.Moment;
    selectedDate2: moment.Moment;
    source: IDataSource<any>;
    type: string;
}
export declare class DateFilterController implements IDateFilterBindings {
    private $scope;
    private dateUtility;
    private $element;
    clearButton: boolean;
    count: number;
    filter: IDateFilter;
    includeDateRange: boolean;
    includeTime: boolean;
    label: string;
    source: IDataSource<any>;
    type: string;
    private inputField;
    selectedDate1: moment.Moment;
    static $inject: string[];
    constructor($scope: angular.IScope, dateUtility: __date.IDateUtility, $element: angular.IAugmentedJQuery);
    selectedDate2: moment.Moment;
    refreshDataSource(): void;
    clearCount(): void;
    decreaseCount(): void;
    countChange(): void;
    increaseCount(): void;
    setDateTimeNowIfNull(): void;
    toggle(): void;
}
export declare let dateFilter: angular.IComponentOptions;
