import * as angular from 'angular';
import * as triggers from './triggers/triggers.service';
import { IFormValidator } from '../../types/formValidators';
export { triggers };
export declare var moduleName: string;
export declare var factoryName: string;
export interface IAutosaveService {
    autosave(...data: any[]): boolean;
    validateAndSave(...data: any[]): angular.IPromise<void> | boolean;
    contentForm: IFormValidator;
}
export interface IAutosaveServiceOptions {
    save: {
        (...data: any[]): angular.IPromise<void>;
    };
    contentForm?: IFormValidator;
    debounceDuration?: number;
    setChangeListener?: {
        (callback: triggers.IListener): triggers.IClearListener;
    };
    triggers?: string;
    saveWhenInvalid?: boolean;
}
export interface IAutosaveServiceFactory {
    getInstance(options: IAutosaveServiceOptions): IAutosaveService;
}
