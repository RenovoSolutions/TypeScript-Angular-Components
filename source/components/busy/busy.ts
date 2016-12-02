import { Component, Input } from '@angular/core';
import { isBoolean } from 'lodash';
import { Observable } from 'rxjs';

import { DefaultTheme } from '../componentsDefaultTheme';
import { AsyncHelper, IWaitValue } from '../../services/async/async.service';

export { IWaitValue };

@Component({
	selector: 'rlBusy',
	template: require('./busy.html'),
})
export class BusyComponent {
	@Input() loading: boolean;
	@Input() size: string;

	useDefaultTheme: boolean;
	asyncHelper: AsyncHelper;

	constructor(defaultTheme: DefaultTheme
		, asyncHelper: AsyncHelper) {
		this.useDefaultTheme = defaultTheme.useDefaultTheme;
		this.asyncHelper = asyncHelper;
	}

	/*
	 * Public API for triggering the rlBusy to wait on a promise
	 */
	waitOn<T>(waitOn: IWaitValue<T>): Observable<T> {
		if (waitOn == null) {
			return Observable.empty<T>();
		}

		if (isBoolean(waitOn)) {
			this.loading = waitOn;
			return Observable.of<any>(waitOn);
		}

		this.loading = true;
		return this.asyncHelper.waitAsObservable(waitOn)
			.do(null, () => this.loading = false, () => this.loading = false);
	}
}
