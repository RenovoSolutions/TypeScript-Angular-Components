import { ButtonSubmitComponent } from './buttonSubmit';

interface IMockForm {
	submitAndWait: Sinon.SinonSpy;
}

interface IMockBusy {
	trigger: Sinon.SinonSpy;
}

interface IMockExceptionHandler {
	call: Sinon.SinonSpy;
}

describe('button submit', (): void => {
	let buttonSubmit: ButtonSubmitComponent;
	let form: IMockForm;
	let busy: IMockBusy;

	beforeEach((): void => {
		form = {
			submitAndWait: sinon.spy(() => 5),
		};
		buttonSubmit = new ButtonSubmitComponent(<any>form);

		busy = {
			trigger: sinon.spy(),
		};
		buttonSubmit.busySpinner = <any>busy;
	});

	it('should submit the form and pass the result to the spinner', (): void => {
		buttonSubmit.submit();

		sinon.assert.calledOnce(form.submitAndWait);
		sinon.assert.calledOnce(busy.trigger);
		sinon.assert.calledWith(busy.trigger, 5);
	});
});