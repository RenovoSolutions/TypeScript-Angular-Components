import { Trigger, ITrigger } from './trigger';

describe('autosave trigger', () => {
	let trigger: ITrigger<void>;

	beforeEach(() => {
		// aliases test and trigger
		trigger = new Trigger('test trigger', sinon.spy());
	});

	it('should be true if any alias of the trigger is specified', (): void => {
		expect(trigger.hasMatch('test a simple autosave')).to.be.true;
	});

	it('should be false if no match is found', (): void => {
		expect(trigger.hasMatch('some random strings all together')).to.be.false;
	});
});
