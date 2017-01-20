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
		const fakeInValidValidation1: mockValidation = <mockValidation>{ rlErrorMessage: "error1" };
		const fakeInValidValidation2: mockValidation = <mockValidation>{ rlErrorMessage: "error2" };
		const fakeValidValidation1: mockValidation = <mockValidation>{};
		const fakeValidValidation2: mockValidation = <mockValidation>{};


		const form = {
			valid:false,
			controls: [
				{ validation: fakeValidValidation1 },
				{ validation: fakeValidValidation2 },
				{ validation: fakeInValidValidation1 },
				{ validation:fakeInValidValidation2 }
			]
		};

		expect(formService.getAggregateError(<any>form)).to.equal(fakeInValidValidation1.rlErrorMessage);
	});

	it('should get error messages from nested forms', (): void => {
		const fakeInValidValidation1: mockValidation = <mockValidation>{ rlErrorMessage: "error1" };
		const fakeInValidValidation2: mockValidation = <mockValidation>{ rlErrorMessage: "error2" };
		const fakeValidValidation1: mockValidation = <mockValidation>{};
		const fakeValidValidation2: mockValidation = <mockValidation>{};


		const nestedForm = {
			controls: [
				{ validation: fakeValidValidation1 },
				{ validation: fakeValidValidation2 },
				{ validation: fakeInValidValidation1 },
				{ validation:fakeInValidValidation2 }
			]
		};
		const form = {
			valid:false,
			controls: [nestedForm],
		};

		expect(formService.getAggregateError(<any>form)).to.equal(fakeInValidValidation1.rlErrorMessage);
	});
});
