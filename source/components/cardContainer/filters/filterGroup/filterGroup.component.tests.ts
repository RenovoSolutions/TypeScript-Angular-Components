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
		filterGroupComponent = new FilterGroupComponent();
		filterGroupComponent.filterGroup = filterGroup;
	});

	it('should toggle the children', (): void => {
		expect(filterGroupComponent.expanded).to.be.true;

		filterGroupComponent.toggleExpanded();

		expect(filterGroupComponent.expanded).to.be.false;

		filterGroupComponent.toggleExpanded();

		expect(filterGroupComponent.expanded).to.be.true;
	});

	it('should only show children if expanded and not disabled', (): void => {
		filterGroupComponent.expanded = true;
		filterGroupComponent.disabled = true;
		expect(filterGroupComponent.childrenVisible).to.be.false;

		filterGroupComponent.expanded = false;
		filterGroupComponent.disabled = false;
		expect(filterGroupComponent.childrenVisible).to.be.false;

		filterGroupComponent.expanded = false;
		filterGroupComponent.disabled = true;
		expect(filterGroupComponent.childrenVisible).to.be.false;

		filterGroupComponent.expanded = true;
		filterGroupComponent.disabled = false;
		expect(filterGroupComponent.childrenVisible).to.be.true;
	});

	it('should set the active option and refresh the data source', (): void => {
		const option: any = { prop: 4 };

		filterGroupComponent.selectOption(option);

		expect(filterGroupComponent.filterGroup.activeOption).to.equal(option);
		expect(filterGroupComponent.expanded).to.be.false;
	});

	it('should not show active option label if disabled', (): void => {
		filterGroupComponent.disabled = false;
		expect(filterGroupComponent.headerTitle).to.contain(filterGroup.label);
		expect(filterGroupComponent.headerTitle).to.contain(filterGroup.activeOption.label);

		filterGroupComponent.disabled = true;
		expect(filterGroupComponent.headerTitle).to.contain(filterGroup.label);
		expect(filterGroupComponent.headerTitle).to.not.contain(filterGroup.activeOption.label);
	});
});
