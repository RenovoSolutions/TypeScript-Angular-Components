import * as ng from 'angular';
import { ITrigger, Trigger } from './trigger';
import { IListener, IClearListener } from './triggers.service';
export interface OnChangeSettings {
    form: ng.IFormController;
    setChangeListener: {
        (callback: IListener): IClearListener;
    };
    debounceDuration?: number;
    saveWhenInvalid?: boolean;
}
export declare class OnChangeTrigger extends Trigger<OnChangeSettings> implements ITrigger<OnChangeSettings> {
    private $rootScope;
    private $timeout;
    private debounceDuration;
    private timer;
    setListener: {
        (callback: IListener): IClearListener;
    };
    clearListener: IClearListener;
    constructor($rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService);
    setTrigger(autosave: {
        (): void;
    }): void;
    private triggerSaveAction(autosave);
    private setTimer(autosave);
    private initListeners();
    private nullSetListener();
    private nullClearListener();
}
