import * as angular from 'angular';
import { IColumn } from '../../column';
import { CardController } from '../card';
export declare var directiveName: string;
export declare var controllerName: string;
export interface IHeaderScope extends angular.IScope {
    header: HeaderColumnController;
}
export interface IHeaderColumnBindings {
    column: IColumn<any>;
    item: any;
    alias: string;
}
export declare class HeaderColumnController {
    column: IColumn<any>;
    item: any;
    alias: string;
    value: string | number | boolean;
    renderedTemplate: JQuery;
    cardController: CardController;
    $onInit(): void;
    private update;
}
export declare function headerColumn($compile: angular.ICompileService): angular.IDirective;
