import { rlFakeAsync, mock } from 'rl-async-testing';

import { FormComponent } from './form';
import { isFunction } from 'lodash';

import { AsyncHelper } from '../../services/async/async.service';

interface INotificationMock {
	warning: Sinon.SinonSpy;
}

interface IFormServiceMock {
	isFormValid?: Sinon.SinonSpy;
	getAggregateError?: Sinon.SinonSpy;
}

describe('FormComponent', (): void => {
	let form: FormComponent;
	let notification: INotificationMock;
	let formService: IFormServiceMock;

	beforeEach((): void => {
		notification = { warning: sinon.spy() };
		formService = {};

		form = new FormComponent(<any>notification, new AsyncHelper(), <any>formService, null);
		form.form = <any>{};
	});

	it('should default save if not specified', (): void => {
		expect(isFunction(form.save)).to.be.true;
	});

	it('should save using the current form value', (): void => {
		const saveSpy = sinon.spy();
		form.save = saveSpy;
		const value = { prop: 'something' };
		form.form.value = value;

		form.saveForm();

		sinon.assert.calledOnce(saveSpy);
		sinon.assert.calledWith(saveSpy, value);
	});

	it('should nest the form in a parent form if one is found', (): void => {
		const pushSpy = sinon.spy();
		const parentForm: any = {
			form: {
				rlNestedFormGroups: { push: pushSpy },
			},
		};
		form = new FormComponent(<any>notification, new AsyncHelper(), <any>formService, parentForm);

		sinon.assert.calledOnce(pushSpy);
		sinon.assert.calledWith(pushSpy, form.form);
	});

	describe('saveForm', (): void => {
		it('should mark the form as pristine after the submit completes', rlFakeAsync((): void => {
			const saveMock = mock.promise();
			const setPristineSpy = sinon.spy();
			form.save = saveMock;
			formService.isFormValid = <any>(() => true);
			form.markAsPristine = setPristineSpy;

			form.saveForm();

			sinon.assert.notCalled(setPristineSpy);

			saveMock.flush();

			sinon.assert.calledOnce(setPristineSpy);
		}));

		it('should mark the form as pristine immediately if no async action is returned', rlFakeAsync((): void => {
			form.save = <any>(() => null);
			const setPristineSpy = sinon.spy();
			formService.isFormValid = <any>(() => true);
			form.markAsPristine = setPristineSpy;

			form.saveForm();

			sinon.assert.calledOnce(setPristineSpy);
		}));
	});

	describe('submit', (): void => {
		it('should save the form if valid', (): void => {
			const saveSpy = sinon.spy();
			form.saveForm = saveSpy;
			const isValidSpy = sinon.spy(() => true);
			formService.isFormValid = isValidSpy;
			form.form = <any>{};

			form.submit();

			sinon.assert.calledOnce(isValidSpy);
			sinon.assert.calledWith(isValidSpy, form.form);
			sinon.assert.calledOnce(saveSpy);
		});

		it('should show a warning if invalid', (): void => {
			const isValidSpy = sinon.spy(() => false);
			formService.isFormValid = isValidSpy;
			const getErrorSpy = sinon.spy(() => 'error');
			formService.getAggregateError = getErrorSpy;
			form.form = <any>{};

			form.submit();

			sinon.assert.calledOnce(isValidSpy);
			sinon.assert.calledWith(isValidSpy, form.form);
			sinon.assert.calledOnce(getErrorSpy);
			sinon.assert.calledOnce(notification.warning);
			sinon.assert.calledWith(notification.warning, 'error');
		});

		it('should return true if validation passes', (): void => {
			const saveSpy = sinon.spy();
			form.saveForm = saveSpy;
			form.validate = sinon.spy(() => true);

			const submitting = form.submit();

			expect(submitting).to.be.true;
		});

		it('should return the wait value for saving the form', (): void => {
			const saveSpy = sinon.spy(() => 'waiting');
			form.saveForm = saveSpy;
			form.validate = sinon.spy(() => true);

			const waitOn = form.submitAndWait();

			expect(waitOn).to.equal('waiting');
		});
	});
});
