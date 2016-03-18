import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import __genericSearch = services.genericSearchFilter;
import __objectUtility = services.object;
import __arrayUtility = services.array;
import __validation = services.validation;
import { InputController } from '../input/input';
import { IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare var moduleName: string;
export declare var componentName: string;
export declare var controllerName: string;
export interface ITypeaheadBindings {
    childLink: __parentChild.IChild<ITypeaheadBehavior>;
    /**
     * Event that gets fired with updates to the selection - use if selection adds to a list
     * @param {any} value The new selection
     * @param {bool} isNew Indicates whether the selection was picked from the list or selected as the search
     */
    select(params: ISelectParams): void;
    /**
     * Event that is used to convert a search text to its object representation - use if the user can specify a custom option
     * @param {any} value The string value representing the new selection
     * @returns {any} Object representing the new value to be displayed, if applicable
     */
    create(params: ICreateParams): any;
    /**
     * Specifies whether making a selection should collapse the typeahead and show the selection
     * or just fire an event - defaults to true if no select handler is specified
     */
    allowCollapse: boolean;
    /**
     * Selector for getting the display value for the items
     */
    transform(item: any): string | string;
    /**
     * Event for loading the data set or searching against the server
     * @param?: {string} search Search value for the server
     */
    getItems(params?: IGetItemsParams): angular.IPromise<any>;
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
     * Handler for specifying custom validation logic
     */
    validator: __validation.IValidationHandler;
}
export interface ITypeaheadBehavior {
    add(item: any): void;
    remove(item: any): void;
}
export interface ISelectParams {
    value: any;
}
export interface IGetItemsParams {
    search: string;
}
export interface ICreateParams {
    value: any;
}
export interface ITypeaheadAttrs extends angular.IAttributes {
    select: string;
    create: string;
}
export declare class TypeaheadController extends InputController {
    private $q;
    private $timeout;
    private parentChild;
    private genericSearchFactory;
    private object;
    private array;
    childLink: __parentChild.IChild<ITypeaheadBehavior>;
    hasSelection: boolean;
    select: {
        (params: ISelectParams): void;
    };
    create: {
        (params: ICreateParams): void;
    };
    transform: {
        (item: any): string;
    } | string;
    getItems: {
        (params?: IGetItemsParams): angular.IPromise<any>;
    };
    prefix: string;
    useClientSearching: boolean;
    ngDisabled: boolean;
    allowCollapse: boolean;
    private cachedItems;
    private searchFilter;
    visibleItems: any[];
    loading: boolean;
    loadDelay: number;
    placeholder: string;
    collapseOnSelect: boolean;
    allowCustomOption: boolean;
    collapsed: boolean;
    hasSearchOption: boolean;
    selection: any;
    _searchOption: any;
    static $inject: string[];
    constructor($scope: angular.IScope, $q: angular.IQService, $attrs: ITypeaheadAttrs, $timeout: angular.ITimeoutService, parentChild: __parentChild.IParentChildBehaviorService, genericSearchFactory: __genericSearch.IGenericSearchFilterFactory, object: __objectUtility.IObjectUtility, array: __arrayUtility.IArrayUtility, componentValidatorFactory: IComponentValidatorFactory);
    $onInit(): void;
    getDisplayName(item: any): string;
    refresh(search: string): angular.IPromise<void>;
    loadItems(search: string): angular.IPromise<void>;
    clear(): void;
    private showCustomSearch(search);
    private filter(list);
    private addItem(item);
    private removeItem(item);
}
