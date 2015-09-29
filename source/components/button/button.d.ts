import * as angular from 'angular';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
export interface IButtonScope extends angular.IScope {
    busy: boolean;
    action(...params: any[]): angular.IPromise<any>;
    action(...params: any[]): void;
    size: string;
}
export interface IButtonController {
    busy: boolean;
    trigger(): void;
}
