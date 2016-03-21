import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import __object = services.object;
import { IAutosaveBehavior } from '../../../behaviors/autosave/autosave';
import { IDataSource } from '../dataSources/dataSource';
import { IColumn } from '../column';
import { CardContainerController } from '../cardContainer';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface ICardBindings {
    columns: IColumn<any>[];
    item: any;
    clickable: boolean;
    source: IDataSource<any>;
    containerData: any;
    cardController: string;
    cardControllerAs: string;
    cardAs: string;
    permanentFooter: boolean;
    selectable: boolean;
    selectionChanged(): void;
}
export interface ICardScope extends angular.IScope {
    collapse(): void;
    setSelected(value: boolean): void;
    refresh(): void;
    remove(): void;
    containerData: any;
    __rlCardContainer: CardContainerController;
    __setHasBody(hasBody: boolean): void;
    __setHasFooter(hasFooter: boolean): void;
}
export interface ICardBehavior {
    close(): boolean;
}
export interface ICardChildBehavior {
    initCard?: {
        (): void;
    };
    validateCard?: {
        (): boolean;
    };
    saveCard?: {
        (): angular.IPromise<void>;
    };
    clickCard?: {
        (): void;
    };
}
export declare class CardController {
    private $scope;
    private $q;
    private parentChild;
    columns: IColumn<any>[];
    item: any;
    clickable: boolean;
    source: IDataSource<any>;
    containerData: any;
    cardController: string;
    cardControllerAs: string;
    cardAs: string;
    permanentFooter: boolean;
    selectable: boolean;
    selectionChanged: {
        (): void;
    };
    saveWhenInvalid: boolean;
    showContent: boolean;
    dirty: boolean;
    autosaveLink: __parentChild.IChild<IAutosaveBehavior>;
    hasBody: boolean;
    hasFooter: boolean;
    static $inject: string[];
    constructor($scope: ICardScope, $controller: angular.IControllerService, $q: angular.IQService, parentChild: __parentChild.IParentChildBehaviorService, object: __object.IObjectUtility);
    toggleContent(): void;
    validateCard(): boolean;
    saveCard(): angular.IPromise<void>;
    clickCard(): void;
    private autosave;
    private open();
    private setSelected(value);
}
export declare function card(): angular.IDirective;
