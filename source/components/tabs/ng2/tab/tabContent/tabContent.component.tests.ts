import { TabContentComponent } from './tabContent.component';

describe('a tabContent component', () => {
	let tabContentComponent : TabContentComponent;

	// register all needed dependencies
	beforeEach(() => {
		tabContentComponent = new TabContentComponent();
	});

	it('should have an instance', () => {
		expect(tabContentComponent).to.not.be.null;
	});
});