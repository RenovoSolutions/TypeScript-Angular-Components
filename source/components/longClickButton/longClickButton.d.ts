import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
export declare var moduleName: string;
export declare var directiveName: string;
export declare var controllerName: string;
import __object = services.object;
export declare class LongClickButtonController {
    private $interval;
    private $timeout;
    private objectUtility;
    onTriggered: {
        (): void;
    };
    text: string;
    onShortClickText: string;
    buttonType: string;
    private interval;
    duration: number;
    buttonText: string;
    buttonClass: string;
    width: number;
    active: boolean;
    actionProgress: number;
    private actionInterval;
    static $inject: string[];
    constructor($scope: angular.IScope, $interval: angular.IIntervalService, $timeout: angular.ITimeoutService, objectUtility: __object.IObjectUtility);
    startAction(): void;
    stopAction(): void;
    private cleanup();
    private warn();
}
