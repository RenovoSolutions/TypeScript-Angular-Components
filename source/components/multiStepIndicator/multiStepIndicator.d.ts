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
        (): void;
    };
    stateName?: string;
    isCompleted?: boolean;
    isCurrent?: boolean;
}
export declare class MultiStepIndicatorController {
    private $state;
    private object;
    steps: IStep[];
    static $inject: string[];
    constructor($state: angular.ui.IStateService, object: __object.IObjectUtility);
    private configureSteps();
    private redirectToState;
    private clearCurrentState();
}
