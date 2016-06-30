import { FormComponent } from './form';
import { isFunction } from 'lodash';
import { services } from 'typescript-angular-utilities';
import mock = services.test.mock;
import fakeAsync = services.test.fakeAsync;

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

		form = new FormComponent(<any>notification, <any>formService);
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

		it('should mark the form as pristine after the submit completes', fakeAsync((): void => {
			const saveMock = mock.promise();
			form.saveForm = saveMock;
			formService.isFormValid = <any>(() => true);
			form.form = <any>{ _dirty: true, _pristine: false };

			form.submit();

			expect((<any>form.form)._dirty).to.be.true;
			expect((<any>form.form)._pristine).to.be.false;

			saveMock.flush();

			expect((<any>form.form)._dirty).to.be.false;
			expect((<any>form.form)._pristine).to.be.true;
		}));

		it('should mark the form as pristine immediately if no async action is returned', (): void => {
			form.saveForm = <any>(() => null);
			formService.isFormValid = <any>(() => true);
			form.form = <any>{ _dirty: true, _pristine: false };

			form.submit();

			expect((<any>form.form)._dirty).to.be.false;
			expect((<any>form.form)._pristine).to.be.true;
		});
	});
});