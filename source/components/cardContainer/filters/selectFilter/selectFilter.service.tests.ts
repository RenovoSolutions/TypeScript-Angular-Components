/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />

'use strict';

import * as angular from 'angular';
import 'angular-mocks';

import { services as utilityServices } from 'typescript-angular-utilities';
import __test = utilityServices.test;

import { moduleName, factoryName, ISelectFilter, ISelectFilterFactory } from './selectFilter.module';

interface ITestObj {
	value: number;
}

describe('selectFilter', (): void => {
	let selectFilter: ISelectFilter<ITestObj>;
	let selectFilterFactory: ISelectFilterFactory;

	beforeEach(() => {
		angular.mock.module(moduleName);

		let services: any = __test.angularFixture.inject(factoryName);
		selectFilterFactory = services[factoryName]
		selectFilter = selectFilterFactory.getInstance({ valueSelector: 'value' });
	});

	it('should return true if the items value equal the selected value', (): void => {
		let item: ITestObj = { value: 1 };

		selectFilter.selectedValue = 1;

		expect(selectFilter.filter(item)).to.be.true;
	});

	it('should return false if the items value does not equal the selected value', (): void => {
		let item: ITestObj = { value: 2};

		selectFilter.selectedValue = 1;

		expect(selectFilter.filter(item)).to.be.false;
	});

	it('should return true if the items are equal but not the same instance', (): void => {
		let item1: any = { value: { prop: 2 } };
		let item2: any = { prop: 2 };

		selectFilter.selectedValue = item2;

		expect(selectFilter.filter(item1)).to.be.true;
	});

	it('should allow for specifying a comparer', (): void => {
		let item1: any = { value: { prop: 2 } };
		let item2: any = { prop: 2, otherProp: 3 };

		selectFilter = selectFilterFactory.getInstance({
			valueSelector: 'value',
			comparer: (item1: any, item2: any): boolean => { return item1.prop === item2.prop; },
		});
		selectFilter.selectedValue = item2;

		expect(selectFilter.filter(item1)).to.be.true;
	});
});
