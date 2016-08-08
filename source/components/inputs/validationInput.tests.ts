import { Subject } from 'rxjs';
import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;
import __validation = services.validation;

import { ValidatedInputComponent, IInputChanges } from './validationInput';

interface IControlMock {
	updateValueAndValidity?: Sinon.SinonSpy;
	updateValue?: Sinon.SinonSpy;
	valueChanges?: { subscribe: Sinon.SinonSpy };
}

interface IComponentValidatorMock {
	setValidators: Sinon.SinonSpy;
	afterInit: Sinon.SinonSpy;
	validate: Sinon.SinonSpy;
}

describe('ValidatedInputComponent', (): void => {
	let input: ValidatedInputComponent<number>;
	let componentValidator: IComponentValidatorMock;

	beforeEach((): void => {
		componentValidator = {
			setValidators: sinon.spy(),
			afterInit: sinon.spy(),
			validate: sinon.spy(),
		};

		input = new ValidatedInputComponent<number>(null, <any>componentValidator, __object.objectUtility, __array.arrayUtility, __guid.guid);

		expect(input.value).to.be.undefined;
	});

	it('should concatenate the specified validators and pass them to the component validator', (): void => {
		input.validator = <any>[1, 2];
		input.validators = <any>[3, 4];

		input.ngOnInit();

		sinon.assert.calledOnce(componentValidator.setValidators);
		sinon.assert.calledWith(componentValidator.setValidators, [1, 2, 3, 4]);
	});

	it('should arrayify the validators if necessary', (): void => {
		input.validator = <any>1;
		input.validators = <any>2;

		input.ngOnInit();

		sinon.assert.calledOnce(componentValidator.setValidators);
		sinon.assert.calledWith(componentValidator.setValidators, [1, 2]);
	});

	it('should build a required validator if rlRequired is specified', (): void => {
		input.rlRequired = 'This is required';

		input.ngOnInit();

		sinon.assert.calledOnce(componentValidator.setValidators);
		const validator: __validation.IValidationHandler = componentValidator.setValidators.firstCall.args[0][0];
		expect(validator.name).to.equal('rlRequired');
		expect(validator.errorMessage).to.equal('This is required');
	});

	it('should set the control on the component validator and update the validity of the control', (): void => {
		const control: IControlMock = {
			updateValueAndValidity: sinon.spy(),
			valueChanges: { subscribe: sinon.spy() },
		};
		input.control = <any>control;
		input.value = 4;

		input.ngAfterViewInit();

		sinon.assert.calledOnce(componentValidator.afterInit);
		sinon.assert.calledWith(componentValidator.afterInit, control);
		sinon.assert.calledOnce(control.updateValueAndValidity);
		sinon.assert.calledWith(control.updateValueAndValidity, 4);
	});

	// updateValueAndValidity doesn't handle 'null' properly
	it('should default the value to undefined if null', (): void => {
		const control: IControlMock = {
			updateValueAndValidity: sinon.spy(),
			valueChanges: { subscribe: sinon.spy() },
		};
		input.control = <any>control;
		input.value = null;

		input.ngAfterViewInit();

		sinon.assert.calledOnce(control.updateValueAndValidity);
		sinon.assert.calledWith(control.updateValueAndValidity, undefined);
	});

	it('should update the control value with changes from the outside', (): void => {
		const control: IControlMock = { updateValue: sinon.spy() };
		input.control = <any>control;

		input.ngOnChanges({
			value: <any>{ currentValue: 4 },
		});

		sinon.assert.calledOnce(control.updateValue);
		sinon.assert.calledWith(control.updateValue, 4);
	});
});