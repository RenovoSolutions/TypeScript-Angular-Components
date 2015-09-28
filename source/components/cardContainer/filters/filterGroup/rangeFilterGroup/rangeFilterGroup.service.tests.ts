/// <reference path='../../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	IRangeFilterGroupFactory,
	IRangeFilterGroup,
	factoryName,
	moduleName,
} from './rangeFilterGroup.service';

import * as angular from 'angular';
import 'angular-mocks';

interface IRangeFilterOptionMock {
	highInclusive?: number;
	highExclusive?: number;
	lowInclusive?: number;
	lowExclusive?: number;
}

interface ITestObject {
	value?: number;
}

describe('modeFilterGroup', () => {
	var rangeFilterGroupFactory: IRangeFilterGroupFactory;
	var rangeFilterGroup: IRangeFilterGroup;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = test.angularFixture.inject(factoryName);
		rangeFilterGroupFactory = services[factoryName];
	});

	it('should build an option filter functin that filters out items that arent in the range', (): void => {
		var lowAndHighInclusiveOption: IRangeFilterOptionMock = {
			lowInclusive: 5,
			highInclusive: 10,
		};
		var lowAndHighExclusiveOption: IRangeFilterOptionMock = {
			lowExclusive: 5,
			highExclusive: 10,
		};
		var lowInclusiveOnlyOption: IRangeFilterOptionMock = {
			lowInclusive: 5,
		};
		var lowExclusiveOnlyOption: IRangeFilterOptionMock = {
			lowExclusive: 5,
		};
		var highInclusiveOnlyOption: IRangeFilterOptionMock = {
			highInclusive: 10,
		};
		var highExclusiveOnlyOption: IRangeFilterOptionMock = {
			highExclusive: 10,
		};

		rangeFilterGroup = rangeFilterGroupFactory.getInstance(<any>{
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

		rangeFilterGroup.activeOption = <any>lowAndHighInclusiveOption;
		expect(rangeFilterGroup.filter({ value: 4 })).to.be.false;
		expect(rangeFilterGroup.filter({ value: 5 })).to.be.true;
		expect(rangeFilterGroup.filter({ value: 10 })).to.be.true;
		expect(rangeFilterGroup.filter({ value: 11 })).to.be.false;
		expect(rangeFilterGroup.filter({})).to.be.false;

		rangeFilterGroup.activeOption = <any>lowAndHighExclusiveOption;
		expect(rangeFilterGroup.filter({ value: 5 })).to.be.false;
		expect(rangeFilterGroup.filter({ value: 6 })).to.be.true;
		expect(rangeFilterGroup.filter({ value: 9 })).to.be.true;
		expect(rangeFilterGroup.filter({ value: 10 })).to.be.false;
		expect(rangeFilterGroup.filter({})).to.be.false;

		rangeFilterGroup.activeOption = <any>lowInclusiveOnlyOption;
		expect(rangeFilterGroup.filter({ value: 4 })).to.be.false;
		expect(rangeFilterGroup.filter({ value: 5 })).to.be.true;
		expect(rangeFilterGroup.filter({ value: 500 })).to.be.true;
		expect(rangeFilterGroup.filter({})).to.be.false;

		rangeFilterGroup.activeOption = <any>lowExclusiveOnlyOption;
		expect(rangeFilterGroup.filter({ value: 5 })).to.be.false;
		expect(rangeFilterGroup.filter({ value: 6 })).to.be.true;
		expect(rangeFilterGroup.filter({ value: 500 })).to.be.true;
		expect(rangeFilterGroup.filter({})).to.be.false;

		rangeFilterGroup.activeOption = <any>highInclusiveOnlyOption;
		expect(rangeFilterGroup.filter({ value: 1 })).to.be.true;
		expect(rangeFilterGroup.filter({ value: 10 })).to.be.true;
		expect(rangeFilterGroup.filter({ value: 11 })).to.be.false;
		expect(rangeFilterGroup.filter({})).to.be.false;

		rangeFilterGroup.activeOption = <any>highExclusiveOnlyOption;
		expect(rangeFilterGroup.filter({ value: 1 })).to.be.true;
		expect(rangeFilterGroup.filter({ value: 9 })).to.be.true;
		expect(rangeFilterGroup.filter({ value: 10 })).to.be.false;
		expect(rangeFilterGroup.filter({})).to.be.false;
	});
});
