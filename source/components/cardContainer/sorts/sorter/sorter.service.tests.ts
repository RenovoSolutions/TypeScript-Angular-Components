/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services, types } from 'typescript-angular-utilities';
import test = services.test;

import {
	ISorter,
	moduleName,
	serviceName,
} from './sorter.service';

import {
	moduleName as sortsModuleName,
	SortDirection,
	ISort,
} from '../sorts.module';

import { IMergeSort } from '../mergeSort/mergeSort.service';

import * as angular from 'angular';
import 'angular-mocks';

interface ITestObject {
	value: number;
	name?: string;
}

describe('sorter', () => {
	var sorter: ISorter;
	var mergeSort: IMergeSort;

	beforeEach(() => {
		angular.mock.module(sortsModuleName);
		angular.mock.module(moduleName);
	});

	describe('mock merge sort', (): void => {
		beforeEach((): void => {
			mergeSort = {
				sort: sinon.spy((data: any[]): any[] => {
					return data;
				}),
			};

			test.angularFixture.mock({
				mergeSort: mergeSort,
			});

			var services: any = test.angularFixture.inject(serviceName);
			sorter = services[serviceName];
		});

		it('should return the data if no sorts are specified', (): void => {
			var data: number[] = [1, 2, 3, 4];
			expect(sorter.sort(data, null)).to.equal(data);
		});

		it('should trigger a single sort if parameter is a sort object', (): void => {
			var sort: ISort = {
				column: <any>{
					getValue(x: ITestObject): number {
						return x.value;
					},
				},
				direction: SortDirection.ascending,
			};

			var object1: ITestObject = {
				value: 4,
			};

			var object2: ITestObject = {
				value: 6,
			};

			var object3: ITestObject = {
				value: 9,
			};

			var data: ITestObject[] = [object1, object2, object3];
			var result: ITestObject[] = sorter.sort(data, sort);
			expect(result).to.equal(data);

			var sortSpy: Sinon.SinonSpy = <Sinon.SinonSpy>mergeSort.sort;
			sinon.assert.calledOnce(sortSpy);
			var call: Sinon.SinonSpyCall = sortSpy.firstCall;
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
			var sorts: ISort[] = [
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

			var object1: ITestObject = {
				value: 1,
				name: 'z',
			};

			var object2: ITestObject = {
				value: 2,
				name: 'a',
			};

			var data: ITestObject[] = [object2, object1];
			var result: ITestObject[] = sorter.sort(data, sorts);
			expect(result).to.equal(data);

			var sortSpy: Sinon.SinonSpy = <Sinon.SinonSpy>mergeSort.sort;
			sinon.assert.calledTwice(sortSpy);
			expect(sortSpy.firstCall.args[1](object1, object2)).to.equal(types.CompareResult.less);
			expect(sortSpy.secondCall.args[1](object1, object2)).to.equal(types.CompareResult.less);
		});
	});

	describe('use merge sort', (): void => {
		beforeEach((): void => {
			var services: any = test.angularFixture.inject(serviceName);
			sorter = services[serviceName];
		});

		it('should flip the sort direction if flip is enabled', (): void => {
			var sort: ISort = {
				column: <any>{
					getValue(x: ITestObject): number {
						return x.value;
					},
					flipSort: true,
				},
				direction: SortDirection.ascending,
			};

			var object1: ITestObject = {
				value: 9,
			};

			var object2: ITestObject = {
				value: 6,
			};

			var object3: ITestObject = {
				value: 4,
			};

			var data: ITestObject[] = [object3, object1, object2];
			var result: ITestObject[] = sorter.sort(data, sort);
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
