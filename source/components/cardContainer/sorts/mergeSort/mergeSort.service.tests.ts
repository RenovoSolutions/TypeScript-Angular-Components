import { types } from 'typescript-angular-utilities';

import { IMergeSort, MergeSort } from './mergeSort.service';

interface ITestObject {
	value: number;
}

describe('MergeSort', () => {
	let mergeSort: IMergeSort;

	beforeEach(() => {
		mergeSort = new MergeSort();
	});

	it('should sort a set of items using the default comparer', (): void => {
		let data: number[] = [1, 4, 6, 5, 2, 7, 3];
		let result: number[] = mergeSort.sort(data);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal(2);
		expect(result[2]).to.equal(3);
		expect(result[3]).to.equal(4);
		expect(result[4]).to.equal(5);
		expect(result[5]).to.equal(6);
		expect(result[6]).to.equal(7);
	});

	it('should sort a set of items using a custom comparer', (): void => {
		let object1: ITestObject = {
			value: 2,
		};

		let object2: ITestObject = {
			value: 3,
		};

		let object3: ITestObject = {
			value: 4,
		};

		let object4: ITestObject = {
			value: 12,
		};

		let data: ITestObject[] = [object2, object4, object1, object3];

		let result: ITestObject[] = mergeSort.sort(data, (a: ITestObject, b: ITestObject): types.CompareResult => {
			return a.value > b.value
				? types.CompareResult.greater
				: (a.value < b.value ? types.CompareResult.less : types.CompareResult.equal);
		});
		expect(result[0]).to.equal(object1);
		expect(result[1]).to.equal(object2);
		expect(result[2]).to.equal(object3);
		expect(result[3]).to.equal(object4);
	});
});
