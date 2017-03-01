import { Observable } from 'rxjs';
import { rlFakeAsync, rlTick, flushMicrotasks } from 'rl-async-testing';

import { services } from 'typescript-angular-utilities';
import __timeout = services.timeout;

import { ButtonLongClickComponent } from './buttonLongClick';

interface IMockBusy {
	waitOn: sinon.SinonSpy;
}

interface IMockNotification {
	warning: sinon.SinonSpy;
}

describe('ButtonLongClickComponent', () => {
	let button: ButtonLongClickComponent;
	let busy: IMockBusy;
	let action: sinon.SinonSpy;
	let notification: IMockNotification;

	beforeEach(() => {
		notification = {
			warning: sinon.spy(),
		};

		button = new ButtonLongClickComponent(<any>notification, new __timeout.TimeoutService());

		busy = {
			waitOn: sinon.spy(() => Observable.empty()),
		};
		button.busySpinner = <any>busy;
	});

	it('should trigger the action after 2 seconds', rlFakeAsync((): void => {
		action = sinon.spy(() => 5);
		button.action = action;
		const event: any = { value: 2 };

		button.startAction(event);

		sinon.assert.notCalled(action);

		rlTick(2000);
		flushMicrotasks();

		sinon.assert.calledOnce(action);
		sinon.assert.calledWith(action, event);
		sinon.assert.calledOnce(busy.waitOn);
		sinon.assert.calledWith(busy.waitOn, 5);
	}));

	it('should cancel and show a warning if the user stops the action before the time is up', rlFakeAsync((): void => {
		action = sinon.spy(() => 5);
		button.action = action;
		const event: any = { value: 2 };
		button.warning = 'warning';

		button.startAction(event);

		rlTick(1000);

		button.stopAction();
		flushMicrotasks();

		sinon.assert.calledOnce(notification.warning);
		sinon.assert.calledWith(notification.warning, 'warning');

		rlTick(1000);
		flushMicrotasks();

		sinon.assert.notCalled(action);
	}));
});
