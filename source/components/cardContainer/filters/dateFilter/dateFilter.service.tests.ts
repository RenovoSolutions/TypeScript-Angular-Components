/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />

'use strict';

import * as angular from 'angular';
import 'angular-mocks';

import { services } from 'typescript-angular-utilities';
import __test = services.test;

import {moduleName, factoryName, IDateFilter, IDateFilterFactory } from './dateFilter.module';

interface ITestObj {
	value: Date;
}

describe('dateFilter', (): void => {
    let dateFilter: IDateFilter;

	beforeEach(() => {
        angular.mock.module(moduleName);
        let services: any = __test.angularFixture.inject(factoryName);
		let dateFilterFactory: IDateFilterFactory = services[factoryName]
		dateFilter = dateFilterFactory.getInstance('value');
	});

    it('dateFilter should return true', (): void => {
        let item: ITestObj = { value: new Date(2000, 1, 1, 5, 16, 0) };
        let item2: ITestObj = { value: new Date(2000, 3, 1,0,0,0) };
        let item3: ITestObj = { value: new Date(1999, 11, 25, 8, 0, 0) };

        dateFilter.selectedDate1 = new Date(2000, 1, 1, 5, 16, 0);

        expect(dateFilter.filter(item)).to.be.true;
        expect(dateFilter.filter(item2)).to.be.false;

        dateFilter.selectedDate2 = new Date(1999, 11, 15, 5, 16, 0);
		dateFilter.dateRange = true;

        expect(dateFilter.filter(item)).to.be.true;
        expect(dateFilter.filter(item2)).to.be.false;
        expect(dateFilter.filter(item3)).to.be.true;

		//checking selectedDate1 null;
		dateFilter.selectedDate1 = null;
        expect(dateFilter.filter(item)).to.be.true;

	});
});