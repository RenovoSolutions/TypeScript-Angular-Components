import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import { IMessageLogDataService, IMessageLog, IMessageLogFactory } from './messageLog.service';
export declare var directiveName: string;
export declare var controllerName: string;
import __object = services.object;
export interface IEditableMessageLogBindings {
    pageSize: number;
    service: IMessageLogDataService;
}
export declare class EditableMessageLogController {
    private object;
    pageSize: number;
    service: IMessageLogDataService;
    messageLogService: IMessageLog;
    newMessage: string;
    busy: boolean;
    savingMessage: boolean;
    static $inject: string[];
    constructor($scope: angular.IScope, messageLogFactory: IMessageLogFactory, object: __object.IObjectUtility);
    add(): angular.IPromise<void>;
}
export declare function editableMessageLog(): angular.IDirective;
