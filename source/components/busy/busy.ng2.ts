import { Component, Inject, Input } from '@angular/core';

import { defaultThemeToken } from '../componentsDefaultTheme';

@Component({
	selector: 'rlBusy',
	template: require('./busy.ng2.html'),
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
	trigger(promise: Promise<any>): void {
		this.loading = true;
		Promise.resolve(promise).then(() => this.loading = false);
	}
}