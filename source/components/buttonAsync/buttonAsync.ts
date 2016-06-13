import { Component, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BusyComponent, IWaitValue } from '../busy/busy';
import { BaseButtonComponent, baseInputs } from '../button/baseButton';

export const asyncInputs = baseInputs.concat(['action', 'rightAligned']);

export interface IAsyncAction {
	($event: any): IWaitValue<any>;
}

@Component({
	selector: 'rlButtonAsync',
	template: require('./buttonAsync.html'),
	inputs: asyncInputs,
	directives: [BusyComponent],
})
export class ButtonAsyncComponent extends BaseButtonComponent {
	action: IAsyncAction;
	rightAligned: boolean;

	@ViewChild(BusyComponent) busySpinner: BusyComponent;

	constructor() {
		super();
		if (!this.action) {
			this.action = <IAsyncAction>() => Promise.resolve();
		}
	}

	triggerAction($event: any): void {
		const waitValue: IWaitValue<any> = this.action($event);
		this.busySpinner.trigger(waitValue);
	}
}