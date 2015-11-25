'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { OnChangeTrigger, OnChangeSettings } from './onChangeTrigger';
import { ITrigger, Trigger } from './trigger';

export * from './onChangeTrigger';

export let defaultTriggers: string = 'onChange';

export let moduleName: string = 'rl.ui.services.autosave.triggers';
export let serviceName: string = 'autosaveTriggers';

export interface ITriggers {
	onChange: ITrigger<OnChangeSettings>;
	none: ITrigger<void>;
}

export interface ITriggerService {
	triggers: ITriggers;
	setTriggers(triggerString: string, autosave: { (): void }): void;
}

export class TriggerService implements ITriggerService {
	triggers: ITriggers;

	static $inject: string[] = ['$rootScope', '$timeout'];
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

angular.module(moduleName, [])
	.service(serviceName, TriggerService);
