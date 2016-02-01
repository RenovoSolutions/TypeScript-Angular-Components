'use strict';

import * as _ from 'lodash';

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
		return _.some(triggerList, (trigger: string): boolean => {
			return _.some(this.aliases, (alias: string): boolean => {
				return trigger === alias;
			});
		});
	}

	configure(settings: TSettings): void {
		this.settings = settings;
	}
}