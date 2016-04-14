import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
import __promise = services.promise;
import __notification = services.notification;
import * as bootstrapModalDialog from './bootstrapModalDialog/bootstrapModalDialog.module';
import * as types from './dialogTypes';
import { IAutosaveServiceFactory } from '../autosave/autosave.service';
import { IFormService } from '../form/form.service';
import { IFormValidator } from '../../types/formValidators';
export { bootstrapModalDialog };
export { componentName, controllerName, DialogController } from '../../components/dialog/dialog';
export * from './dialogTypes';
export declare const moduleName: string;
export declare const serviceName: string;
export interface IDialogService<TDialogSettings> {
    open(options: TDialogSettings, closeHandler?: types.IDialogCloseHandler): types.IDialogInstance;
    prompt(options: types.IPromptSettings): types.IPromptInstance;
    openForm(options: types.IAutosaveDialogSettings): types.IAutosaveDialogInstance;
}
export declare class DialogService<TDialogSettings> implements IDialogService<TDialogSettings> {
    private dialog;
    private $rootScope;
    private autosaveFactory;
    private promise;
    private notification;
    private formService;
    private autosave;
    private data;
    private form;
    constructor(dialog: types.IDialogImplementation<TDialogSettings>, $rootScope: angular.IRootScopeService, autosaveFactory: IAutosaveServiceFactory, promise: __promise.IPromiseUtility, notification: __notification.INotificationService, formService: IFormService);
    open(options: TDialogSettings, closeHandler?: types.IDialogCloseHandler): types.IDialogInstance;
    prompt(options: types.IPromptSettings): types.IPromptInstance;
    openForm(options: types.IAutosaveDialogSettings): types.IAutosaveDialogInstance;
    private autosaveCloseHandler;
    setForm(form: IFormValidator): void;
}
export interface IDialogServiceProvider<TDialogSettings> extends angular.IServiceProvider {
    setImplementation(dialogImplementation: types.IDialogImplementation<TDialogSettings>): void;
    $get(bootstrapModalDialog: bootstrapModalDialog.IBootstrapModalDialogService, $rootScope: angular.IRootScopeService, autosaveFactory: IAutosaveServiceFactory, promise: __promise.IPromiseUtility, notification: __notification.INotificationService, formService: IFormService): IDialogService<TDialogSettings>;
}
export declare function dialogServiceProvider<TDialogSettings>(): IDialogServiceProvider<TDialogSettings>;
