import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
import __autosave = services.autosave;
import __parentChild = services.parentChildBehavior;
import __objectUtility = services.object;
export interface IAutosaveAttributes extends angular.IAttributes {
    rlAutosave: string;
    validate: string;
    save: string;
}
export interface IAutosaveBehavior {
    autosave(): boolean;
}
export declare class AutosaveController {
    private $scope;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: IAutosaveAttributes, $parse: angular.IParseService, $element: angular.IAugmentedJQuery, autosaveFactory: __autosave.IAutosaveServiceFactory, parentChildBehavior: __parentChild.IParentChildBehaviorService, objectUtility: __objectUtility.IObjectUtility);
}
export declare function autosave(): angular.IDirective;
