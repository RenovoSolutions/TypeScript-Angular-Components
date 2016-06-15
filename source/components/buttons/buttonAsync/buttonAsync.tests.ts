import { ButtonAsyncComponent } from './buttonAsync';

interface IMockBusy {
	trigger: Sinon.SinonSpy;
}

describe('ButtonAsyncComponent', () => {
	let button: ButtonAsyncComponent;
	let busy: IMockBusy;
	let action: Sinon.SinonSpy;

	beforeEach(() => {
		button = new ButtonAsyncComponent();

		busy = {
			trigger: sinon.spy(),
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
		sinon.assert.calledOnce(busy.trigger);
		sinon.assert.calledWith(busy.trigger, 5);
	});
});
