import { TabHeaderComponent } from './tabHeader.component';

describe('a tabHeader component', () => {
	let tabHeaderComponent : TabHeaderComponent;

	// register all needed dependencies
	beforeEach(() => {
		tabHeaderComponent = new TabHeaderComponent(<any>{});
	});

	it('should have an instance', () => {
		expect(tabHeaderComponent).to.not.be.null;
	});

	it('should get the inner HTML', () => {
		const innerHtmlTest = "askljeudSHUTUPBRENTdggfhlawkjegbfl;akjosbd";

		tabHeaderComponent = new TabHeaderComponent({
			nativeElement: {
				innerHTML: innerHtmlTest
			}
		});

		expect(tabHeaderComponent.innerHTML).to.equal(innerHtmlTest);
	});
});