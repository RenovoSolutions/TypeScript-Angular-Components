import * as angular from 'angular';
import * as _ from 'lodash';

import { OnChangeTrigger, OnChangeSettings } from './onChangeTrigger';
import { ITrigger, Trigger } from './trigger';

export * from './onChangeTrigger';
export * from './trigger';

export let defaultTriggers: string = 'onChange';

export let moduleName: string = 'rl.ui.services.autosave.triggers';
export let factoryName: string = 'autosaveTriggers';

export interface IListener {
	(): void;
}

export interface IClearListener {
	(): void;
}

export interface ITriggers {
	onChange: ITrigger<OnChangeSettings>;
	none: ITrigger<void>;
}

export interface ITriggerService {
	triggers: ITriggers;
	setTriggers(triggerString: string, autosave: { (): void }): void;
}

class TriggerService implements ITriggerService {
	triggers: ITriggers;

	constructor($rootScope: angular.IRootScopeService, $timeout: angular.ITimeoutService) {
		this.triggers = {
			onChange: new OnChangeTrigger($rootScope, $timeout),
			none: new Trigger<void>('none'),
		};
	}

	setTriggers(triggerString: string, autosave: {(): void}): void {
		if (triggerString == null) {
			triggerString = defaultTriggers;
		}

		_.each(<any>this.triggers, (trigger: ITrigger<any>): void => {
			if (trigger.hasMatch(triggerString)) {
				trigger.setTrigger(autosave);
			}
		});
	}
}

export interface ITriggerServiceFactory {
	getInstance(): ITriggerService;
}

triggerServiceFactory.$inject = ['$rootScope', '$timeout'];
function triggerServiceFactory($rootScope: angular.IRootScopeService, $timeout: angular.ITimeoutService): ITriggerServiceFactory {
	return {
		getInstance(): ITriggerService {
			return new TriggerService($rootScope, $timeout);
		},
	};
}

angular.module(moduleName, [])
	.factory(factoryName, triggerServiceFactory);
