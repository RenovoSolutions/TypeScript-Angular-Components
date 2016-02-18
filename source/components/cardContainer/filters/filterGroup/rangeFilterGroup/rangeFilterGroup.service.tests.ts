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
	active?: boolean;
}

interface ITestObject {
	value?: number;
}

describe('rangeFilterGroup', () => {
	let rangeFilterGroupFactory: IRangeFilterGroupFactory;
	let rangeFilterGroup: IRangeFilterGroup;

	beforeEach(() => {
		angular.mock.module(moduleName);

		let services: any = test.angularFixture.inject(factoryName);
		rangeFilterGroupFactory = services[factoryName];
	});

	it('should build an option filter functin that filters out items that arent in the range', (): void => {
		let lowAndHighInclusiveOption: IRangeFilterOptionMock = {
			lowInclusive: 5,
			highInclusive: 10,
		};
		let lowAndHighExclusiveOption: IRangeFilterOptionMock = {
			lowExclusive: 5,
			highExclusive: 10,
		};
		let lowInclusiveOnlyOption: IRangeFilterOptionMock = {
			lowInclusive: 5,
		};
		let lowExclusiveOnlyOption: IRangeFilterOptionMock = {
			lowExclusive: 5,
		};
		let highInclusiveOnlyOption: IRangeFilterOptionMock = {
			highInclusive: 10,
		};
		let highExclusiveOnlyOption: IRangeFilterOptionMock = {
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

		rangeFilterGroup = rangeFilterGroupFactory.getInstance(<any>{
			options: [
				inactiveOption,
				activeOption,
			],
		});

		let serializedValue: any = rangeFilterGroup.serialize();
		expect(serializedValue.lowInclusive).to.equal(5);
		expect(serializedValue.highInclusive).to.equal(10);
	});

	it('should return null if the selected option has no values', (): void => {
		let defaultOption: IRangeFilterOptionMock = {
			active: true,
		};

		rangeFilterGroup = rangeFilterGroupFactory.getInstance(<any>{
			options: [
				defaultOption,
			],
		});

		expect(rangeFilterGroup.serialize()).to.be.null;
	});
});
