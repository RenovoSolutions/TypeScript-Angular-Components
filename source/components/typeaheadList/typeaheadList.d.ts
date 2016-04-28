import * as angular from 'angular';
import { IChild, IParentChildBehaviorService } from '../../services/parentChild/parentChild.service';
import { IGetItemsParams } from '../typeahead/typeahead';
import { IChangeObject } from '../../types/changes';
export declare const moduleName: string;
export declare const componentName: string;
export declare const controllerName: string;
export interface ITypeaheadListBindings {
    /**
     * Event for loading the data set or searching against the server
     * @param?: {string} search Search value for the server
     */
    getItems: {
        (params?: IGetItemsParams): angular.IPromise<any>;
    };
    /**
     * Event that is fired when an item is added to the list
     * @param?: {object} item The item that was added
     */
    add: {
        (params?: IAddParams): angular.IPromise<void>;
    };
    /**
     * Event that is fired when an item is removed from the list
     * @param?: {object} item The item that was removed
     */
    remove: {
        (params?: IRemoveParams): angular.IPromise<void>;
    };
    /**
     * Selector for getting the display value for the items
     */
    transform: {
        (item: any): string;
    } | string;
    /**
     * Flower-up label for the typeahead
     */
    label: string;
    /**
     * Prefix to show before the label in the placeholder. Default 'Search for'
     */
    prefix: string;
    /**
     * Option for specifying whether searching should take place on the client or server
     */
    useClientSearching: boolean;
    /**
     * Option for disabling the typeahead
     */
    ngDisabled: boolean;
    /**
     * Alias for the item in the transclude list item template
     */
    itemAs: string;
    /**
     * Link for telling the typeahead list to add or remove an item from outside
     */
    childLink: IChild<ITypeaheadListBehavior>;
    /**
     * Data that is shared between all list items
     */
    listData: any;
    /**
     * Turn off searching capabilities and use a simple dropdown for selection
     */
    disableSearching: boolean;
}
export interface ITypeaheadListScope extends angular.IScope {
    $remove(item: any): void;
    $transform(item: any): string;
    listData: any;
}
export interface ITypeaheadListBehavior {
    add(item: any): void;
    remove(item: any): void;
}
export interface IAddParams {
    item: any;
}
export interface IRemoveParams {
    item: any;
}
export interface ITypeaheadListChanges {
    disableSearching: IChangeObject<boolean>;
}
export declare class TypeaheadListController implements ITypeaheadListBindings {
    private $scope;
    $transclude: angular.ITranscludeFunction;
    private $q;
    private parentChild;
    getItems: {
        (params?: IGetItemsParams): angular.IPromise<any>;
    };
    add: {
        (params?: IAddParams): angular.IPromise<void>;
    };
    remove: {
        (params?: IRemoveParams): angular.IPromise<void>;
    };
    transform: {
        (item: any): string;
    } | string;
    label: string;
    prefix: string;
    useClientSearching: boolean;
    ngDisabled: boolean;
    itemAs: string;
    childLink: IChild<ITypeaheadListBehavior>;
    listData: any;
    disableSearching: boolean;
    ngModel: angular.INgModelController;
    cachedItems: any[];
    model: any;
    static $inject: string[];
    constructor($scope: ITypeaheadListScope, $transclude: angular.ITranscludeFunction, $q: angular.IQService, parentChild: IParentChildBehaviorService);
    $onInit(): void;
    $onChanges(changes: ITypeaheadListChanges): void;
    loadItems(search?: string): angular.IPromise<any[]>;
    searchItems(search?: string): angular.IPromise<any>;
    addItem(item: any): angular.IPromise<any>;
    removeItem(item: any): angular.IPromise<void>;
    private filter(list, search);
    private loadCachedItems();
}
