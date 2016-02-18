/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../../typings/lodash/lodash.d.ts' />

'use strict';

import { services, filters } from 'typescript-angular-utilities';
import test = services.test;

import {
	ISmartDataSourceFactory,
	SmartDataSource,
	moduleName,
	factoryName,
} from './smartDataSource.service';

import {
	moduleName as dataSourcesModuleName,
	dataSourceProcessor as __dataSourceProcessor,
	events,
} from '../dataSources.module';

import { SortDirection } from '../../sorts/sort';

import * as angular from 'angular';
import 'angular-mocks';

interface IDataServiceMock {
	get: Sinon.SinonSpy;
}

interface ITestFilter extends filters.ISerializableFilter {
	value: number;
}

describe('smartDataSource', () => {
	let smartDataSourceFactory: ISmartDataSourceFactory;
	let dataSourceProcessor: __dataSourceProcessor.IDataSourceProcessor;
	let dataService: IDataServiceMock;
	let $rootScope: angular.IRootScopeService;
	let mock: test.mock.IMock;
	let appliedFilter: ITestFilter;
	let unappliedFilter: ITestFilter;
	let source: SmartDataSource<number>;
	let data: number[];

	beforeEach(() => {
		angular.mock.module(dataSourcesModuleName);
		angular.mock.module(test.mock.moduleName);
		angular.mock.module(moduleName);
		let dependencies: any = test.angularFixture.inject(
			factoryName, __dataSourceProcessor.processorServiceName, test.mock.serviceName, '$rootScope');
		smartDataSourceFactory = dependencies[factoryName];
		dataSourceProcessor = dependencies[__dataSourceProcessor.processorServiceName];
		mock = dependencies[test.mock.serviceName];
		$rootScope = dependencies.$rootScope;

		appliedFilter = <any>{
			type: 'filter1',
			filter: (item: number): boolean => { return true; },
			serialize: (): number => { return appliedFilter.value; },
			value: 1,
		};
		unappliedFilter = <any>{
			type: 'filter2',
			filter: (item: number): boolean => { return item === unappliedFilter.value; },
			serialize: (): number => { return unappliedFilter.value; },
			value: null,
		};

		data = [1, 2];

		dataService = mock.service();

		sinon.spy(dataSourceProcessor, 'processAndCount');

		mock.promise(dataService, 'get', { dataSet: data, count: 2 });

		source = <any>smartDataSourceFactory.getInstance<number>(<any>dataService.get);
		source.filters = {
			'filter1': appliedFilter,
			'filter2': unappliedFilter,
		};
		source.sorts = <any>[{
			column: { label: 'col1' },
			direction: SortDirection.none,
		}];
		source.pager = <any>{
			pageNumber: 1,
			pageSize: 2,
		};
	});

	describe('throttled', (): void => {
		beforeEach((): void => {
			data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			mock.promise(dataService, 'get', { dataSet: data, count: 20 });
			source.getDataSet = dataService.get;
			source.reload();
			mock.flush(dataService);
			dataService.get.reset();

			expect(source.throttled).to.be.true;
		});

		it('should make a request if any filter changes', (): void => {
			unappliedFilter.value = 2;
			source.refresh();
			sinon.assert.calledOnce(dataService.get);
		});

		it('should make a request if the sorts change', (): void => {
			source.sorts = <any>[{
				column: { label: 'col2' },
				direction: SortDirection.ascending,
			}];
			source.refresh();
			sinon.assert.calledOnce(dataService.get);
		});

		it('should handle paging without making a server request', (): void => {
			expect(source.dataSet).to.have.length(2);
			expect(source.dataSet[0]).to.equal(1);
			expect(source.dataSet[1]).to.equal(2);

			source.pager.pageNumber = 2;
			source.refresh();

			sinon.assert.notCalled(dataService.get);
			expect(source.dataSet[0]).to.equal(3);
			expect(source.dataSet[1]).to.equal(4);
		});
	});

	describe('not throttled', (): void => {
		beforeEach((): void => {
			data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			mock.promise(dataService, 'get', { dataSet: data, count: 10 });
			source.getDataSet = dataService.get;
			source.reload();
			mock.flush(dataService);
			dataService.get.reset();

			expect(source.throttled).to.be.false;
		});

		it('should make a request if any applied filter changes', (): void => {
			appliedFilter.value = 2;
			source.refresh();
			sinon.assert.calledOnce(dataService.get);
		});

		it('should handle an unapplied filter on the client', (): void => {
			unappliedFilter.value = 2;
			source.refresh();
			sinon.assert.notCalled(dataService.get);
			expect(source.dataSet).to.have.length(1);
		});

		it('should handle sorting on the client', (): void => {
			source.sorts = <any>[{
				column: { label: 'col2' },
				direction: SortDirection.ascending,
			}];
			source.refresh();
			sinon.assert.notCalled(dataService.get);
		});

		it('should handle paging without making a server request', (): void => {
			expect(source.dataSet).to.have.length(2);
			expect(source.dataSet[0]).to.equal(1);
			expect(source.dataSet[1]).to.equal(2);

			source.pager.pageNumber = 2;
			source.refresh();

			sinon.assert.notCalled(dataService.get);
			expect(source.dataSet[0]).to.equal(3);
			expect(source.dataSet[1]).to.equal(4);
		});
	});
});
