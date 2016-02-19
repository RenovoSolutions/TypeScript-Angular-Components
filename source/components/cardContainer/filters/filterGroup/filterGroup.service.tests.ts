/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	IFilterGroupFactory,
	IFilterGroup,
	factoryName,
} from './filterGroup.service';

import {
	moduleName,
} from './filterGroup.module';

import * as angular from 'angular';
import 'angular-mocks';

import * as _ from 'lodash';

interface IFilterOptionMock {
	label?: string;
	type?: string;
	filter?: Sinon.SinonSpy;
	count?: number;
	active?: boolean;
	serialize?: { (): number };
	value?: number;
}

describe('filterGroup', () => {
	let filterGroupFactory: IFilterGroupFactory;
	let filterGroup: IFilterGroup;

	beforeEach(() => {
		angular.mock.module(moduleName);

		let services: any = test.angularFixture.inject(factoryName);
		filterGroupFactory = services[factoryName];
	});

	it('should filter on the active option', (): void => {
		let option1: IFilterOptionMock = { filter: sinon.spy() };
		let option2: IFilterOptionMock = { filter: sinon.spy() };
		filterGroup = filterGroupFactory.getInstance(<any>{
			options: [option1, option2],
		});

		expect(filterGroup.activeOption).to.equal(option1);

		filterGroup.filter(5);

		sinon.assert.calledWith(option1.filter, 5);

		filterGroup.activeOption = <any>option2;

		filterGroup.filter(8);

		sinon.assert.calledWith(option2.filter, 8);
	});

	it('should set the option counts on the matching options', (): void => {
		let optionWithExplicitType: IFilterOptionMock = {
			type: 'option1',
			filter: sinon.spy(),
		};
		let optionWithImplicitType: IFilterOptionMock = {
			label: 'option2',
			filter: sinon.spy(),
		};

		filterGroup = filterGroupFactory.getInstance(<any>{
			options: [optionWithExplicitType, optionWithImplicitType],
		});

		filterGroup.setOptionCounts(<any>{
			option1: 5,
			option2: 10,
		});

		expect(optionWithExplicitType.count).to.equal(5);
		expect(optionWithImplicitType.count).to.equal(10);
	});

	it('should calculate the option counts on the options by applying their filters and then calculating the length of the resulting data set'
		, (): void => {
			let option1: IFilterOptionMock = {
				filter: sinon.spy((item: number): boolean => {
					return item > 5;
				}),
			};
			let option2: IFilterOptionMock = {
				filter: sinon.spy((item: number): boolean => {
					return item <= 5;
				}),
			};

			filterGroup = filterGroupFactory.getInstance(<any>{
				options: [option1, option2],
			});

			filterGroup.updateOptionCounts(_.range(1, 11));

			expect(option1.count).to.equal(5);
			expect(option2.count).to.equal(5);
		});

	it('should expect the option with active set to true to be the active option', (): void => {
		let option1: IFilterOptionMock = {
			active: false
		};
		let option2: IFilterOptionMock = {
			active: true
		};

		filterGroup = filterGroupFactory.getInstance(<any>{
			options: [option1, option2],
		});

		expect(filterGroup.activeOption).to.equal(option2);
		expect(filterGroup.activeOption).to.not.equal(option1);

	});

	it('should serialize the active option', (): void => {
		let inactiveOption: IFilterOptionMock = {
			active: false
		};
		let activeOption: IFilterOptionMock = {
			active: true,
			serialize: (): number => { return 4; },
		};

		filterGroup = filterGroupFactory.getInstance(<any>{
			options: [inactiveOption, activeOption],
		});

		expect(filterGroup.serialize()).to.equal(4);
	});

	it('should use the custom serializer provided by the consumer', (): void => {
		filterGroup = filterGroupFactory.getInstance(<any>{
			serialize: (): number => { return 4; },
			options: [],
		});

		expect(filterGroup.serialize()).to.equal(4);
	});

	it('should use the value of the option if no serialize is specified', (): void => {
		let inactiveOption: IFilterOptionMock = {
			active: false
		};
		let activeOption: IFilterOptionMock = {
			active: true,
			value: 4,
		};

		filterGroup = filterGroupFactory.getInstance(<any>{
			options: [inactiveOption, activeOption],
		});

		expect(filterGroup.serialize()).to.equal(4);
	});
});
