'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { ITrigger, Trigger } from './trigger';
import { IListener, IClearListener } from './triggers.service';

export interface OnChangeSettings {
	form: ng.IFormController;
	setChangeListener: { (callback: IListener): IClearListener };
	debounceDuration?: number;
	saveWhenInvalid?: boolean;
}

export class OnChangeTrigger extends Trigger<OnChangeSettings> implements ITrigger<OnChangeSettings> {
	private debounceDuration: number = 1000;
	private timer: ng.IPromise<void>;
	setListener: { (callback: IListener): IClearListener };
	clearListener: IClearListener;

	constructor(private $rootScope: ng.IRootScopeService, private $timeout: ng.ITimeoutService) {
		super('onChange');
	}

	setTrigger(autosave: { (): void }): void {
		if (_.isUndefined(this.settings)) {
			return;
		}

		this.initListeners();

		this.$rootScope.$watch((): boolean => {
			return this.settings.form != null
				? this.settings.form.$dirty
				: false;
		}, () => { this.triggerSaveAction(autosave); });

		this.$rootScope.$watch((): boolean => {
			return this.settings.form != null
				? this.settings.form.$valid
				: false;
		}, () => { this.triggerSaveAction(autosave); });
	}

	private triggerSaveAction(autosave: {(): void}): void {
		if (this.settings.form.$dirty && (this.settings.form.$valid || this.settings.saveWhenInvalid)) {
			this.setTimer(autosave);

			this.clearListener = this.setListener((): void => {
				this.setTimer(autosave);
			});
		}
	}

	private setTimer(autosave: { (): void }): void {
		if (this.timer != null) {
			this.$timeout.cancel(this.timer);
		}

		this.timer = this.$timeout((): void => {
			this.clearListener();
			autosave();
		}, this.debounceDuration);
	}

	private initListeners(): void {
		this.setListener = this.settings.setChangeListener || this.nullSetListener;
		this.clearListener = this.nullClearListener;
	}

	private nullSetListener(): IClearListener {
		console.log('No change listener available');
		return this.nullClearListener;
	}

	private nullClearListener(): void {
		console.log('No change listener register');
	}
}