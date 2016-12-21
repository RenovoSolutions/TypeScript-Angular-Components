import { Component, Input } from '@angular/core';
import { isBoolean } from 'lodash';
import { Observable } from 'rxjs';

import { DefaultTheme } from '../componentsDefaultTheme';

import { IWaitValue } from '../../services/async/async.service';

export { IWaitValue };

@Component({
	selector: 'rlBusy',
	template: require('./busy.html'),
})
export class BusyComponent {
	@Input() loading: boolean;
	@Input() size: string;

	useDefaultTheme: boolean;

	constructor(defaultTheme: DefaultTheme) {
		this.useDefaultTheme = defaultTheme.useDefaultTheme;
	}

	/*
	 * Public API for triggering the rlBusy to wait on a promise
	 */


	//*************************************************************************
	// Generic one to be used when you don't know the type
	// defaults to waiting for the first next when using Observable or promise
	//*************************************************************************
	waitOn<T>(waitOn: Observable<T> | Promise<T> | boolean): Observable<T> {
		//handle if its null
		if (waitOn == null) {
			return Observable.empty<T>();
		}

		let returnObservable: Observable<T> = Observable.empty<T>();

		//check the type and handle it properly
		switch (typeof waitOn) {
			case 'object':
				returnObservable = this.waitOnObservableCompletion(Observable.from<T>(<any>waitOn));
				break;
			case 'boolean':
				this.setBusy(<boolean>waitOn);
				break;
		}

		return returnObservable;
	}

	//**************************************************************
	// used to stop the spinner on every emission through the stream
	//**************************************************************
	waitOnObservableNext<T>(waitOn: Observable<T>): Observable<T> {
		this.loading = true;
		return waitOn.do(
			() => this.loading = false,
			() => this.loading = false);
	}


	//**************************************************************
	// used to stop the spinner when the stream is completed
	//**************************************************************
	waitOnObservableCompletion<T>(waitOn: Observable<T>): Observable<T> {
		this.loading = true;
		return waitOn.do(
			null,
			() =>  this.loading = false,
			() => this.loading = false);
	}

	//**************************************************************
	// used to force the spinner to stop and start on command
	//**************************************************************
	setBusy(waitOn: boolean): void {
		this.loading = waitOn;
	}

}
