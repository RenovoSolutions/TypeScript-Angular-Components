import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import { IComponentValidator, IComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export declare class SelectController {
    private $q;
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
    ngModel: angular.INgModelController;
    selectValidator: IComponentValidator;
    loading: boolean;
    selection: any;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery, $scope: angular.IScope, $q: angular.IQService, componentValidatorFactory: IComponentValidatorFactory);
    getDisplayName(item: any): string;
    loadItems(): angular.IPromise<any[]>;
}
export declare function select(): angular.IDirective;
