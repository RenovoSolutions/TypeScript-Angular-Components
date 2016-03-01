import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
import __object = services.object;
export interface IStep {
    title: string;
    subtitle?: string;
    onClick?: {
        (): angular.IPromise<void> | void;
    };
    stateName?: string;
    count?: {
        (): number;
    };
    isCompleted?: boolean | {
        (): boolean;
    };
    isValid?: boolean | {
        (): boolean;
    };
    isCurrent?: boolean;
}
export interface IConfiguredStep extends IStep {
    inactive: boolean;
    loading: boolean;
    hasCount: boolean;
    getCompleted(): boolean;
    getValid(): boolean;
}
export declare class MultiStepIndicatorController {
    private $state;
    private $q;
    private object;
    steps: IConfiguredStep[];
    static $inject: string[];
    constructor($state: angular.ui.IStateService, $q: angular.IQService, object: __object.IObjectUtility);
    onClick(step: IConfiguredStep): void;
    anyLoading(): boolean;
    private configureSteps();
    private redirectToState(step);
    private clearCurrentState();
    private getIsCompleted(step);
    private setIsCompleted(step, isCompleted);
    private getIsValid(step);
}
