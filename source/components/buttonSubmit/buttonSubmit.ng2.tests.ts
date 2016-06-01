import { ButtonSubmitComponent } from './buttonSubmit.ng2';

interface IMockForm {
	submit: Sinon.SinonSpy;
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
			submit: sinon.spy(() => 5),
		};
		buttonSubmit = new ButtonSubmitComponent(<any>form, <any>{});

		busy = {
			trigger: sinon.spy(),
		};
		buttonSubmit.busySpinner = <any>busy;
	});

	it('should submit the form and pass the result to the spinner', (): void => {
		buttonSubmit.submit();

		sinon.assert.calledOnce(form.submit);
		sinon.assert.calledOnce(busy.trigger);
		sinon.assert.calledWith(busy.trigger, 5);
	});

	it('should throw an error if no form is specified', (): void => {
		const exceptionHandler: IMockExceptionHandler = {
			call: sinon.spy(),
		};
		buttonSubmit = new ButtonSubmitComponent(null, <any>exceptionHandler);

		sinon.assert.calledOnce(exceptionHandler.call);
		sinon.assert.calledWith(exceptionHandler.call, new Error('This component must be nested in an rlForm component.'));
	});
});