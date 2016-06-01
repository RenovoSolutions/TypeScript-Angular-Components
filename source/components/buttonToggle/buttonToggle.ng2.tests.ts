import { ButtonToggleComponent } from './buttonToggle.ng2';

describe('ButtonToggleComponent', () => {
	let buttonToggle: ButtonToggleComponent;

	beforeEach(() => {
		buttonToggle = new ButtonToggleComponent();
	});

	it('should update the value and emit a change event when the button is toggled', (): void => {
		const changeSpy: Sinon.SinonSpy = sinon.spy();

		buttonToggle.change.subscribe(changeSpy);

		expect(buttonToggle.value).to.be.undefined;

		buttonToggle.toggle();

		expect(buttonToggle.value).to.be.true;
		sinon.assert.calledOnce(changeSpy);
		sinon.assert.calledWith(changeSpy, true);

		buttonToggle.toggle();

		expect(buttonToggle.value).to.be.false;
		sinon.assert.calledOnce(changeSpy);
		sinon.assert.calledWith(changeSpy, false);
	});
});
