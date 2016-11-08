import { services, types } from 'typescript-angular-utilities';
import __transform = services.transform;

import { ISorter, Sorter } from './sorter.service';
import { SortDirection,	ISort, IMergeSort, MergeSort } from '../index';

interface ITestObject {
	value: number;
	name?: string;
}

describe('Sorter', () => {
	let sorter: ISorter;
	let mergeSort: IMergeSort;

	describe('mock merge sort', (): void => {
		beforeEach((): void => {
			mergeSort = {
				sort: sinon.spy((data: any[]): any[] => {
					return data;
				}),
			};

			sorter = new Sorter(<any>mergeSort, __transform.transform);
		});

		it('should return the data if no sorts are specified', (): void => {
			let data: number[] = [1, 2, 3, 4];
			expect(sorter.sort(data, null)).to.equal(data);
		});

		it('should return the data if null', (): void => {
			let sort: ISort = {
				column: <any>{
					getValue(x: ITestObject): number {
						return x.value;
					},
				},
				direction: SortDirection.ascending,
			};
			expect(sorter.sort(null, sort)).to.be.null;
		});

		it('should trigger a single sort if parameter is a sort object', (): void => {
			let sort: ISort = {
				column: <any>{
					getValue(x: ITestObject): number {
						return x.value;
					},
				},
				direction: SortDirection.ascending,
			};

			let object1: ITestObject = {
				value: 4,
			};

			let object2: ITestObject = {
				value: 6,
			};

			let object3: ITestObject = {
				value: 9,
			};

			let data: ITestObject[] = [object1, object2, object3];
			let result: ITestObject[] = sorter.sort(data, sort);
			expect(result).to.equal(data);

			let sortSpy: Sinon.SinonSpy = <Sinon.SinonSpy>mergeSort.sort;
			sinon.assert.calledOnce(sortSpy);
			let call: Sinon.SinonSpyCall = sortSpy.firstCall;
			expect(call.args[0]).to.equal(data);

			expect(call.args[1](object2, object1)).to.equal(types.CompareResult.greater);
			expect(call.args[1](object2, object3)).to.equal(types.CompareResult.less);
			expect(call.args[1](object2, object2)).to.equal(types.CompareResult.equal);

			// Sort descending
			sort.direction = SortDirection.descending;

			result = sorter.sort(data, sort);
			expect(result).to.equal(data);

			sinon.assert.calledTwice(sortSpy);
			call = sortSpy.secondCall;
			expect(call.args[0]).to.equal(data);

			expect(call.args[1](object2, object1)).to.equal(types.CompareResult.less);
			expect(call.args[1](object2, object3)).to.equal(types.CompareResult.greater);
			expect(call.args[1](object2, object2)).to.equal(types.CompareResult.equal);
		});

		it('should call sorts sequentially in reverse order', (): void => {
			let sorts: ISort[] = [
				{
					column: <any>{
						getValue(x: ITestObject): number {
							return x.value;
						},
					},
					direction: SortDirection.ascending,
				},
				{
					column: {
						getValue(x: ITestObject): string {
							return x.name;
						},
					},
					direction: SortDirection.descending,
				},
			];

			let object1: ITestObject = {
				value: 1,
				name: 'z',
			};

			let object2: ITestObject = {
				value: 2,
				name: 'a',
			};

			let data: ITestObject[] = [object2, object1];
			let result: ITestObject[] = sorter.sort(data, sorts);
			expect(result).to.equal(data);

			let sortSpy: Sinon.SinonSpy = <Sinon.SinonSpy>mergeSort.sort;
			sinon.assert.calledTwice(sortSpy);
			expect(sortSpy.firstCall.args[1](object1, object2)).to.equal(types.CompareResult.less);
			expect(sortSpy.secondCall.args[1](object1, object2)).to.equal(types.CompareResult.less);
		});
	});

	describe('use merge sort', (): void => {
		beforeEach((): void => {
			sorter = new Sorter(new MergeSort, __transform.transform);
		});

		it('should flip the sort direction if flip is enabled', (): void => {
			let sort: ISort = {
				column: <any>{
					getValue(x: ITestObject): number {
						return x.value;
					},
					flipSort: true,
				},
				direction: SortDirection.ascending,
			};

			let object1: ITestObject = {
				value: 9,
			};

			let object2: ITestObject = {
				value: 6,
			};

			let object3: ITestObject = {
				value: 4,
			};

			let data: ITestObject[] = [object3, object1, object2];
			let result: ITestObject[] = sorter.sort(data, sort);
			expect(result).to.have.length(3);
			expect(result[0].value).to.equal(9);
			expect(result[1].value).to.equal(6);
			expect(result[2].value).to.equal(4);

			// Sort descending
			sort.direction = SortDirection.descending;

			result = sorter.sort(data, sort);
			expect(result).to.have.length(3);
			expect(result[0].value).to.equal(4);
			expect(result[1].value).to.equal(6);
			expect(result[2].value).to.equal(9);
		});
	});
});
