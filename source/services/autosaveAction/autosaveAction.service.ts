import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import TimeoutService = services.timeout.TimeoutService;

import { AsyncHelper, IWaitValue } from '../async/async.service';

export const COMPLETE_MESSAGE_DURATION: number = 1000;

export interface IAutosaveActionService {
	waitOn(waitOn: IWaitValue<any>): Observable<any>;
	saving$: Observable<boolean>;
	complete$: Observable<boolean>;
	successful$: Observable<boolean>;
}

@Injectable()
export class AutosaveActionService implements IAutosaveActionService {
	timeoutService: TimeoutService;
	asyncService: AsyncHelper;

	constructor(timeoutService: TimeoutService
			, asyncService: AsyncHelper) {
		this.timeoutService = timeoutService;
		this.asyncService = asyncService;
		this._saving$ = new BehaviorSubject(false);
		this._complete$ = new BehaviorSubject(false);
		this._successful$ = new BehaviorSubject(false);
	}

	private _saving$: BehaviorSubject<boolean>;
	private _complete$: BehaviorSubject<boolean>;
	private _successful$: BehaviorSubject<boolean>;

	get saving$(): Observable<boolean> {
		return this._saving$.asObservable();
	}

	get complete$(): Observable<boolean> {
		return this._complete$.asObservable();
	}

	get successful$(): Observable<boolean> {
		return this._successful$.asObservable();
	}

	waitOn(waitOn: IWaitValue<any>): Observable<any> {
		this._saving$.next(true);
		return this.asyncService.waitAsObservable(waitOn)
			.do(this.autosaveSuccessful, this.autosaveFailed);
	}

	private autosaveSuccessful = (): void => {
		this.resolveAutosave(true);
	}

	private autosaveFailed = (): void => {
		this.resolveAutosave(false);
	}

	private resolveAutosave = (success: boolean): void => {
		this._saving$.next(false);
		this._complete$.next(true);
		this._successful$.next(success);

		this.timeoutService.setTimeout(() => this._complete$.next(false), COMPLETE_MESSAGE_DURATION);
	}
}
