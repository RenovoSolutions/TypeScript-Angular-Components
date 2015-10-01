import * as angular from 'angular';
import { IDataSource } from '../../dataSources/dataSources.module';
import { IFilterGroup, IFilterOption } from './filterGroup.service';
export declare var directiveName: string;
export declare var controllerName: string;
export interface IFilterGroupBindings {
    icon: string;
    filterGroup: IFilterGroup;
    source: IDataSource<any>;
}
export declare class FilterGroupController {
    private $scope;
    icon: string;
    filterGroup: IFilterGroup;
    source: IDataSource<any>;
    hasIcon: boolean;
    showChildren: boolean;
    static $inject: string[];
    constructor($scope: angular.IScope);
    toggleChildren(): void;
    selectOption(option: IFilterOption): void;
}
export declare function filterGroup(): angular.IDirective;
