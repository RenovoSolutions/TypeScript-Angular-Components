import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export declare class SelectController {
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
    ngModel: angular.INgModelController;
    selectValidator: IComponentValidator;
    loading: boolean;
    private _nullOption;
    selection: any;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery, $scope: angular.IScope, $q: angular.IQService, componentValidatorFactory: IComponentValidatorFactory, object: __object.IObjectUtility);
    getDisplayName(item: any): string;
    loadItems(): angular.IPromise<any[]>;
    configureOptions(options: any[]): any[];
}
export declare function select(): angular.IDirective;
