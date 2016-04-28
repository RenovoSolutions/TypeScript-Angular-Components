import * as angular from 'angular';
import { IChild, IParentChildBehaviorService } from '../../services/parentChild/parentchild.service';
import { IAutosaveBehavior } from '../../behaviors/autosave/autosave';
import { ISimpleCardListController } from './simpleCardList';
import { IChangeObject } from '../../types/changes';
export declare var componentName: string;
export declare var controllerName: string;
export interface ISimpleCardBindings {
    onOpen(): void;
    canOpen: boolean;
    alwaysOpen: boolean;
    childLink: IChild<ISimpleCardBehavior>;
    save(): angular.IPromise<void>;
    saveWhenInvalid?: boolean;
}
export interface ISimpleCardScope extends angular.IScope {
    hasFooter: boolean;
}
export interface ISimpleCardBehavior {
    autosave(): boolean;
    close(): boolean;
}
export interface ISimpleCardChanges {
    alwaysOpen: IChangeObject<boolean>;
}
export declare class SimpleCardController implements ISimpleCardBindings {
    private parentChild;
    onOpen: {
        (): void;
    };
    canOpen: boolean;
    alwaysOpen: boolean;
    childLink: IChild<ISimpleCardBehavior>;
    save: {
        (): angular.IPromise<void>;
    };
    saveWhenInvalid: boolean;
    cardType: string;
    showContent: boolean;
    autosaveLink: IChild<IAutosaveBehavior>;
    listController: ISimpleCardListController;
    static $inject: string[];
    constructor(parentChild: IParentChildBehaviorService);
    $onInit(): void;
    $onChanges(changes: ISimpleCardChanges): void;
    toggleContent(): void;
    open(): void;
    close: {
        (): boolean;
    };
    private autosave();
    private noList();
    private updateAlwaysOpen(alwaysOpen);
}
export declare let simpleCard: angular.IComponentOptions;
