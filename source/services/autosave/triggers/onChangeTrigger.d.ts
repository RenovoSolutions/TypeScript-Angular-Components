import * as ng from 'angular';
import { ITrigger, Trigger } from './trigger';
export interface OnChangeSettings {
    form: ng.IFormController;
    setChangeListener: {
        (callback: IChangeListener): IClearChangeListener;
    };
    debounceDuration?: number;
}
export interface IChangeListener {
    (): void;
}
export interface IClearChangeListener {
    (): void;
}
export declare class OnChangeTrigger extends Trigger<OnChangeSettings> implements ITrigger<OnChangeSettings> {
    private $rootScope;
    private $timeout;
    private debounceDuration;
    private timer;
    setChangeListener: {
        (callback: IChangeListener): IClearChangeListener;
    };
    clearChangeListener: IClearChangeListener;
    constructor($rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService);
    setTrigger(autosave: {
        (): void;
    }): void;
    private triggerSaveAction(autosave);
    private setTimer(autosave);
    private initChangeListeners();
    private nullSetListener();
    private nullClearListener();
}
