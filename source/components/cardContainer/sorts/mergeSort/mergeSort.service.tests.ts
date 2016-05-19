import { services, types } from 'typescript-angular-utilities';
import test = services.test;

import {
	IMergeSort,
	serviceName,
	moduleName,
} from './mergeSort.service';

import * as angular from 'angular';
import 'angular-mocks';

interface ITestObject {
	value: number;
}

describe('mergeSort', () => {
	var mergeSort: IMergeSort;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = test.angularFixture.inject(serviceName);
		mergeSort = services[serviceName];
	});

	it('should sort a set of items using the default comparer', (): void => {
		var data: number[] = [1, 4, 6, 5, 2, 7, 3];
		var result: number[] = mergeSort.sort(data);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal(2);
		expect(result[2]).to.equal(3);
		expect(result[3]).to.equal(4);
		expect(result[4]).to.equal(5);
		expect(result[5]).to.equal(6);
		expect(result[6]).to.equal(7);
	});

	it('should sort a set of items using a custom comparer', (): void => {
		var object1: ITestObject = {
			value: 2,
		};

		var object2: ITestObject = {
			value: 3,
		};

		var object3: ITestObject = {
			value: 4,
		};

		var object4: ITestObject = {
			value: 12,
		};

		var data: ITestObject[] = [object2, object4, object1, object3];

		var result: ITestObject[] = mergeSort.sort(data, (a: ITestObject, b: ITestObject): types.CompareResult => {
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
