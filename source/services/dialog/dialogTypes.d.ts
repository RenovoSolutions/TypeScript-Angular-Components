import * as angular from 'angular';
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
    validateAndNotify(): void;
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
export interface IAutosaveDialogSettings {
    scope?: ng.IScope;
    template?: string;
    templateUrl?: string;
    size?: string;
    data?: any;
    resolve?: any;
    save: {
        (...data: any[]): angular.IPromise<void>;
    };
    triggers?: string;
}
export interface IDialogSettings {
    scope?: ng.IScope;
    template?: string;
    templateUrl?: string;
    size?: string;
    data?: any;
    controller?: string;
    controllerAs?: string;
    bindToController?: boolean;
}
export interface IAutosaveDialogInstance extends IDialogInstance {
    save(): void;
    saveAndClose(): void;
}
export interface IAutosaveDialogScope extends IDialogScope {
    $save(): void;
    $saveAndClose(): void;
    dialog: any;
}
export interface IPromptInstance extends IDialogInstance {
    accept(): void;
    cancel(): void;
}
export interface IDialogImplementation<TDialogSettings> {
    open(options: TDialogSettings, closeHandler?: IDialogCloseHandler): IDialogInstance;
    prompt(options: IPromptSettings, template: string): IPromptInstance;
}
