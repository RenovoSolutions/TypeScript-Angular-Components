import { services } from 'typescript-angular-utilities';
import __test = services.test;
import fakeAsync = __test.fakeAsync;
import tick = __test.tick;
import flushMicrotasks = __test.flushMicrotasks;
import __timeout = services.timeout;

import { ButtonLongClickComponent } from './buttonLongClick';

interface IMockBusy {
	trigger: Sinon.SinonSpy;
}

interface IMockNotification {
	warning: Sinon.SinonSpy;
}

describe('ButtonLongClickComponent', () => {
	let button: ButtonLongClickComponent;
	let busy: IMockBusy;
	let action: Sinon.SinonSpy;
	let notification: IMockNotification;

	beforeEach(() => {
		notification = {
			warning: sinon.spy(),
		};

		button = new ButtonLongClickComponent(<any>notification, new __timeout.TimeoutService());

		busy = {
			trigger: sinon.spy(),
		};
		button.busySpinner = <any>busy;
	});

	it('should trigger the action after 2 seconds', fakeAsync((): void => {
		action = sinon.spy(() => 5);
		button.action = action;
		const event: any = { value: 2 };

		button.startAction(event);

		sinon.assert.notCalled(action);

		tick(2000);
		flushMicrotasks();

		sinon.assert.calledOnce(action);
		sinon.assert.calledWith(action, event);
		sinon.assert.calledOnce(busy.trigger);
		sinon.assert.calledWith(busy.trigger, 5);
	}));

	it('should cancel and show a warning if the user stops the action before the time is up', fakeAsync((): void => {
		action = sinon.spy(() => 5);
		button.action = action;
		const event: any = { value: 2 };
		button.warning = 'warning';

		button.startAction(event);

		tick(1000);

		button.stopAction();

		sinon.assert.calledOnce(notification.warning);
		sinon.assert.calledWith(notification.warning, 'warning');

		tick(1000);
		flushMicrotasks();

		sinon.assert.notCalled(action);
	}));
});
