import * as ng from 'angular';
import { BaseDialogService } from './baseDialog/baseDialog.module';
export declare var moduleName: string;
export declare var serviceName: string;
export interface IDialogCloseHandler {
    (explicit: boolean): boolean;
}
export interface IDialogImplementation<TDialogSettings> {
    open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): void;
}
export interface IDialogService<TDialogSettings> {
    open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): void;
}
export declare class DialogService<TDialogSettings> implements IDialogService<TDialogSettings> {
    private dialog;
    constructor(dialog: IDialogImplementation<TDialogSettings>);
    open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): void;
}
export interface IDialogServiceProvider<TDialogSettings> extends ng.IServiceProvider {
    setImplementation(dialogImplementation: IDialogImplementation<TDialogSettings>): void;
    $get(baseDialog: BaseDialogService): IDialogService<TDialogSettings>;
}
export declare function dialogServiceProvider<TDialogSettings>(): IDialogServiceProvider<TDialogSettings>;
