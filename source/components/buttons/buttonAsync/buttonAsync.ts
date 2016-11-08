import { Component, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BusyComponent, IWaitValue } from '../../busy/busy';
import { BaseButtonComponent, baseInputs } from '../baseButton';

export const asyncInputs = baseInputs.concat(['action']);

export interface IAsyncAction {
	($event: any): IWaitValue<any>;
}

@Component({
	selector: 'rlButtonAsync',
	template: require('./buttonAsync.html'),
	inputs: asyncInputs,
})
export class ButtonAsyncComponent extends BaseButtonComponent {
	action: IAsyncAction;

	@ViewChild(BusyComponent) busySpinner: BusyComponent;

	constructor() {
		super();
		if (!this.action) {
			this.action = () => Observable.empty();
		}
	}

	triggerAction($event: any): void {
		// subscribes to kick off the action
		const waitValue: IWaitValue<any> = this.action($event);
		this.busySpinner.waitOn(waitValue).subscribe();
	}
}
