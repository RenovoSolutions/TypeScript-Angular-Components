import * as ng from 'angular';
import { services } from 'typescript-angular-utilities';
import __promise = services.promise;
import { IDialogCloseHandler, IDialogService, IDialogImplementation } from '../dialog.service';
export declare var serviceName: string;
export interface IBaseDialogService extends IDialogService<ng.ui.bootstrap.IModalSettings> {
}
export declare class BaseDialogService implements IDialogImplementation<ng.ui.bootstrap.IModalSettings> {
    private $modal;
    private $rootScope;
    private promise;
    closeHandler: IDialogCloseHandler;
    static $inject: string[];
    constructor($modal: ng.ui.bootstrap.IModalService, $rootScope: ng.IRootScopeService, promise: __promise.IPromiseUtility);
    open(options: ng.ui.bootstrap.IModalSettings, closeHandler?: IDialogCloseHandler): void;
    modalClosing: {
        (event: ng.IAngularEvent, reason: any, explicitlyClosed: boolean): void;
    };
    private configureModalSettings(options, resolveData);
}
