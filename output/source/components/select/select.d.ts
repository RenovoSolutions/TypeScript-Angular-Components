import 'ui-select';
import 'ui-select/dist/select.css';
import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IUISelect {
    search: string;
}
export declare class SelectController {
    private $scope;
    private $q;
    private object;
    options: any[];
    getOptions: {
        (): angular.IPromise<any[]>;
    };
    selector: {
        (item: any): string;
    } | string;
    validator: __validation.IValidationHandler;
    label: string;
    ngDisabled: boolean;
    nullOption: string;
    select: {
        (params: any): void;
    };
    ngModel: angular.INgModelController;
    selectValidator: IComponentValidator;
    loading: boolean;
    selectionTwo: any;
    uiSelect: IUISelect;
    hasSearchOption: boolean;
    private _nullOption;
    private _searchOption;
    selection: any;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery, $scope: angular.IScope, $q: angular.IQService, componentValidatorFactory: IComponentValidatorFactory, object: __object.IObjectUtility);
    refreshOptions(search: string): void;
    private useSearch(search);
    getItems(search: string): any[];
    getDisplayName(item: any): string;
    loadItems(): angular.IPromise<any[]>;
    configureOptions(options: any[]): any[];
}
export declare function select(): angular.IDirective;
