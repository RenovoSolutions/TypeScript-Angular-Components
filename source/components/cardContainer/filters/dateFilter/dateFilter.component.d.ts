import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __date = services.date;
import { IDateFilter } from './dateFilter.service';
import { IDataSource } from '../../datasources/dataSource';
export declare let directiveName: string;
export declare let controllerName: string;
export interface IDateFilterBindings {
    clearButton: boolean;
    count: number;
    filter: IDateFilter;
    includeTime: boolean;
    includeDateRange: boolean;
    label: string;
    selectedDate1: string;
    selectedDate2: Date;
    selector: string;
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
    selector: string;
    source: IDataSource<any>;
    type: string;
    private inputField;
    static $inject: string[];
    constructor($scope: angular.IScope, dateUtility: __date.IDateUtility, $element: angular.IAugmentedJQuery);
    selectedDate1: string;
    selectedDate2: Date;
    refreshDataSource(): void;
    clearCount(): void;
    decreaseCount(): void;
    countChange(): void;
    increaseCount(): void;
    setDateTimeNowIfNull(): void;
    toggle(): void;
}
export declare function dateFilter(): angular.IDirective;
