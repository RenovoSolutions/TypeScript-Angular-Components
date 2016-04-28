import * as angular from 'angular';
import { IParentChildBehaviorService, IChild } from '../../services/parentchild/parentChild.service';
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
    save(): angular.IPromise<void> | boolean;
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
    childLink: IChild<IFormBehavior>;
    autosave: IAutosaveService;
    static $inject: string[];
    constructor($element: angular.IAugmentedJQuery, $scope: IFormScope, $timeout: angular.ITimeoutService, $q: angular.IQService, autosaveFactory: IAutosaveServiceFactory, parentChild: IParentChildBehaviorService);
    $onInit(): void;
    saveForm(): angular.IPromise<void>;
}
