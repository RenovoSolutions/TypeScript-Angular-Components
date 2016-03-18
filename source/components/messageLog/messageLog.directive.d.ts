import * as ng from 'angular';
import { services } from 'typescript-angular-utilities';
import __object = services.object;
import { IJQueryUtility } from '../../services/jquery/jquery.service';
import { IMessageLogDataService, IMessageLog, IMessage, IMessageLogFactory, IUser } from './messageLog.service';
import * as componentServices from '../../services/services.module';
import __dialog = componentServices.dialog;
import { ITemplateLoader } from '../../services/templateLoader/templateLoader.service';
export declare var directiveName: string;
export declare var controllerName: string;
export declare enum DeletePermissions {
    deleteMine = 0,
    deleteAll = 1,
    deleteNone = 2,
}
export declare enum EditPermissions {
    editMine = 0,
    editAll = 1,
    editNone = 2,
}
export interface IMessageLogBindings {
    pageSize: number;
    service: IMessageLogDataService;
    messageLogBinding: IMessageLog;
    messageAs: string;
    currentUser?: IUser;
    canDelete?: DeletePermissions;
    canEdit?: EditPermissions;
    selector: {
        (IMessage: any): any;
    } | string;
}
export declare class MessageLogController implements IMessageLogBindings {
    private dialog;
    pageSize: number;
    service: IMessageLogDataService;
    messageLogBinding: IMessageLog;
    messageAs: string;
    selector: {
        (iMessage: IMessage): any;
    } | string;
    currentUser: IUser;
    canDelete: DeletePermissions;
    canEdit: EditPermissions;
    messages: IMessage[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    messageLog: IMessageLog;
    templates: any;
    loading: boolean;
    loadingInitial: boolean;
    static $inject: string[];
    constructor(dialog: __dialog.IDialogService<any>, $scope: ng.IScope, messageLogFactory: IMessageLogFactory);
    getEntrySelector(entry: IMessage): any;
    getOlder(): ng.IPromise<void>;
    getTop(): ng.IPromise<void>;
    canDeleteEntry(entry: IMessage): boolean;
    canEditEntry(entry: IMessage): boolean;
    editMessage(entry: IMessage): void;
    updateNote(data: any): ng.IPromise<void>;
    saveNote(data: any): ng.IPromise<void>;
}
export declare function messageLog($interpolate: angular.IInterpolateService, jquery: IJQueryUtility, templateLoader: ITemplateLoader, object: __object.IObjectUtility): angular.IDirective;
