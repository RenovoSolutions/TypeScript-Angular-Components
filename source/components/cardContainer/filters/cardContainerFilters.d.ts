import * as angular from 'angular';
import { filters } from 'typescript-angular-utilities';
import { IDataSource } from '../dataSources/dataSource';
import { ITemplateObject } from '../../templateRenderer/templateRenderer';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export interface IRenderableFilter extends filters.IFilter {
    template: string | ITemplateObject;
}
export interface IFilterScope extends angular.IScope {
    filter: filters.IFilter;
    dataSource: IDataSource<any>;
}
export interface ICardContainerFiltersBindings {
    filters: filters.IFilter[];
    source: IDataSource<any>;
}
export declare class CardContainerFiltersController implements ICardContainerFiltersBindings {
    private $rootScope;
    filters: filters.IFilter[];
    source: IDataSource<any>;
    renderableFilters: IRenderableFilter[];
    static $inject: string[];
    constructor($rootScope: angular.IRootScopeService);
    $onInit(): void;
}
