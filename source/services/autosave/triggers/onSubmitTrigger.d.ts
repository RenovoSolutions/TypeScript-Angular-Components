import { ITrigger, Trigger } from './trigger';
import { IListener, IClearListener } from './triggers.service';
export interface OnSubmitSettings {
    setSubmitListener: {
        (callback: IListener): IClearListener;
    };
}
export declare class OnSubmitTrigger extends Trigger<OnSubmitSettings> implements ITrigger<OnSubmitSettings> {
    setListener: {
        (callback: IListener): IClearListener;
    };
    constructor();
    setTrigger(autosave: {
        (): void;
    }): void;
    private initListeners();
    private nullSetListener();
}
