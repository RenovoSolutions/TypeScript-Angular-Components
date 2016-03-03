import { OnChangeSettings } from './onChangeTrigger';
import { ITrigger } from './trigger';
export * from './onChangeTrigger';
export * from './trigger';
export declare let defaultTriggers: string;
export declare let moduleName: string;
export declare let factoryName: string;
export interface ITriggers {
    onChange: ITrigger<OnChangeSettings>;
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
