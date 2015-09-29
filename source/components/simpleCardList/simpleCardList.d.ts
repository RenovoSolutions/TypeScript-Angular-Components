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
export declare class SimpleCardListController implements ISimpleCardListController {
    private observable;
    static $inject: string[];
    constructor(observableFactory: __observable.IObservableServiceFactory);
    registerCard(behavior: ISimpleCardBehavior): __observable.IUnregisterFunction;
    openCard(): boolean;
}
export declare function simpleCardList(): angular.IDirective;
