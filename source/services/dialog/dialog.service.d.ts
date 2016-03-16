import * as ng from 'angular';
import * as bootstrapModalDialog from './bootstrapModalDialog/bootstrapModalDialog.module';
export { bootstrapModalDialog };
export { directiveName, controllerName, DialogController } from '../../components/dialog/dialog';
export declare let moduleName: string;
export declare let serviceName: string;
export interface IDialogCloseHandler {
    (explicit: boolean): boolean;
}
export interface IDialogScope extends angular.IScope {
    $close(): void;
    $dismiss(): void;
}
export interface IDialogInstance {
    close(): void;
    dismiss(): void;
}
export interface IPromptSettings {
    acceptHandler(): void;
    cancelHandler?: {
        (): void;
    };
    message: string;
    okButton?: string;
    cancelButton?: string;
}
export interface IPromptInstance extends IDialogInstance {
    accept(): void;
    cancel(): void;
}
export interface IDialogImplementation<TDialogSettings> {
    open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance;
    prompt(options: IPromptSettings, template: string): IPromptInstance;
}
export interface IDialogService<TDialogSettings> {
    open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance;
    prompt(options: IPromptSettings): IPromptInstance;
}
export declare class DialogService<TDialogSettings> implements IDialogService<TDialogSettings> {
    private dialog;
    constructor(dialog: IDialogImplementation<TDialogSettings>);
    open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance;
    prompt(options: IPromptSettings): IPromptInstance;
}
export interface IDialogServiceProvider<TDialogSettings> extends ng.IServiceProvider {
    setImplementation(dialogImplementation: IDialogImplementation<TDialogSettings>): void;
    $get(bootstrapModalDialog: bootstrapModalDialog.IBootstrapModalDialogService): IDialogService<TDialogSettings>;
}
export declare function dialogServiceProvider<TDialogSettings>(): IDialogServiceProvider<TDialogSettings>;
