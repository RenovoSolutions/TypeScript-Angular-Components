import * as ng from 'angular';
import { services } from 'typescript-angular-utilities';
import { IDialogService } from '../dialog/dialog.service';
export declare var serviceName: string;
import __autosave = services.autosave;
import __promise = services.promise;
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
    formGetter?: {
        (scope: ng.IScope): ng.IFormController;
    };
}
export interface IAutosaveDialogScope extends ng.IScope {
    form?: string;
    formGetter?: {
        (scope: ng.IScope): ng.IFormController;
    };
    setForm(form: ng.IFormController): void;
    dialog: any;
}
export declare class AutosaveDialogService implements IAutosaveDialogService {
    private $rootScope;
    private dialog;
    private autosaveFactory;
    private promise;
    private autosave;
    private data;
    static $inject: string[];
    constructor($rootScope: ng.IRootScopeService, dialog: IDialogService<IAutosaveDialogSettings>, autosaveFactory: __autosave.IAutosaveServiceFactory, promise: __promise.IPromiseUtility);
    open(options: IAutosaveDialogSettings): void;
    private autosaveCloseHandler;
    private setForm;
}
