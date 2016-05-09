import * as angular from 'angular';
import { ISelectFilter } from './selectFilter.service';
import { IDataSource } from '../../datasources/dataSource';
import { IJQueryUtility } from '../../../../services/jquery/jquery.service';
export declare let componentName: string;
export declare let controllerName: string;
export interface ISelectFilterBindings {
    filter: ISelectFilter<any>;
    options?: any[];
    getOptions?: {
        (): angular.IPromise<any[]>;
    };
    source: IDataSource<any>;
    label: string;
    selector: string | {
        (item: any): string;
    };
    nullOption: string;
}
export interface ISelectFilterController extends ISelectFilterBindings {
    selectedValue: any;
}
export declare class SelectFilterController implements ISelectFilterController {
    private $scope;
    filter: ISelectFilter<any>;
    options: any[];
    getOptions: {
        (): angular.IPromise<any[]>;
    };
    source: IDataSource<any>;
    label: string;
    selector: string | {
        (item: any): string;
    };
    nullOption: string;
    template: string;
    static $inject: string[];
    constructor($scope: angular.IScope, $transclude: angular.ITranscludeFunction, jqueryUtility: IJQueryUtility);
    selectedValue: any;
}
export declare let selectFilter: angular.IComponentOptions;
