import * as angular from 'angular';
import * as Rx from 'rxjs';
import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import __object = services.object;
import { IAutosaveBehavior } from '../../../behaviors/autosave/autosave';
import { IDataSource } from '../dataSources/dataSource';
import { IColumn } from '../column';
import { CardContainerController } from '../cardContainer';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
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
    private $element;
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
    cardContainer: CardContainerController;
    refresh: Rx.Subject<void>;
    static $inject: string[];
    constructor($scope: ICardScope, $controller: angular.IControllerService, $q: angular.IQService, $element: angular.IAugmentedJQuery, parentChild: __parentChild.IParentChildBehaviorService, object: __object.IObjectUtility);
    toggleContent(): void;
    validateCard(): boolean;
    saveCard(): angular.IPromise<void>;
    clickCard(): void;
    $postLink(): void;
    private autosave;
    private open();
    private setSelected(value);
}
