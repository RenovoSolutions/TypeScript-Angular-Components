import { Subject } from 'rxjs';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

import { ComponentValidator } from './componentValidator.service';

interface IControlMock {
	statusChanges?: Subject<any>;
	errors?: any;
	rlErrorMessage?: string;
	value?: any;
}

describe('ComponentValidator', () => {
	let componentValidator: ComponentValidator;

	beforeEach(() => {
		componentValidator = new ComponentValidator(new __validation.ValidationService(<any>{}));
	});

	it('should register the validators', (): void => {
		const registerSpy = sinon.spy();
		componentValidator.validator.registerValidationHandler = registerSpy;
		const validators: any[] = [{}, {}];

		componentValidator.initValidator(validators);

		sinon.assert.calledTwice(registerSpy);
		sinon.assert.calledWith(registerSpy, validators[0]);
		sinon.assert.calledWith(registerSpy, validators[1]);
	});

	it('should subscribe to status changes on the control', (): void => {
		const setErrorSpy = sinon.spy();
		componentValidator.setError = setErrorSpy;
		const control: IControlMock = { statusChanges: new Subject() };

		componentValidator.afterInit(<any>control);

		sinon.assert.calledOnce(setErrorSpy);
		sinon.assert.calledWith(setErrorSpy, control);
		setErrorSpy.reset();

		control.statusChanges.next(null);

		sinon.assert.calledOnce(setErrorSpy);
		sinon.assert.calledWith(setErrorSpy, control);
	});

	it('should return null if validation passes', (): void => {
		const validateSpy = sinon.spy(() => true);
		componentValidator.validator.validate = validateSpy;
		const control: IControlMock = { value: 3 };

		const result = componentValidator.validate(<any>control);

		sinon.assert.calledOnce(validateSpy);
		sinon.assert.calledWith(validateSpy, 3);
		expect(result).to.be.null;
	});

	it('should return the error if validation fails', (): void => {
		const validateSpy = sinon.spy(() => false);
		componentValidator.validator.validate = validateSpy;
		const control: IControlMock = { value: 3 };
		componentValidator.error = 'error';
		componentValidator.errorType = 'errorType';

		const result = componentValidator.validate(<any>control);

		sinon.assert.calledOnce(validateSpy);
		sinon.assert.calledWith(validateSpy, 3);
		expect(result['errorType']).to.equal('error');
	});

	it('should set rlErrorMessage on the control to the first error', (): void => {
		const control: IControlMock = {
			errors: {
				myError: 'error',
				otherError: 'other',
			},
		};

		componentValidator.setError(<any>control);

		expect(control.rlErrorMessage).to.equal('error');
	});
});
