import * as ng from 'angular';
import { services } from 'typescript-angular-utilities';
import __promise = services.promise;
import { IDialogService, IDialogScope } from '../dialog/dialog.service';
import { IAutosaveServiceFactory } from '../autosave/autosave.service';
export declare var serviceName: string;
export interface IAutosaveDialogService {
    open(options: IAutosaveDialogSettings): void;
}
export interface IAutosaveDialogSettings {
    scope?: ng.IScope;
    template?: string;
    templateUrl?: string;
    size?: string;
    data?: any;
    resolve?: any;
    save: {
        (...data: any[]): ng.IPromise<void>;
    };
    validate?: {
        (): boolean;
    };
    form?: string;
    triggers?: string;
    formGetter?: {
        (scope: ng.IScope): ng.IFormController;
    };
}
export interface IAutosaveDialogScope extends IDialogScope {
    form?: string;
    formGetter?: {
        (scope: ng.IScope): ng.IFormController;
    };
    setForm(form: ng.IFormController): void;
    dialog: any;
    $save(): void;
}
export declare class AutosaveDialogService implements IAutosaveDialogService {
    private $rootScope;
    private dialog;
    private autosaveFactory;
    private promise;
    private autosave;
    private data;
    static $inject: string[];
    constructor($rootScope: ng.IRootScopeService, dialog: IDialogService<IAutosaveDialogSettings>, autosaveFactory: IAutosaveServiceFactory, promise: __promise.IPromiseUtility);
    open(options: IAutosaveDialogSettings): void;
    private autosaveCloseHandler;
    private setForm;
}
