import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __promiseUtility = services.promise;
import { ButtonController } from '../button/button';
export declare const moduleName: string;
export declare const componentName: string;
export declare const controllerName: string;
export interface IButtonBindings {
    busy: boolean;
    action(...params: any[]): angular.IPromise<any> | void;
    size: string;
    type: string;
    ngDisabled: boolean;
    rightAligned: boolean;
}
export declare class ButtonAsyncController extends ButtonController {
    private promiseUtility;
    busy: boolean;
    action: {
        (...params: any[]): angular.IPromise<any> | void;
    };
    rightAligned: boolean;
    static $inject: string[];
    constructor(promiseUtility: __promiseUtility.IPromiseUtility);
    trigger(): void;
}
