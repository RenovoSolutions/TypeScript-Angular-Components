import { Observable } from 'rxjs';

import { ButtonAsyncComponent } from './buttonAsync';

interface IMockBusy {
	waitOn: sinon.SinonSpy;
}

describe('ButtonAsyncComponent', () => {
	let button: ButtonAsyncComponent;
	let busy: IMockBusy;
	let action: sinon.SinonSpy;

	beforeEach(() => {
		button = new ButtonAsyncComponent();

		busy = {
			waitOn: sinon.spy(() => Observable.empty()),
		};
		button.busySpinner = <any>busy;
	});

	it('should trigger the action and pass the result to the spinner', (): void => {
		action = sinon.spy(() => 5);
		button.action = action;
		const event = { value: 2 };

		button.triggerAction(event);

		sinon.assert.calledOnce(action);
		sinon.assert.calledWith(action, event);
		sinon.assert.calledOnce(busy.waitOn);
		sinon.assert.calledWith(busy.waitOn, 5);
	});
});
