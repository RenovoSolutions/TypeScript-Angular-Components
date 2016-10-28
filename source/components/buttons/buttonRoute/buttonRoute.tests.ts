import { ButtonRouteComponent } from './buttonRoute';

describe('ButtonRouteComponent', (): void => {
	let buttonRoute: ButtonRouteComponent;

	beforeEach((): void => {
		buttonRoute = new ButtonRouteComponent();
	});

	it('should set the target to blank if newTab is set', (): void => {
		buttonRoute.newTab = true;
		expect(buttonRoute.target).to.equal('_blank');
	});

	it('should set the target to self by default', (): void => {
		expect(buttonRoute.target).to.equal('_self');
	});
});
