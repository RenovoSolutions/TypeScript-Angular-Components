import { Component, Input, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BusyComponent, IWaitValue } from '../busy/busy.ng2';
import { BaseButtonComponent, baseInputs } from '../button/baseButton.ng2';

export interface IAsyncAction {
	($event: any): IWaitValue<any>;
}

@Component({
	selector: 'rlButtonAsync',
	template: require('./buttonAsync.ng2.html'),
	inputs: baseInputs,
	directives: [BusyComponent],
})
export class ButtonAsyncComponent extends BaseButtonComponent {
	@Input() action: IAsyncAction;
	@Input() rightAligned: boolean;

	@ViewChild(BusyComponent) busySpinners: BusyComponent;

	constructor() {
		super();
		if (!this.action) {
			this.action = <IAsyncAction>() => Promise.resolve();
		}
	}

	triggerAction($event: any): void {
		const waitValue: IWaitValue<any> = this.action($event);
		this.busySpinners.trigger(waitValue);
	}
}