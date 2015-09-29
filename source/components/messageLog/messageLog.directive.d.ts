import * as ng from 'angular';
import { IMessageLogDataService, IMessageLog, IMessage, IMessageLogFactory } from './messageLog.service';
export declare var directiveName: string;
export declare var controllerName: string;
export interface IMessageLogBindings {
    pageSize: number;
    service: IMessageLogDataService;
    messageLogBinding: IMessageLog;
}
export declare class MessageLogController {
    pageSize: number;
    service: IMessageLogDataService;
    messageLogBinding: IMessageLog;
    messages: IMessage[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    messageLog: IMessageLog;
    loading: boolean;
    loadingInitial: boolean;
    static $inject: string[];
    constructor($scope: ng.IScope, messageLogFactory: IMessageLogFactory);
    getOlder(): ng.IPromise<void>;
    getTop(): ng.IPromise<void>;
}
export declare function messageLog(): ng.IDirective;
