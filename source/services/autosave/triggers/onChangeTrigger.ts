'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { ITrigger, Trigger } from './trigger';

export interface OnChangeSettings {
	form: ng.IFormController;
	setChangeListener: { (callback: IChangeListener): IClearChangeListener };
	debounceDuration?: number;
	saveWhenInvalid?: boolean;
}

export interface IChangeListener {
	(): void;
}

export interface IClearChangeListener {
	(): void;
}

export class OnChangeTrigger extends Trigger<OnChangeSettings> implements ITrigger<OnChangeSettings> {
	private debounceDuration: number = 1000;
	private timer: ng.IPromise<void>;
	setChangeListener: { (callback: IChangeListener): IClearChangeListener };
	clearChangeListener: IClearChangeListener;

	constructor(private $rootScope: ng.IRootScopeService, private $timeout: ng.ITimeoutService) {
		super('onChange');
	}

	setTrigger(autosave: { (): void }): void {
		if (_.isUndefined(this.settings)) {
			return;
		}

		this.initChangeListeners();

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
		if (this.settings.form.$dirty && (this.settings.form.$valid) || this.settings.saveWhenInvalid)) {
			this.setTimer(autosave);

			this.clearChangeListener = this.setChangeListener((): void => {
				this.setTimer(autosave);
			});
		}
	}

	private setTimer(autosave: { (): void }): void {
		if (this.timer != null) {
			this.$timeout.cancel(this.timer);
		}

		this.timer = this.$timeout((): void => {
			this.clearChangeListener();
			autosave();
		}, this.debounceDuration);
	}

	private initChangeListeners(): void {
		this.setChangeListener = this.settings.setChangeListener || this.nullSetListener;
		this.clearChangeListener = this.nullClearListener;
	}

	private nullSetListener(): IClearChangeListener {
		console.log('No change listener available');
		return this.nullClearListener;
	}

	private nullClearListener(): void {
		console.log('No change listener register');
	}
}