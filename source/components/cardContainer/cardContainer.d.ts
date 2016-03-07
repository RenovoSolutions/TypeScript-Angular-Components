import * as angular from 'angular';
import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __parentChild = services.parentChildBehavior;
import __genericSearchFilter = services.genericSearchFilter;
import { IDataSource, dataPager } from './dataSources/dataSources.module';
import { IColumn } from './column';
import { ISortDirections } from './sorts/sorts.module';
import { ICardContainerBuilder, CardContainerBuilder } from './cardContainerBuilder.service';
export declare let directiveName: string;
export declare let controllerName: string;
export declare let defaultMaxColumnSorts: number;
export declare let defaultSelectionTitle: string;
export interface ICardContainerScope extends angular.IScope {
    containerData: any;
}
export interface ICardContainerBindings {
    builder: ICardContainerBuilder;
    cardController: string;
    cardControllerAs: string;
    cardAs: string;
}
export interface ICardBehavior {
    close(): boolean;
}
export interface ICardContainerAttrs extends angular.IAttributes {
    disableSelection: string;
}
export interface ISelectionViewData {
    selected: boolean;
    selectionTitle?: string;
    disabledSelection?: boolean;
}
export declare class CardContainerController {
    private $scope;
    private object;
    private array;
    private dataPagerFactory;
    private parentChild;
    builder: CardContainerBuilder;
    source: IDataSource<any>;
    filters: filters.IFilter[];
    searchFilter: __genericSearchFilter.IGenericSearchFilter;
    paging: boolean;
    columns: IColumn[];
    containerData: any;
    cardController: string;
    cardControllerAs: string;
    cardAs: string;
    clickableCards: boolean;
    maxColumnSorts: number;
    permanentFooters: boolean;
    selectableCards: boolean;
    disableSelection: {
        (item: any): string;
    };
    renderFilters: boolean;
    dataSource: IDataSource<any>;
    sortDirection: ISortDirections;
    numberSelected: number;
    selectionColumn: IColumn;
    private maxColSorts;
    private disablingSelections;
    makeCard: angular.ITranscludeFunction;
    static $inject: string[];
    constructor($scope: ICardContainerScope, $attrs: ICardContainerAttrs, object: __object.IObjectUtility, array: __array.IArrayUtility, dataPagerFactory: dataPager.IDataPagerFactory, parentChild: __parentChild.IParentChildBehaviorService);
    sortSelected(): void;
    openCard(): boolean;
    sort(column: IColumn): void;
    selectionChanged(): void;
    private syncFilters();
    private setupPaging();
    private buildColumnSizes();
    private addViewData;
    private lookupColumn(label);
    private clearFilteredSelections;
    private updateSelected;
    private updateDisabledSelections;
    private buildSecondarySorts(direction, secondarySorts);
    private updateVisualColumnSorting();
    private updateVisualSortIndicator(sort);
    private clearVisualSortIndicator(sort);
}
export declare function cardContainer($compile: angular.ICompileService): angular.IDirective;
