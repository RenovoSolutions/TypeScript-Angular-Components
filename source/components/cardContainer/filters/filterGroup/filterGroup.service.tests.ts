import { range } from 'lodash';

import { FilterGroup } from './filterGroup.service';

interface IFilterOptionMock {
	label?: string;
	type?: string;
	predicate?: Sinon.SinonSpy;
	count?: number;
	active?: boolean;
	serialize?: { (): number };
	value?: number;
}

describe('FilterGroup', () => {
	let filterGroup: FilterGroup<any>;

	const buildFilter = settings => new FilterGroup(settings);

	it('should filter on the active option', (): void => {
		let option1: IFilterOptionMock = { predicate: sinon.spy() };
		let option2: IFilterOptionMock = { predicate: sinon.spy() };
		filterGroup = buildFilter({
			options: [option1, option2],
		});
		filterGroup.initOptions();

		expect(filterGroup.activeOption).to.equal(option1);

		filterGroup.predicate(5);

		sinon.assert.calledWith(option1.predicate, 5);

		filterGroup.activeOption = <any>option2;

		filterGroup.predicate(8);

		sinon.assert.calledWith(option2.predicate, 8);
	});

	it('should expect the option with active set to true to be the active option', (): void => {
		let option1: IFilterOptionMock = {
			active: false
		};
		let option2: IFilterOptionMock = {
			active: true
		};

		filterGroup = buildFilter({
			options: [option1, option2],
		});
		filterGroup.initOptions();

		expect(filterGroup.activeOption).to.equal(option2);
		expect(filterGroup.activeOption).to.not.equal(option1);

	});

	it('should serialize the active option', (): void => {
		let inactiveOption: IFilterOptionMock = {
			active: false
		};
		let activeOption: IFilterOptionMock = {
			active: true,
			serialize: (): number => { return 4; },
		};

		filterGroup = buildFilter({
			options: [inactiveOption, activeOption],
		});
		filterGroup.initOptions();
		let value;

		filterGroup.serialize().subscribe(result => value = result);

		expect(value).to.equal(4);
	});

	it('should use the custom serializer provided by the consumer', (): void => {
		filterGroup = buildFilter({
			serialize: (): number => { return 4; },
			options: [],
		});
		filterGroup.initOptions();
		let value;

		filterGroup.serialize().subscribe(result => value = result);

		expect(value).to.equal(4);
	});

	it('should use the value of the option if no serialize is specified', (): void => {
		let inactiveOption: IFilterOptionMock = {
			active: false
		};
		let activeOption: IFilterOptionMock = {
			active: true,
			value: 4,
		};

		filterGroup = buildFilter({
			options: [inactiveOption, activeOption],
		});
		filterGroup.initOptions();
		let value;

		filterGroup.serialize().subscribe(result => value = result);

		expect(value).to.equal(4);
	});

	describe('filterCounts', () => {
		it('should set the option counts on the matching options', (): void => {
			let optionWithExplicitType: IFilterOptionMock = {
				type: 'option1',
				predicate: sinon.spy(),
			};
			let optionWithImplicitType: IFilterOptionMock = {
				label: 'option2',
				predicate: sinon.spy(),
			};

			filterGroup = buildFilter({
				options: [optionWithExplicitType, optionWithImplicitType],
			});
			filterGroup.initOptions();

			filterGroup.setOptionCounts(<any>{
				option1: 5,
				option2: 10,
			});

			expect(optionWithExplicitType.count).to.equal(5);
			expect(optionWithImplicitType.count).to.equal(10);
		});

		it('should calculate the option counts on the options by applying their filters and then calculating the length of the resulting data set'
			, (): void => {
				let option1: IFilterOptionMock = {
					predicate: sinon.spy((item: number): boolean => {
						return item > 5;
					}),
				};
				let option2: IFilterOptionMock = {
					predicate: sinon.spy((item: number): boolean => {
						return item <= 5;
					}),
				};

				filterGroup = buildFilter({
					options: [option1, option2],
				});
				filterGroup.initOptions();

				filterGroup.updateOptionCounts(range(1, 11));

				expect(option1.count).to.equal(5);
				expect(option2.count).to.equal(5);
			});
	});
});
