import { Observable } from 'rxjs';
import { ButtonSubmitComponent } from './buttonSubmit';

interface IMockForm {
	submitAndWait: sinon.SinonSpy;
}

interface IMockBusy {
	waitOn: sinon.SinonSpy;
}

interface IMockExceptionHandler {
	call: sinon.SinonSpy;
}

describe('ButtonSubmitComponent', (): void => {
	let buttonSubmit: ButtonSubmitComponent;
	let form: IMockForm;
	let busy: IMockBusy;

	beforeEach((): void => {
		form = {
			submitAndWait: sinon.spy(() => 5),
		};
		buttonSubmit = new ButtonSubmitComponent(<any>form);

		busy = {
			waitOn: sinon.spy(() => Observable.empty()),
		};
		buttonSubmit.busySpinner = <any>busy;
	});

	it('should submit the form and pass the result to the spinner', (): void => {
		buttonSubmit.submit();

		sinon.assert.calledOnce(form.submitAndWait);
		sinon.assert.calledOnce(busy.waitOn);
		sinon.assert.calledWith(busy.waitOn, 5);
	});
});
