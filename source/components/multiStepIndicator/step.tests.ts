import { StepComponent } from './step.component';

describe('StepComponent', () => {
	let step: StepComponent;

	beforeEach(() => {
		step = new StepComponent;
	});

	it('should set the step styling to be a multi-step', (): void => {
		step.useMsiStyling = true;
		step.setStepType();

		expect(step.useMsi).to.be.true;
		expect(step.useTab).to.be.false;
	});

	it('should set the step styling to be a tab', (): void => {
		step.useMsiStyling = false;
		step.setStepType();

		expect(step.useTab).to.be.true;
		expect(step.useMsi).to.be.false;
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