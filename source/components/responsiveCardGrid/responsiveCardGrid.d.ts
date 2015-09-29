import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import { IBreakpointService } from '../../services/breakpoints/breakpoints.module';
import { ICardBehavior } from './responsiveCard';
export declare var directiveName: string;
export declare var controllerName: string;
import __observable = services.observable;
import __numberUtility = services.number;
export interface IResponsiveCardGridController {
    registerCard(behavior: ICardBehavior, element: angular.IAugmentedJQuery): __observable.IUnregisterFunction;
    openCard(openingCard: IIndexedCardBehavior): void;
    closeCard(): void;
    hoverIn(currentCard: IIndexedCardBehavior): void;
    hoverOut(): void;
    cardIsEndOfRow(currentCard: IIndexedCardBehavior): boolean;
}
export interface IResponsiveCardGridBindings {
    startingIndex: number;
    fillEmptySpace: boolean;
}
export interface IIndexedCardBehavior extends ICardBehavior {
    index: number;
}
export declare class ResponsiveCardGridController implements IResponsiveCardGridController {
    private $q;
    private breakpoints;
    private numberUtility;
    startingIndex: number;
    findPosition: {
        (element: angular.IAugmentedJQuery): number;
    };
    static $inject: string[];
    constructor(observableFactory: __observable.IObservableServiceFactory, $q: angular.IQService, breakpoints: IBreakpointService, numberUtility: __numberUtility.INumberUtility);
    private observable;
    emptyCards: number[];
    behaviors: IIndexedCardBehavior[];
    registerCard(behavior: ICardBehavior, element: angular.IAugmentedJQuery): __observable.IUnregisterFunction;
    openCard(openingCard: IIndexedCardBehavior): void;
    closeCard(): void;
    private autosaveCard();
    hoverIn(currentCard: IIndexedCardBehavior): void;
    hoverOut(): void;
    cardIsEndOfRow(currentCard: IIndexedCardBehavior): boolean;
    private updateCardEndOfRowStatus;
    private getCurrentRow(index);
    private cardsPerRow;
    private breakpointRowDictionary;
}
export declare function responsiveCardGrid(): angular.IDirective;
