import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __object = services.object;
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface ICommaListAttrs extends angular.IAttributes {
    transform: string;
}
export interface ITransformParam {
    item: any;
}
export declare class CommaListController {
    inList: any[];
    list: any[];
    transform: {
        (param: ITransformParam): string;
    };
    hasTransform: boolean;
    max: number;
    remainingItems: number;
    static $inject: string[];
    constructor($attrs: ICommaListAttrs, object: __object.IObjectUtility);
    private getFirstItems(list);
}
