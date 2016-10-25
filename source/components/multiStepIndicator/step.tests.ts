import { StepComponent } from './step.component';

describe('StepComponent', () => {
	let step: StepComponent;

	beforeEach(() => {
		step = new StepComponent;
	});

	it('should set the step styling to be a multi-step if using msi styling', (): void => {
		step.useMsiStyling = true;
		step.setStepType();

		expect(step.setStepType).to.be.true;
	});

	it('should set the step styling to be a tab if not using msi styling', (): void => {
		step.useMsiStyling = false;
		step.setStepType();

		expect(step.setStepType).to.be.false;
	});

	it('should set error styling on the step if it isn\'t valid', (): void => {
		step.valid = false;
		step.checkIfValid();

		expect(step.hasError).to.be.true;
	});

	it('should not set error styling on the step if it is valid', (): void => {
		step.valid = true;
		step.checkIfValid();

		expect(step.hasError).to.be.false;
	});

});