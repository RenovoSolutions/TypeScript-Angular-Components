import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __object = services.object;
import { IMessageLogDataService, IMessageLog, IMessageLogFactory, IUser } from './messageLog.service';
export declare var directiveName: string;
export declare var controllerName: string;
export interface IEditableMessageLogBindings {
    pageSize: number;
    service: IMessageLogDataService;
    currentUser?: IUser;
    canDelete?: boolean;
}
export declare class EditableMessageLogController {
    private object;
    pageSize: number;
    service: IMessageLogDataService;
    currentUser: IUser;
    canDelete: boolean;
    messageLogService: IMessageLog;
    newMessage: string;
    busy: boolean;
    savingMessage: boolean;
    static $inject: string[];
    constructor($scope: angular.IScope, messageLogFactory: IMessageLogFactory, object: __object.IObjectUtility);
    add(): angular.IPromise<void>;
}
export declare function editableMessageLog(): angular.IDirective;
