/// <reference path="../../../../typings/jquery/jquery.d.ts" />
import * as angular from 'angular';
import { ISortDirections } from '../sorts/sortDirection';
import { IColumn } from '../column';
export declare var moduleName: string;
export declare var directiveName: string;
export interface ICardColumnHeaderScope extends angular.IScope {
    column: IColumn;
    sorting: string;
    sort(): void;
    renderedTemplate: JQuery;
    sortDirection: ISortDirections;
}
export declare function cardColumnHeader($compile: angular.ICompileService): angular.IDirective;
