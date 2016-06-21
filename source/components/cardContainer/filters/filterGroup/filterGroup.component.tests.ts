import { FilterGroupComponent } from './filterGroup.component';

describe('FilterGroupComponent', (): void => {
	let filterGroup: FilterGroupComponent<any>;

	beforeEach(() => {
		filterGroup = new FilterGroupComponent({ log: sinon.spy() });
		filterGroup.filterGroup = <any>{};
	});

	it('should toggle the children', (): void => {
		expect(filterGroup.showChildren).to.be.true;

		filterGroup.toggleChildren();

		expect(filterGroup.showChildren).to.be.false;

		filterGroup.toggleChildren();

		expect(filterGroup.showChildren).to.be.true;
	});

	it('should set the active option and refresh the data source', (): void => {
		const dataSource: any = { refresh: sinon.spy() };
		filterGroup.dataSource = dataSource;
		const option: any = { prop: 4 };

		filterGroup.selectOption(option);

		sinon.assert.calledOnce(dataSource.refresh);
		expect(filterGroup.filterGroup.activeOption).to.equal(option);
		expect(filterGroup.showChildren).to.be.false;
	});
});