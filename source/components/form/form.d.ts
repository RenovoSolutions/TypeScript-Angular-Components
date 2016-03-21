import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
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
export interface IFormBehavior {
    save(): void;
}
export declare class FormController implements IFormBindings {
    private $element;
    private $scope;
    private $timeout;
    private $q;
    private autosaveFactory;
    private parentChild;
    saving: boolean;
    save: {
        (): void;
    };
    form: IFormValidator;
    childLink: __parentChild.IChild<IFormBehavior>;
    autosave: IAutosaveService;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery, $scope: IFormScope, $timeout: angular.ITimeoutService, $q: angular.IQService, autosaveFactory: IAutosaveServiceFactory, parentChild: __parentChild.IParentChildBehaviorService);
    $onInit(): void;
    saveForm(): angular.IPromise<void>;
}
