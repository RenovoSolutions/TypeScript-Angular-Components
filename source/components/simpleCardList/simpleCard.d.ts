import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import { IAutosaveBehavior } from '../../behaviors/autosave/autosave';
import { ISimpleCardListController } from './simpleCardList';
export declare var componentName: string;
export declare var controllerName: string;
export interface ISimpleCardBindings {
    onOpen(): void;
    canOpen: boolean;
    alwaysOpen: boolean;
    childLink: __parentChild.IChild<ISimpleCardBehavior>;
    save(): angular.IPromise<void>;
    saveWhenInvalid?: boolean;
}
export interface ISimpleCardScope extends angular.IScope {
    hasFooter: boolean;
}
export interface ISimpleCardBehavior {
    autosave(): boolean;
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
    save: {
        (): angular.IPromise<void>;
    };
    saveWhenInvalid: boolean;
    cardType: string;
    showContent: boolean;
    autosaveLink: __parentChild.IChild<IAutosaveBehavior>;
    listController: ISimpleCardListController;
    static $inject: string[];
    constructor($scope: angular.IScope, parentChild: __parentChild.IParentChildBehaviorService);
    $onInit(): void;
    toggleContent(): void;
    open(): void;
    close: {
        (): boolean;
    };
    private autosave();
    private noList();
}
export declare let simpleCard: angular.IComponentOptions;
