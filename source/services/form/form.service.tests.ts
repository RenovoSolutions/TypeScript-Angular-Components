import { FormService } from './form.service';

describe('FormService', (): void => {
	let formService: FormService;

	beforeEach(() => {
		formService = new FormService();
	});

	it('should return true if every control is valid', (): void => {
		const form: any = {
			controls: [{ valid: true }, { valid: true }],
		};
		expect(formService.isFormValid(form)).to.be.true;
	});

	it('should return false if a control is invalid', (): void => {
		const form: any = {
			controls: [{ valid: true }, { valid: false }],
		};
		expect(formService.isFormValid(form)).to.be.false;
	});

	it('should recursively validate nested forms', (): void => {
		const nestedForm: any = {
			controls: [{ valid: true }, { valid: false }],
		};
		const form: any = {
			controls: [{ valid: true }],
			rlNestedFormGroups: [nestedForm]
		};
		expect(formService.isFormValid(form)).to.be.false;
	});

	it('should get the first error message from a child of the form', (): void => {
		const form: any = {
			controls: [
				{},
				{},
				{ rlErrorMessage: 'error1' },
				{ rlErrorMessage: 'error2' },
			],
		};
		expect(formService.getAggregateError(form)).to.equal('error1');
	});

	it('should get error messages from nested forms', (): void => {
		const nestedForm: any = {
			controls: [{ rlErrorMessage: 'nestedError' }],
		};
		const form: any = {
			controls: [],
			rlNestedFormGroups: [nestedForm],
		};
		expect(formService.getAggregateError(form)).to.equal('nestedError');
	});
});
