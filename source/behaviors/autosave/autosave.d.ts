import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import __objectUtility = services.object;
import { IAutosaveService, IAutosaveServiceFactory, triggers } from '../../services/autosave/autosave.service';
import { IFormValidator } from '../../types/formValidators';
export declare let moduleName: string;
export declare let directiveName: string;
export declare let controllerName: string;
export interface IAutosaveAttributes extends angular.IAttributes {
    rlAutosave: string;
    save: string;
    debounceDuration: string;
    triggers: string;
    saveWhenInvalid: string;
}
export interface IAutosaveBehavior {
    autosave(): boolean;
}
export declare class AutosaveController {
    private $scope;
    private $attrs;
    private $parse;
    private $element;
    private $timeout;
    private autosaveFactory;
    private parentChildBehavior;
    private objectUtility;
    autosave: IAutosaveService;
    keyupListener: {
        (callback: triggers.IListener): triggers.IClearListener;
    };
    form: IFormValidator;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: IAutosaveAttributes, $parse: angular.IParseService, $element: angular.IAugmentedJQuery, $timeout: angular.ITimeoutService, autosaveFactory: IAutosaveServiceFactory, parentChildBehavior: __parentChild.IParentChildBehaviorService, objectUtility: __objectUtility.IObjectUtility);
    $onInit(): void;
}
export declare function autosave(): angular.IDirective;
