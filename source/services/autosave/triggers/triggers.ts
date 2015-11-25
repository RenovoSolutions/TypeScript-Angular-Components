'use strict';

import * as _ from 'lodash';

import { OnChangeTrigger, OnChangeSettings } from './onChangeTrigger';

export * from './onChangeTrigger';

export interface ITriggers {
	onChange: ITrigger<OnChangeSettings>;
	none: ITrigger<void>;
}

export interface ITrigger<TSettings> {
	setTrigger(autosave: { (): void }): void;
	hasMatch(triggers: string): boolean;
	configure(settings: TSettings): void;
	aliases: string[];
}

export class Trigger<TSettings> implements ITrigger<TSettings> {
	protected settings: TSettings;
	aliases: string[];

	constructor(aliases: string, private triggerAction?: {(settings: TSettings): void}) {
		this.aliases = aliases.split(' ');
	}

	setTrigger(autosave: { (): void }): void {
		if (_.isFunction(this.triggerAction)) {
			this.triggerAction(this.settings);
		}
	}

	hasMatch(triggers: string): boolean {
		let triggerList: string[] = triggers.split(' ');
		return _.any(triggerList, (trigger: string): boolean => {
			return _.any(this.aliases, (alias: string): boolean => {
				return trigger === alias;
			});
		});
	}

	configure(settings: TSettings): void {
		this.settings = settings;
	}
}

export let triggers: ITriggers = {
	onChange: new OnChangeTrigger(),
	none: new Trigger<void>('none'),
};

export function setTriggers(triggerString: string, autosave: {(): void}): void {
	_.each(<any>triggers, (trigger: ITrigger<any>): void => {
		if (trigger.hasMatch(triggerString)) {
			trigger.setTrigger(autosave);
		}
	});
}
