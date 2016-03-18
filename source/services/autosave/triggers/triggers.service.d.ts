import { OnChangeSettings } from './onChangeTrigger';
import { OnSubmitSettings } from './onSubmitTrigger';
import { ITrigger } from './trigger';
export * from './onChangeTrigger';
export * from './trigger';
export declare let defaultTriggers: string;
export declare let moduleName: string;
export declare let factoryName: string;
export interface IListener {
    (): void;
}
export interface IClearListener {
    (): void;
}
export interface ITriggers {
    onChange: ITrigger<OnChangeSettings>;
    onSubmit: ITrigger<OnSubmitSettings>;
    none: ITrigger<void>;
}
export interface ITriggerService {
    triggers: ITriggers;
    setTriggers(triggerString: string, autosave: {
        (): void;
    }): void;
}
export interface ITriggerServiceFactory {
    getInstance(): ITriggerService;
}
