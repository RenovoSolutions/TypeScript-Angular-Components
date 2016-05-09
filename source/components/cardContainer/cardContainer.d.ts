import * as angular from 'angular';
import * as Rx from 'rxjs';
import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __parentChild = services.parentChildBehavior;
import __genericSearchFilter = services.genericSearchFilter;
import { IDataSource, dataPager } from './dataSources/dataSources.module';
import { IColumn } from './column';
import { ISortDirections } from './sorts/sorts.module';
import { ICardContainerBuilder, CardContainerBuilder } from './cardContainerBuilder.service';
export declare let componentName: string;
export declare let controllerName: string;
export declare let defaultMaxColumnSorts: number;
export declare let defaultSelectionTitle: string;
export interface ICardContainerScope extends angular.IScope {
    containerData: any;
}
export interface ICardContainerBindings {
    /**
     * A builder for the card container
     */
    builder: ICardContainerBuilder;
    /**
     * Controller shared by all components on a card
     * this controller cannot override any of the following letiable names:
     *      columns
     *      item
     *      contentTemplate
     *      footerTemplate
     *      clickable
     *      cardController
     *      cardControllerAs
     *      cardAs
     *      showContent
     *      toggleContent
     *      collapse
     *      selected
     *      setSelected
     */
    cardController: string;
    /**
     * Controller alias specified using controllerAs syntax
     */
    cardControllerAs: string;
    /**
     * Name used to access the card data
     */
    cardAs: string;
    /**
     * Event that first when a card is selected or deselected
     */
    selectionChangedEvent: {
        (): void;
    };
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
    columns: IColumn<any>[];
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
    saveWhenInvalid: boolean;
    selectionChangedEvent: {
        (): void;
    };
    dataSource: IDataSource<any>;
    sortDirection: ISortDirections;
    numberSelected: number;
    numberSelectedChanges: Rx.Subject<number>;
    selectionColumn: IColumn<any>;
    private maxColSorts;
    private disablingSelections;
    makeCard: angular.ITranscludeFunction;
    static $inject: string[];
    constructor($scope: ICardContainerScope, $attrs: ICardContainerAttrs, $transclude: angular.ITranscludeFunction, object: __object.IObjectUtility, array: __array.IArrayUtility, dataPagerFactory: dataPager.IDataPagerFactory, parentChild: __parentChild.IParentChildBehaviorService);
    sortSelected(): void;
    openCard(): boolean;
    sort(column: IColumn<any>): void;
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
export declare let cardContainer: angular.IComponentOptions;
