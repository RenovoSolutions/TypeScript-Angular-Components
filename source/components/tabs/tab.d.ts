import * as ng from 'angular';
import { ITabHeader } from './tabset';
export declare let directiveName: string;
export declare let controllerName: string;
export interface ITabScope extends ng.IScope {
    tabForm: ng.IFormController;
    hasFooter: boolean;
}
export declare class TabController {
    header: ITabHeader;
    static $inject: string[];
    constructor($scope: ng.IScope);
}
export declare function tab(): ng.IDirective;
