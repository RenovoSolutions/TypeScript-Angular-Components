import { FormService } from './form.service';

interface mockForm {
	FormGroup: mockFormGroup,
}

interface mockFormGroup {
	controls: mockFormGroup,
	validation: mockValidation
}

interface mockValidation {
	rlErrorMessage:string
}

describe('FormService', (): void => {
	let formService: FormService;

	beforeEach(() => {
		formService = new FormService();
	});

	it('should get the first error message from a child of the form', (): void => {
		const fakeErrorMessage = "error";

		const form = {
			valid:false,
			controls: [
				{ rlErrorMessage: "" },
				{
					rlErrorMessage: fakeErrorMessage},
				{ rlErrorMessage: "" },
				{ rlErrorMessage: "" }
			]
		};

		expect(formService.getAggregateError(<any>form)).to.equal(fakeErrorMessage);
	});

	it('should get error messages from nested forms', (): void => {
		const fakeErrorMessage = "error";

		const nestedForm = {
			valid:false,
			controls: [
				{ rlErrorMessage: "" },
				{ rlErrorMessage: fakeErrorMessage },
				{ rlErrorMessage: "" },
				{ rlErrorMessage: "" }
			]
		};

		const form = {
			valid:false,
			controls: [nestedForm],
		};

		expect(formService.getAggregateError(<any>form)).to.equal(fakeErrorMessage);
	});
});
