/// <reference path='../../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	IModeFilterGroupFactory,
	IModeFilterGroup,
	factoryName,
	moduleName,
} from './modeFilterGroup.service';

import * as angular from 'angular';
import 'angular-mocks';

interface IModeFilterOptionMock {
	value: boolean;
}

interface ITestObject {
	flag?: boolean;
}

describe('modeFilterGroup', () => {
	var modeFilterGroupFactory: IModeFilterGroupFactory;
	var modeFilterGroup: IModeFilterGroup;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = test.angularFixture.inject(factoryName);
		modeFilterGroupFactory = services[factoryName];
	});

	it('should build an option filter function that filters out items with a value not matching the mode', (): void => {
		var trueModeOption: IModeFilterOptionMock = {
			value: true,
		};
		var falseModeOption: IModeFilterOptionMock = {
			value: false,
		};

		modeFilterGroup = modeFilterGroupFactory.getInstance(<any>{
			options: [trueModeOption, falseModeOption],
			getValue(item: ITestObject): boolean {
				return item.flag;
			},
		});

		var trueObj: ITestObject = { flag: true };
		var falseObj: ITestObject = { flag: false };
		var emptyObj: ITestObject = {};

		modeFilterGroup.activeOption = <any>trueModeOption;
		expect(modeFilterGroup.filter(trueObj)).to.be.true;
		expect(modeFilterGroup.filter(falseObj)).to.be.false;
		expect(modeFilterGroup.filter(emptyObj)).to.be.false;

		modeFilterGroup.activeOption = <any>falseModeOption;
		expect(modeFilterGroup.filter(falseObj)).to.be.true;
		expect(modeFilterGroup.filter(trueObj)).to.be.false;
		expect(modeFilterGroup.filter(emptyObj)).to.be.false;
	});
});
