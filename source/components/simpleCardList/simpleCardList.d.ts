import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __observable = services.observable;
import { ISimpleCardBehavior } from './simpleCard';
export declare var directiveName: string;
export declare var controllerName: string;
export interface ISimpleCardListController {
    registerCard(behavior: ISimpleCardBehavior): __observable.IUnregisterFunction;
    openCard(): boolean;
}
export interface ISimpleCardListAttributes extends angular.IAttributes {
    alwaysOpen: string;
}
export declare class SimpleCardListController implements ISimpleCardListController {
    private observable;
    private alwaysOpen;
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: ISimpleCardListAttributes, $parse: angular.IParseService, observableFactory: __observable.IObservableServiceFactory);
    registerCard(behavior: ISimpleCardBehavior): __observable.IUnregisterFunction;
    openCard(): boolean;
}
export declare function simpleCardList(): angular.IDirective;
