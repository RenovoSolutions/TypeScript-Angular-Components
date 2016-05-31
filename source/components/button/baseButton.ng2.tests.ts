import { BaseButtonComponent } from './baseButton.ng2';

describe('base button', (): void => {
	let button: BaseButtonComponent;

	beforeEach((): void => {
		button = new BaseButtonComponent();
	});

	it('should append btn- to the size if present', (): void => {
		button.size = 'sm';
		expect(button.configuredSize).to.equal('btn-sm');
	});

	it('should leave the size empty if unspecified', (): void => {
		button.size = '';
		expect(button.configuredSize).to.be.null;
	});

	it('should append btn- to the type if present', (): void => {
		button.type = 'primary';
		expect(button.configuredTypes).to.equal('btn-primary');
	});

	it('should leave the type untouched if btn- is already present', (): void => {
		button.type = 'btn-primary';
		expect(button.configuredTypes).to.equal('btn-primary');
	});

	it('should default to btn-default if no type is specified', (): void => {
		button.type = null;
		expect(button.configuredTypes).to.equal('btn-default');
	});

	it('should handle multiple types and append btn- before each where necessary', (): void => {
		button.type = 'btn-primary flat other';
		expect(button.configuredTypes).to.equal('btn-primary btn-flat btn-other');
	});
});