import { Component, Input, ViewChild, Inject } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __notification = services.notification;

import { BusyComponent } from '../busy/busy';
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
	actionTimeout: Promise<void>;
	cancel: Function;
	private notification: __notification.INotificationService;

	constructor(@Inject(__notification.notificationToken) notification: __notification.INotificationService) {
		super();
		this.notification = notification;
	}

	startAction($event: MouseEvent): void {
		if (this.active || this.busySpinner.loading) {
			return;
		}

		this.active = true;

		this.actionTimeout = new Promise<void>((resolve): void => {
			let pending: boolean = true;
			this.cancel = () => {
				if (pending) {
					resolve();
					pending = false;
				}
			};
			setTimeout(() => {
				if (pending) {
					resolve();
					pending = false;
					this.cleanup();
					this.triggerAction($event);
				}
			}, this.duration);
		});
	}

	stopAction(): void {
		if (this.active) {
			if (this.actionTimeout != null) {
				this.warn();
			}

			this.cleanup();
		}
	}

	private cleanup(): void {
		this.cancel();
		this.actionTimeout = null;
		this.active = false;
	}

	private warn(): void {
		const warning: string = this.warning || 'Press and hold to complete this action';
		this.notification.warning(warning);
	}
}