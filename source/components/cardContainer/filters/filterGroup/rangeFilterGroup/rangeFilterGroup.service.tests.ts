import { services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { RangeFilterGroup } from './rangeFilterGroup.service';

interface IRangeFilterOptionMock {
	highInclusive?: number;
	highExclusive?: number;
	lowInclusive?: number;
	lowExclusive?: number;
	active?: boolean;
}

interface ITestObject {
	value?: number;
}

describe('RangeFilterGroup', () => {
	let rangeFilterGroup: RangeFilterGroup<any>;

	const buildFilter = settings => new RangeFilterGroup(settings, __transform.transform);

	describe('predicate', () => {
		let lowAndHighInclusiveOption: IRangeFilterOptionMock;
		let lowAndHighExclusiveOption: IRangeFilterOptionMock;
		let lowInclusiveOnlyOption: IRangeFilterOptionMock;
		let lowExclusiveOnlyOption: IRangeFilterOptionMock;
		let highInclusiveOnlyOption: IRangeFilterOptionMock;
		let highExclusiveOnlyOption: IRangeFilterOptionMock;

		beforeEach(() => {
			lowAndHighInclusiveOption = {
				lowInclusive: 5,
				highInclusive: 10,
			};
			lowAndHighExclusiveOption = {
				lowExclusive: 5,
				highExclusive: 10,
			};
			lowInclusiveOnlyOption = {
				lowInclusive: 5,
			};
			lowExclusiveOnlyOption = {
				lowExclusive: 5,
			};
			highInclusiveOnlyOption = {
				highInclusive: 10,
			};
			highExclusiveOnlyOption = {
				highExclusive: 10,
			};

			rangeFilterGroup = buildFilter({
				options: [
					lowAndHighInclusiveOption,
					lowAndHighExclusiveOption,
					lowInclusiveOnlyOption,
					lowExclusiveOnlyOption,
					highInclusiveOnlyOption,
					highExclusiveOnlyOption,
				],
				getValue(item: ITestObject): number {
					return item.value;
				},
			});
		});

		it('should return true for all items in the inclusive range', () => {
			rangeFilterGroup.activeOption = <any>lowAndHighInclusiveOption;

			expect(rangeFilterGroup.predicate({ value: 4 })).to.be.false;
			expect(rangeFilterGroup.predicate({ value: 5 })).to.be.true;
			expect(rangeFilterGroup.predicate({ value: 10 })).to.be.true;
			expect(rangeFilterGroup.predicate({ value: 11 })).to.be.false;
			expect(rangeFilterGroup.predicate({})).to.be.false;
		});

		it('should return true for all items in the exclusive range', () => {
			rangeFilterGroup.activeOption = <any>lowAndHighExclusiveOption;

			expect(rangeFilterGroup.predicate({ value: 5 })).to.be.false;
			expect(rangeFilterGroup.predicate({ value: 6 })).to.be.true;
			expect(rangeFilterGroup.predicate({ value: 9 })).to.be.true;
			expect(rangeFilterGroup.predicate({ value: 10 })).to.be.false;
			expect(rangeFilterGroup.predicate({})).to.be.false;
		});

		it('should return true for all items greater than or equal to the inclusive lower bound', () => {
			rangeFilterGroup.activeOption = <any>lowInclusiveOnlyOption;

			expect(rangeFilterGroup.predicate({ value: 4 })).to.be.false;
			expect(rangeFilterGroup.predicate({ value: 5 })).to.be.true;
			expect(rangeFilterGroup.predicate({ value: 500 })).to.be.true;
			expect(rangeFilterGroup.predicate({})).to.be.false;
		});

		it('should return true for all items greater than the exclusive lower bound', () => {
			rangeFilterGroup.activeOption = <any>lowExclusiveOnlyOption;

			expect(rangeFilterGroup.predicate({ value: 5 })).to.be.false;
			expect(rangeFilterGroup.predicate({ value: 6 })).to.be.true;
			expect(rangeFilterGroup.predicate({ value: 500 })).to.be.true;
			expect(rangeFilterGroup.predicate({})).to.be.false;
		});

		it('should return true for all items less than or equal to the inclusive upper bound', () => {
			rangeFilterGroup.activeOption = <any>highInclusiveOnlyOption;

			expect(rangeFilterGroup.predicate({ value: 1 })).to.be.true;
			expect(rangeFilterGroup.predicate({ value: 10 })).to.be.true;
			expect(rangeFilterGroup.predicate({ value: 11 })).to.be.false;
			expect(rangeFilterGroup.predicate({})).to.be.false;
		});

		it('should return true for all items less than the exclusive upper bound', (): void => {
			rangeFilterGroup.activeOption = <any>highExclusiveOnlyOption;

			expect(rangeFilterGroup.predicate({ value: 1 })).to.be.true;
			expect(rangeFilterGroup.predicate({ value: 9 })).to.be.true;
			expect(rangeFilterGroup.predicate({ value: 10 })).to.be.false;
			expect(rangeFilterGroup.predicate({})).to.be.false;
		});
	});

	describe('serialize', () => {
		it('should serialize to the values of the active option', (): void => {
			let inactiveOption: IRangeFilterOptionMock = {
				lowInclusive: 2,
				highInclusive: 5,
			};
			let activeOption: IRangeFilterOptionMock = {
				lowInclusive: 5,
				highInclusive: 10,
				active: true,
			};

			rangeFilterGroup = buildFilter({
				options: [
					inactiveOption,
					activeOption,
				],
			});
			let serializedValue;

			rangeFilterGroup.serialize().subscribe(result => serializedValue = result);

			expect(serializedValue.lowInclusive).to.equal(5);
			expect(serializedValue.highInclusive).to.equal(10);
		});

		it('should return null if the selected option has no values', (): void => {
			let defaultOption: IRangeFilterOptionMock = {
				active: true,
			};

			rangeFilterGroup = buildFilter({
				options: [
					defaultOption,
				],
			});
			let serializedValue;

			rangeFilterGroup.serialize().subscribe(result => serializedValue = result);

			expect(serializedValue).to.be.null;
		});
	});
});
