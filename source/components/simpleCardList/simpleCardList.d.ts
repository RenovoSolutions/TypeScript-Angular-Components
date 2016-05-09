import * as angular from 'angular';
import { Subject } from 'rxjs';
import { ISimpleCardBehavior } from './simpleCard';
export declare var directiveName: string;
export declare var controllerName: string;
export interface ISimpleCardListController {
    alwaysOpenChanges: Subject<boolean>;
    registerCard(behavior: ISimpleCardBehavior): void;
    openCard(): boolean;
}
export interface ISimpleCardListAttributes extends angular.IAttributes {
    alwaysOpen: string;
}
export declare class SimpleCardListController implements ISimpleCardListController {
    alwaysOpenChanges: Subject<boolean>;
    alwaysOpen: boolean;
    cards: ISimpleCardBehavior[];
    static $inject: string[];
    constructor($scope: angular.IScope, $attrs: ISimpleCardListAttributes, $parse: angular.IParseService);
    registerCard(behavior: ISimpleCardBehavior): void;
    openCard(): boolean;
    alwaysOpenChange(value: boolean): void;
}
export declare function simpleCardList(): angular.IDirective;
