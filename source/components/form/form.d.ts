import * as angular from 'angular';
import { IFormValidator } from '../../types/formValidators';
import { IAutosaveService, IAutosaveServiceFactory } from '../../services/autosave/autosave.service';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export interface IFormBindings {
    saving: boolean;
    save(): void;
}
export interface IFormScope extends angular.IScope {
    rlForm: IFormValidator;
}
export declare class FormController implements IFormBindings {
    private $element;
    private $scope;
    private $timeout;
    private $q;
    private autosaveFactory;
    saving: boolean;
    save: {
        (): void;
    };
    form: IFormValidator;
    autosave: IAutosaveService;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery, $scope: IFormScope, $timeout: angular.ITimeoutService, $q: angular.IQService, autosaveFactory: IAutosaveServiceFactory);
    $onInit(): void;
    saveForm(): angular.IPromise<void>;
}
