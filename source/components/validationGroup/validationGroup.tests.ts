import { services } from 'typescript-angular-utilities';
import __array = services.array;
import __validation = services.validation;

import { ValidationGroupComponent, IGroupChanges } from './validationGroup';

interface IControlMock {
	updateValueAndValidity?: Sinon.SinonSpy;
	updateValue?: Sinon.SinonSpy;
}

interface IComponentValidatorMock {
	setValidators: Sinon.SinonSpy;
	afterInit: Sinon.SinonSpy;
	validate: Sinon.SinonSpy;
}

describe('ValidationGroupComponent', (): void => {
	let group: ValidationGroupComponent;
	let componentValidator: IComponentValidatorMock;

	beforeEach((): void => {
		componentValidator = {
			setValidators: sinon.spy(),
			afterInit: sinon.spy(),
			validate: sinon.spy(),
		};

		group = new ValidationGroupComponent(null, <any>componentValidator, __array.arrayUtility);
	});

	it('should nest the form group in a parent form if one is found', (): void => {
		const pushSpy = sinon.spy();
		const form: any = {
			form: {
				rlNestedFormGroups: { push: pushSpy },
			},
		};
		group = new ValidationGroupComponent(form, <any>componentValidator, __array.arrayUtility);

		expect(group.formGroup.controls['validation']).to.equal(group.validationControl);
		sinon.assert.calledOnce(pushSpy);
		sinon.assert.calledWith(pushSpy, group.formGroup);
	});

	it('should concatenate the specified validators and pass them to the component validator', (): void => {
		group.validator = <any>[1, 2];
		group.validators = <any>[3, 4];

		group.ngOnInit();

		sinon.assert.calledOnce(componentValidator.setValidators);
		sinon.assert.calledWith(componentValidator.setValidators, [1, 2, 3, 4]);
	});

	it('should arrayify the validators if necessary', (): void => {
		group.validator = <any>1;
		group.validators = <any>2;

		group.ngOnInit();

		sinon.assert.calledOnce(componentValidator.setValidators);
		sinon.assert.calledWith(componentValidator.setValidators, [1, 2]);
	});

	it('should set the control on the component validator and update the validity of the control', (): void => {
		const control: IControlMock = { updateValueAndValidity: sinon.spy() };
		group.validationControl	= <any>control;
		group.model = 4;

		group.ngAfterViewInit();

		sinon.assert.calledOnce(componentValidator.afterInit);
		sinon.assert.calledWith(componentValidator.afterInit, control);
		sinon.assert.calledOnce(control.updateValueAndValidity);
		sinon.assert.calledWith(control.updateValueAndValidity, 4);
	});

	// updateValueAndValidity doesn't handle 'null' properly
	it('should default the value to undefined if null', (): void => {
		const control: IControlMock = { updateValueAndValidity: sinon.spy() };
		group.validationControl = <any>control;
		group.model = null;

		group.ngAfterViewInit();

		sinon.assert.calledOnce(control.updateValueAndValidity);
		sinon.assert.calledWith(control.updateValueAndValidity, undefined);
	});

	it('should update the control value with changes from the outside', (): void => {
		const control: IControlMock = { updateValue: sinon.spy() };
		group.validationControl = <any>control;

		group.ngOnChanges({
			model: <any>{ currentValue: 4 },
		});

		sinon.assert.calledOnce(control.updateValue);
		sinon.assert.calledWith(control.updateValue, 4);
	});
});