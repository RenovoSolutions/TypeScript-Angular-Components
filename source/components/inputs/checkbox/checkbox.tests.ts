import { services } from 'typescript-angular-utilities';

import { CheckboxComponent } from './checkbox';

describe('CheckboxComponent', () => {
	let checkbox: CheckboxComponent;
	let setValue: Sinon.SinonSpy;

	beforeEach(() => {
		checkbox = new CheckboxComponent(true, null, null, null);
		setValue = sinon.spy(value => checkbox.value = value);
		checkbox.setValue = setValue;

		expect(checkbox.value).to.be.undefined;
	});

	it('should toggle the value if active', (): void => {
		checkbox.toggle();

		sinon.assert.calledOnce(setValue);
		sinon.assert.calledWith(setValue, true);

		checkbox.toggle();

		sinon.assert.calledTwice(setValue);
		sinon.assert.calledWith(setValue, false);
	});

	it('should not toggle if not active', (): void => {
		checkbox.active = false;
		checkbox.toggle();
		sinon.assert.notCalled(setValue);
	});
});
