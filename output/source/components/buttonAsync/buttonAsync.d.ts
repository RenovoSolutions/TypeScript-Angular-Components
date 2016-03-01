import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __promiseUtility = services.promise;
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IButtonBindings {
    busy: boolean;
    action(...params: any[]): angular.IPromise<any> | void;
    size: string;
    type: string;
    ngDisabled: boolean;
    rightAligned: boolean;
}
export declare class ButtonAsyncController {
    private promiseUtility;
    busy: boolean;
    action: {
        (...params: any[]): angular.IPromise<any> | void;
    };
    size: string;
    type: string;
    ngDisabled: boolean;
    rightAligned: boolean;
    static $inject: string[];
    constructor(promiseUtility: __promiseUtility.IPromiseUtility);
    trigger(): void;
    sizeClass: string;
}
