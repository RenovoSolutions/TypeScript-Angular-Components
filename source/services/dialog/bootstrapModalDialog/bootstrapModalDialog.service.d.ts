import * as ng from 'angular';
import { IPromiseUtility } from '../../promise/promise.service';
import { IDialogCloseHandler, IDialogService, IDialogImplementation, IDialogInstance, IPromptSettings, IPromptInstance } from '../dialog.service';
export declare var serviceName: string;
export interface IBootstrapModalDialogService extends IDialogService<IBootstrapModalDialogSettings> {
}
export interface IBootstrapModalDialogSettings extends ng.ui.bootstrap.IModalSettings {
    resolveToDialog?: boolean;
    dialogAs?: string;
}
export interface IPromptScope extends ng.IScope {
    prompt: IPromptSettings;
    $accept(): void;
    $cancel(): void;
    $close(): void;
    $dismiss(): void;
}
export declare class BootstrapModalDialogService implements IDialogImplementation<IBootstrapModalDialogSettings> {
    private $modal;
    private $rootScope;
    private promise;
    closeHandler: IDialogCloseHandler;
    static $inject: string[];
    constructor($modal: ng.ui.bootstrap.IModalService, $rootScope: ng.IRootScopeService, promise: IPromiseUtility);
    open(options: IBootstrapModalDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance;
    prompt(options: IPromptSettings, template: string): IPromptInstance;
    modalClosing: {
        (event: ng.IAngularEvent, reason: any, explicitlyClosed: boolean): void;
    };
    private configureModalSettings(options, resolveData);
}
