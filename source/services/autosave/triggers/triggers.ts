'use strict';

import * as _ from 'lodash';

export interface ITriggers {
	onChange: ITrigger<void>;
	none: ITrigger<void>;
}

export interface ITrigger<TSettings> {
	setTrigger(triggers: string): void;
	hasMatch(triggers: string): boolean;
	configure(settings: TSettings): void;
	aliases: string[];
}

export class Trigger<TSettings> implements ITrigger<TSettings> {
	private settings: TSettings;
	aliases: string[];

	constructor(aliases: string, private triggerAction: {(settings: TSettings): void}) {
		this.aliases = aliases.split(' ');
	}

	setTrigger(triggers: string): void {
		if (this.hasMatch(triggers)) {
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
	onChange: new Trigger<void>('onChange', null),
	none: new Trigger<void>('none', null),
};
