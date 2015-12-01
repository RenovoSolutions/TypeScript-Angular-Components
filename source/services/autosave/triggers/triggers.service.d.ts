import * as angular from 'angular';
import { OnChangeSettings } from './onChangeTrigger';
import { ITrigger } from './trigger';
export * from './onChangeTrigger';
export * from './trigger';
export declare let defaultTriggers: string;
export declare let moduleName: string;
export declare let serviceName: string;
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
export declare class TriggerService implements ITriggerService {
    triggers: ITriggers;
    static $inject: string[];
    constructor($rootScope: angular.IRootScopeService, $timeout: angular.ITimeoutService);
    setTriggers(triggerString: string, autosave: {
        (): void;
    }): void;
}
