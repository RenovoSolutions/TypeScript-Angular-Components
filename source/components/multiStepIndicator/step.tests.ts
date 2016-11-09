import { StepComponent } from './step.component';

describe('StepComponent', () => {
	let step: StepComponent;

	beforeEach(() => {
		step = new StepComponent;
	});

	it('should set error styling on the step if it isn\'t valid', (): void => {
		step.valid = false;
		step.checkIfValid();

		expect(step.errorStyle).to.be.true;
	});

	it('should not set error styling on the step if it is valid', (): void => {
		step.valid = true;
		step.checkIfValid();

		expect(step.errorStyle).to.be.false;
	});

});