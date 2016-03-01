import * as angular from 'angular';
import * as triggers from './triggers/triggers.service';
export { triggers };
export declare var moduleName: string;
export declare var factoryName: string;
export interface IAutosaveService {
    autosave(...data: any[]): boolean;
    contentForm: angular.IFormController;
}
export interface IAutosaveServiceOptions {
    save: {
        (...data: any[]): angular.IPromise<void>;
    };
    validate?: {
        (): boolean;
    };
    contentForm?: angular.IFormController;
    debounceDuration?: number;
    setChangeListener?: {
        (callback: IChangeListener): IClearChangeListener;
    };
    triggers?: string;
}
export interface IChangeListener {
    (): void;
}
export interface IClearChangeListener {
    (): void;
}
export interface IAutosaveServiceFactory {
    getInstance(options: IAutosaveServiceOptions): IAutosaveService;
}
