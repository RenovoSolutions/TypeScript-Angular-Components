/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	IDataPager,
	IDataPagerFactory,
	moduleName,
	factoryName,
} from './dataPager.service';

import * as angular from 'angular';
import 'angular-mocks';

describe('dataPager', () => {
	var dataPager: IDataPager;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = test.angularFixture.inject(factoryName);
		var dataPagerFactory: IDataPagerFactory = services[factoryName];
		dataPager = dataPagerFactory.getInstance();
	});

	it('should restrict data set to page size', (): void => {
		dataPager.pageSize = 2;
		var result: number[] = dataPager.filter([1, 2, 3, 4]);
		expect(result).to.have.length(2);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal(2);
	});

	it('should skip to indicated page', (): void => {
		dataPager.pageNumber = 3;
		dataPager.pageSize = 1;
		var result: number[] = dataPager.filter([1, 2, 3, 4]);
		expect(result).to.have.length(1);
		expect(result[0]).to.equal(3);
	});

	it('should be empty if page goes past the end', (): void => {
		dataPager.pageNumber = 2;
		dataPager.pageSize = 8;
		var result: number[] = dataPager.filter([1, 2, 3, 4]);
		expect(result).to.be.empty;
	});

	it('should push paging changes to consumers', (): void => {
		const pageNumberSpy: Sinon.SinonSpy = sinon.spy();
		const pageSizeSpy: Sinon.SinonSpy = sinon.spy();

		dataPager.pageNumberChanges.subscribe(pageNumberSpy);
		dataPager.pageSizeChanges.subscribe(pageSizeSpy);

		dataPager.pageNumber = 2;
		dataPager.pageSize = 3;

		sinon.assert.calledOnce(pageNumberSpy);
		sinon.assert.calledWith(pageNumberSpy, 2);
		sinon.assert.calledOnce(pageSizeSpy);
		sinon.assert.calledWith(pageSizeSpy, 3);
	});
});
