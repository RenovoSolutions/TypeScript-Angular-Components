import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import { IAutosaveBehavior } from '../../behaviors/autosave/autosave';
export declare var directiveName: string;
export declare var controllerName: string;
export interface ISimpleCardBindings {
    onOpen(): void;
    canOpen: boolean;
    alwaysOpen: boolean;
    childLink: __parentChild.IChild<ISimpleCardBehavior>;
    validate(): boolean;
    save(): angular.IPromise<void>;
}
export interface ISimpleCardScope extends angular.IScope {
    hasFooter: boolean;
}
export interface ISimpleCardBehavior {
    close(): boolean;
    setAlwaysOpen(value: boolean): void;
}
export declare class SimpleCardController implements ISimpleCardBindings {
    private $scope;
    private parentChild;
    onOpen: {
        (): void;
    };
    canOpen: boolean;
    alwaysOpen: boolean;
    childLink: __parentChild.IChild<ISimpleCardBehavior>;
    validate: {
        (): boolean;
    };
    save: {
        (): angular.IPromise<void>;
    };
    showContent: boolean;
    autosaveLink: __parentChild.IChild<IAutosaveBehavior>;
    private listController;
    static $inject: string[];
    constructor($scope: angular.IScope, $element: angular.IAugmentedJQuery, parentChild: __parentChild.IParentChildBehaviorService);
    toggleContent(): void;
    open(): void;
    close: {
        (): boolean;
    };
    private noList();
}
export declare function simpleCard(): angular.IDirective;
