import { FilterGroupComponent } from './filterGroup.component';

describe('FilterGroupComponent', (): void => {
	let filterGroupComponent: FilterGroupComponent<any>;
	let filterGroup = <any> {
		label: 'some label',
		activeOption: {
			label: 'active option label'
		}
	};

	beforeEach(() => {
		filterGroupComponent = new FilterGroupComponent(<any>{ log: sinon.spy() });
		filterGroupComponent.filterGroup = filterGroup;
	});

	it('should toggle the children', (): void => {
		expect(filterGroupComponent.expanded).to.be.true;

		filterGroupComponent.toggleExpanded();

		expect(filterGroupComponent.expanded).to.be.false;

		filterGroupComponent.toggleExpanded();

		expect(filterGroupComponent.expanded).to.be.true;
	});

	it('should only show children if expanded and enabled', (): void => {
		filterGroupComponent.expanded = true;
		filterGroupComponent.enabled = false;
		expect(filterGroupComponent.childrenVisible).to.be.false;

		filterGroupComponent.expanded = false;
		filterGroupComponent.enabled = true;
		expect(filterGroupComponent.childrenVisible).to.be.false;

		filterGroupComponent.expanded = false;
		filterGroupComponent.enabled = false;
		expect(filterGroupComponent.childrenVisible).to.be.false;

		filterGroupComponent.expanded = true;
		filterGroupComponent.enabled = true;
		expect(filterGroupComponent.childrenVisible).to.be.true;
	});

	it('should set the active option and refresh the data source', (): void => {
		const dataSource: any = { refresh: sinon.spy() };
		filterGroupComponent.dataSource = dataSource;
		const option: any = { prop: 4 };

		filterGroupComponent.selectOption(option);

		sinon.assert.calledOnce(dataSource.refresh);
		expect(filterGroupComponent.filterGroup.activeOption).to.equal(option);
		expect(filterGroupComponent.expanded).to.be.false;
	});

	it('should only show active option label if enabled', (): void => {
		filterGroupComponent.enabled = true;
		expect(filterGroupComponent.headerTitle).to.contain(filterGroup.label);
		expect(filterGroupComponent.headerTitle).to.contain(filterGroup.activeOption.label);

		filterGroupComponent.enabled = false;
		expect(filterGroupComponent.headerTitle).to.contain(filterGroup.label);
		expect(filterGroupComponent.headerTitle).to.not.contain(filterGroup.activeOption.label);
	});
});