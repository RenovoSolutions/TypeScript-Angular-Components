import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __promise = services.promise;
export declare var moduleName: string;
export declare var componentName: string;
export declare var controllerName: string;
import __object = services.object;
export declare class LongClickButtonController {
    private $interval;
    private $timeout;
    private objectUtility;
    private promise;
    action: {
        (): angular.IPromise<any> | void;
    };
    text: string;
    onShortClickText: string;
    type: string;
    size: string;
    icon: string;
    busy: boolean;
    rightAligned: boolean;
    ngDisabled: boolean;
    private interval;
    duration: number;
    buttonText: string;
    width: number;
    active: boolean;
    actionProgress: number;
    private actionInterval;
    static $inject: string[];
    constructor($scope: angular.IScope, $interval: angular.IIntervalService, $timeout: angular.ITimeoutService, objectUtility: __object.IObjectUtility, promise: __promise.IPromiseUtility);
    startAction(): void;
    stopAction(): void;
    private cleanup();
    private warn();
    private trigger();
}
