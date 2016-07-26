import { Injectable } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __timeout = services.timeout;
import __digest = services.digestService;

import { AsyncHelper, IWaitValue } from '../async/async.service';

export const COMPLETE_MESSAGE_DURATION: number = 1000;

export interface IAutosaveActionService {
	trigger(promise: Promise<any>): void;
	saving: boolean;
	complete: boolean;
	successful: boolean;
}

@Injectable()
export class AutosaveActionService implements IAutosaveActionService {
	timeoutService: __timeout.TimeoutService;
	asyncService: AsyncHelper;
	digestService: __digest.IDigestService;

	constructor(timeoutService: __timeout.TimeoutService
			, asyncService: AsyncHelper
			, digestService: __digest.DigestService) {
		this.timeoutService = timeoutService;
		this.asyncService = asyncService;
		this.digestService = digestService;
	}

	private _saving: boolean;
	private _complete: boolean;
	private _successful: boolean;

	get saving(): boolean {
		return this._saving;
	}

	get complete(): boolean {
		return this._complete;
	}

	get successful(): boolean {
		return this._successful;
	}

	trigger(waitOn: IWaitValue<any>): void {
		this._saving = true;
		this.asyncService.waitAsObservable(waitOn)
			.subscribe(this.autosaveSuccessful, this.autosaveFailed);
	}

	private autosaveSuccessful = (): void => {
		this.resolveAutosave(true);
	}

	private autosaveFailed = (): void => {
		this.resolveAutosave(false);
	}

	private resolveAutosave = (success: boolean): void => {
		this._saving = false;
		this._complete = true;
		this._successful = success;

		this.timeoutService.setTimeout(() => {
			this._complete = false;
			// remove this once ng1 goes away
			this.digestService.runDigestCycle();
		}, COMPLETE_MESSAGE_DURATION);
	}
}
