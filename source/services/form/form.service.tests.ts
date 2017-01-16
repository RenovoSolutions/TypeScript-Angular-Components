import { FormService } from './form.service';

describe('FormService', (): void => {
	let formService: FormService;

	beforeEach(() => {
		formService = new FormService();
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
