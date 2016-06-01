import { ButtonLinkComponent } from './buttonLink.ng2';

describe('button link', (): void => {
	let buttonLink: ButtonLinkComponent;

	beforeEach((): void => {
		buttonLink = new ButtonLinkComponent();
	});

	it('should set the target to blank if newTab is set', (): void => {
		buttonLink.newTab = true;
		expect(buttonLink.target).to.equal('_blank');
	});

	it('should set the target to self by default', (): void => {
		expect(buttonLink.target).to.equal('_self');
	});
});