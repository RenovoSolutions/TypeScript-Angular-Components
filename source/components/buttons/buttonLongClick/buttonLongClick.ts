import { Component, Input, ViewChild } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __notification = services.notification;
import __timeout = services.timeout;

import { BusyComponent } from '../../busy/busy';
import { ButtonAsyncComponent, asyncInputs } from '../buttonAsync/buttonAsync';

@Component({
	selector: 'rlButtonLongClick',
	template: require('./buttonLongClick.html'),
	inputs: asyncInputs,
	directives: [BusyComponent],
})
export class ButtonLongClickComponent extends ButtonAsyncComponent {
	@Input() warning: string;

	@ViewChild(BusyComponent) busySpinner: BusyComponent;

	// Should match the CSS animation time
	duration: number = 2000;
	active: boolean;
	timer: __timeout.ITimeout;

	notification: __notification.INotificationService;
	timeoutService: __timeout.TimeoutService;

	constructor(notification: __notification.NotificationService
			, timeoutService: __timeout.TimeoutService) {
		super();
		this.notification = notification;
		this.timeoutService = timeoutService;
	}

	startAction($event: MouseEvent): void {
		if (this.active || this.busySpinner.loading) {
			return;
		}

		this.active = true;

		this.timer = this.timeoutService.setTimeout((): void => {
			this.cleanup();
			this.triggerAction($event);
		}, this.duration);
	}

	stopAction(): void {
		if (this.active) {
			if (this.timer != null) {
				this.warn();
			}

			this.cleanup();
		}
	}

	private cleanup(): void {
		this.timer.cancel();
		this.timer = null;
		this.active = false;
	}

	private warn(): void {
		const warning: string = this.warning || 'Press and hold to complete this action';
		this.notification.warning(warning);
	}
}