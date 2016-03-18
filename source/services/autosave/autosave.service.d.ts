import * as angular from 'angular';
import * as triggers from './triggers/triggers.service';
import { IFormValidator } from '../../types/formValidators';
export { triggers };
export declare var moduleName: string;
export declare var factoryName: string;
export interface IAutosaveService {
    autosave(...data: any[]): boolean;
    contentForm: IFormValidator;
}
export interface IAutosaveServiceOptions {
    save: {
        (...data: any[]): angular.IPromise<void>;
    };
    contentForm?: IFormValidator;
    debounceDuration?: number;
    setChangeListener?: {
        (callback: IChangeListener): IClearChangeListener;
    };
    triggers?: string;
    saveWhenInvalid?: boolean;
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
