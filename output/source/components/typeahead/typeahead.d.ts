import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import __genericSearch = services.genericSearchFilter;
import __objectUtility = services.object;
import __arrayUtility = services.array;
import __promiseUtility = services.promise;
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface ITypeaheadBindings {
    childLink: __parentChild.IChild<ITypeaheadBehavior>;
    selection: any;
    hasSelection: boolean;
    select(params: ISelectParams): void;
    transform(params: ITransformParams): string;
    getItems(params?: IGetItemsParams): angular.IPromise<any>;
    placeholder: string;
    useClientSearching: boolean;
    hasError: boolean;
    showSearch: boolean;
    apply(param: IApplyParam): angular.IPromise<any>;
}
export interface ITypeaheadBehavior {
    add(item: any): void;
    remove(item: any): void;
}
export interface ISelectParams {
    value: any;
    hasSelection: boolean;
}
export interface ITransformParams {
    value: any;
}
export interface IGetItemsParams {
    search: string;
}
export interface IApplyParam {
    value: any;
}
export interface ITypeaheadAttrs extends angular.IAttributes {
    selection: string;
    transform: string;
    apply: string;
}
export declare class TypeaheadController {
    private $scope;
    private $q;
    private parentChild;
    private array;
    private promise;
    childLink: __parentChild.IChild<ITypeaheadBehavior>;
    selectionBinding: any;
    hasSelection: boolean;
    select: {
        (params: ISelectParams): void;
    };
    transformInParent: {
        (params: ITransformParams): string;
    };
    getItemsInParent: {
        (params?: IGetItemsParams): angular.IPromise<any>;
    };
    placeholder: string;
    useClientSearching: boolean;
    hasError: boolean;
    showSearch: boolean;
    apply: {
        (param: IApplyParam): angular.IPromise<any>;
    };
    private cachedItems;
    private searchFilter;
    private useScopeSelection;
    private hasTransform;
    selection: any;
    loading: boolean;
    loadDelay: number;
    useApply: boolean;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: ITypeaheadAttrs, $q: angular.IQService, parentChild: __parentChild.IParentChildBehaviorService, genericSearchFactory: __genericSearch.IGenericSearchFilterFactory, object: __objectUtility.IObjectUtility, array: __arrayUtility.IArrayUtility, promise: __promiseUtility.IPromiseUtility);
    private setSelection(object);
    transform(object: any): string;
    getItems(search: string): angular.IPromise<any>;
    applyItem(): angular.IPromise<void>;
    private filter(list);
    private addItem;
    private removeItem;
}
export declare function typeahead(): angular.IDirective;
