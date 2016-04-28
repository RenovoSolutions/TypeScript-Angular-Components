import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __notification = services.notification;
import { IPromiseUtility } from '../../services/promise/promise.service';
import { ButtonAsyncController } from '../buttonAsync/buttonAsync';
export declare let moduleName: string;
export declare let componentName: string;
export declare let controllerName: string;
export declare class LongClickButtonController extends ButtonAsyncController {
    private $interval;
    private $timeout;
    private objectUtility;
    private notification;
    warning: string;
    text: string;
    onShortClickText: string;
    icon: string;
    duration: number;
    active: boolean;
    private actionTimeout;
    static $inject: string[];
    constructor($interval: angular.IIntervalService, $timeout: angular.ITimeoutService, objectUtility: __object.IObjectUtility, promise: IPromiseUtility, notification: __notification.INotificationService);
    startAction(): void;
    stopAction(): void;
    private cleanup();
    private warn();
}
