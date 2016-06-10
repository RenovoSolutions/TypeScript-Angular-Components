import { Component, Inject, Input } from '@angular/core';
import { isBoolean } from 'lodash';
import { Observable } from 'rxjs';

import { defaultThemeToken } from '../componentsDefaultTheme';

export type IWaitValue<T> = Observable<T> | Promise<T> | boolean;

@Component({
	moduleId: module.id,
	selector: 'rlBusy',
	templateUrl: 'busy.html',
})
export class BusyComponent {
	@Input() loading: boolean;
	@Input() size: string;

	useDefaultTheme: boolean;

	constructor( @Inject(defaultThemeToken) useDefaultTheme: boolean) {
		this.useDefaultTheme = useDefaultTheme;
	}

	/*
	 * Public API for triggering the rlBusy to wait on a promise
	 */
	trigger(waitOn: IWaitValue<any>): void {
		if (isBoolean(waitOn)) {
			this.loading = waitOn;
			return;
		}

		this.loading = true;
		Observable.from(<Observable<any> | Promise<any>>waitOn).subscribe(() => this.loading = false);
	}
}