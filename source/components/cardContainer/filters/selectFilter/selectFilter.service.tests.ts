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

	beforeEach(() => {
		angular.mock.module(moduleName);

		let services: any = __test.angularFixture.inject(factoryName);
		let selectFilterFactory: ISelectFilterFactory = services[factoryName]
		selectFilter = selectFilterFactory.getInstance('value');
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
});
