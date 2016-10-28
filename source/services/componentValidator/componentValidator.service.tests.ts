import { Subject, Observable } from 'rxjs';
import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

import { ComponentValidator } from './componentValidator.service';

interface IControlMock {
	valueChanges?: Subject<any>;
	errors?: any;
	rlErrorMessage?: string;
}

describe('ComponentValidator', () => {
	let componentValidator: ComponentValidator;

	beforeEach(() => {
		componentValidator = new ComponentValidator(new __validation.ValidationService(<any>{}));
	});

	it('should register the validators and set the value stream', (): void => {
		const registerSpy = sinon.spy();
		componentValidator.validator.registerValidationHandler = registerSpy;
		const validators: any[] = [{}, {}];
		const value$ = new Subject();

		componentValidator.initValidator(validators, value$, <any>{});

		sinon.assert.calledTwice(registerSpy);
		sinon.assert.calledWith(registerSpy, validators[0]);
		sinon.assert.calledWith(registerSpy, validators[1]);
		expect(componentValidator.value$).to.equal(value$);
	});

	it('should subscribe to the error stream and set rlErrorMessage on the control', (): void => {
		const control: any = {};
		const validator = { validate: () => Observable.of('error') };
		const value$ = new Subject();

		componentValidator.initValidator([validator], value$, control);

		expect(control.rlErrorMessage).to.equal('error');
	});

	it('should return null if validation passes', (): void => {
		const validateStream = new Subject();
		componentValidator.validator.validate = sinon.spy(() => validateStream);
		const control: IControlMock = { valueChanges: new Subject() };
		let result;

		componentValidator.validate(<any>control).subscribe(error => result = error);

		validateStream.next(null);

		expect(result).to.be.null;
	});

	it('should return the error if validation fails', (): void => {
		const validateStream = new Subject();
		componentValidator.validator.validate = sinon.spy(() => validateStream);
		const control: IControlMock = { valueChanges: new Subject() };
		let result;

		componentValidator.validate(<any>control).subscribe(error => result = error);

		validateStream.next('error');

		expect(result).to.deep.equal({ validationError: 'error' });
	});
});
