'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { ITrigger, Trigger } from './trigger';
import { IListener, IClearListener } from './triggers.service';

export interface OnSubmitSettings {
	setSubmitListener: { (callback: IListener): IClearListener };
}

export class OnSubmitTrigger extends Trigger<OnSubmitSettings> implements ITrigger<OnSubmitSettings> {
	setListener: { (callback: IListener): IClearListener };

	constructor() {
		super('onSubmit');
	}

	setTrigger(autosave: { (): void }): void {
		if (_.isUndefined(this.settings)) {
			return;
		}

		this.initListeners();

		this.setListener((): void => {
			autosave();
		});
	}

	private initListeners(): void {
		this.setListener = this.settings.setSubmitListener || this.nullSetListener;
	}

	private nullSetListener(): IClearListener {
		console.log('No submit listener available');
		return null;
	}
}