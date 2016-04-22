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

interface ITestFilter extends filters.ISerializableFilter<number> {
	value: number;
	trigger: Function;
	dispose: Sinon.SinonSpy;
}

interface IDataSourceProcessorMock {
	process: Sinon.SinonSpy;
	sort: Sinon.SinonSpy;
	page: Sinon.SinonSpy;
}

describe('smartDataSource', () => {
	let smartDataSourceFactory: ISmartDataSourceFactory;
	let dataSourceProcessor: IDataSourceProcessorMock;
	let dataService: IDataServiceMock;
	let $rootScope: angular.IRootScopeService;
	let appliedFilter: ITestFilter;
	let unappliedFilter: ITestFilter;
	let source: SmartDataSource<number>;
	let data: number[];

	beforeEach(() => {
		angular.mock.module(dataSourcesModuleName);
		angular.mock.module(test.moduleName);
		angular.mock.module(moduleName);

		let dependencies: any = test.angularFixture.inject(
			factoryName, __dataSourceProcessor.processorServiceName, '$rootScope');
		smartDataSourceFactory = dependencies[factoryName];
		dataSourceProcessor = dependencies[__dataSourceProcessor.processorServiceName];
		$rootScope = dependencies.$rootScope;

		appliedFilter = <any>{
			type: 'filter1',
			filter: (item: number): boolean => { return true; },
			serialize: (): number => { return appliedFilter.value; },
			value: 1,
			trigger: null,
			dispose: sinon.spy(),
			subscribe: (callback: Function): any => {
				appliedFilter.trigger = callback;
				return {
					dispose: appliedFilter.dispose,
				};
			},
		};
		unappliedFilter = <any>{
			type: 'filter2',
			filter: (item: number): boolean => { return item === unappliedFilter.value; },
			serialize: (): number => { return unappliedFilter.value; },
			value: null,
			trigger: null,
			dispose: sinon.spy(),
			subscribe: (callback: Function): any => {
				unappliedFilter.trigger = callback;
				return {
					dispose: unappliedFilter.dispose,
				};
			},
		};

		data = [1, 2];

		dataService = {
			get: test.mock.promise({ dataSet: data, count: 2 }),
		};

		dataSourceProcessor.process = sinon.spy((data: any): any => { return { dataSet: data }; });
		dataSourceProcessor.sort = sinon.spy();
		dataSourceProcessor.page = sinon.spy();

		source = <any>smartDataSourceFactory.getInstance<number>(<any>dataService.get);
		source.filters = <any>[appliedFilter, unappliedFilter];
		source.sorts = <any>[{
			column: { label: 'col1' },
			direction: SortDirection.none,
		}];
		source.pager = <any>{
			pageNumber: 1,
			pageSize: 2,
			filter: sinon.spy(),
		};
	});

	it('should use the count returned by the server when a reload resolves', (): void => {
		let clientCount: number = 2;
		let serverCount: number = 4;
		dataSourceProcessor.process = sinon.spy((data: any): any => {
			return {
				dataSet: data,
				count: clientCount,
			};
		});

		data = [1, 2, 3, 4];
		dataService.get = test.mock.promise({ dataSet: data, count: serverCount });
		source.getDataSet = dataService.get;
		source.reload();
		test.mock.flushAll(dataService);

		expect(source.count).to.equal(serverCount);
	});

	describe('throttled', (): void => {
		beforeEach((): void => {
			data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			dataService.get = test.mock.promise({ dataSet: data, count: 20 });
			source.getDataSet = dataService.get;
			source.reload();
			test.mock.flushAll(dataService);
			dataService.get.reset();

			expect(source.throttled).to.be.true;
		});

		it('should make a request when excecuting a full refresh', (): void => {
			source.refresh();
			sinon.assert.calledOnce(dataService.get);
		});

		it('should make a request if the sorts change', (): void => {
			source.onSortChange();
			sinon.assert.calledOnce(dataService.get);
		});

		it('should handle paging without making a server request', (): void => {
			source.onPagingChange();
			sinon.assert.calledOnce(dataSourceProcessor.page);
			sinon.assert.notCalled(dataService.get);
		});
	});

	describe('not throttled', (): void => {
		beforeEach((): void => {
			data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			dataService.get = test.mock.promise({ dataSet: data, count: 10 });
			source.getDataSet = dataService.get;
			source.reload();
			test.mock.flushAll(dataService);
			dataService.get.reset();
			dataSourceProcessor.process.reset();

			expect(source.throttled).to.be.false;
		});

		it('should make a request if any applied filter changes', (): void => {
			appliedFilter.trigger();
			sinon.assert.calledOnce(dataService.get);
		});

		it('should handle an unapplied filter on the client', (): void => {
			unappliedFilter.value = 2;
			source.refresh();
			sinon.assert.notCalled(dataService.get);
			sinon.assert.calledOnce(dataSourceProcessor.process);
		});

		it('should handle sorting on the client', (): void => {
			source.onSortChange();
			sinon.assert.calledOnce(dataSourceProcessor.sort);
			sinon.assert.calledOnce(dataSourceProcessor.page);
			sinon.assert.notCalled(dataService.get);
		});

		it('should handle paging without making a server request', (): void => {
			source.onPagingChange();
			sinon.assert.calledOnce(dataSourceProcessor.page);
			sinon.assert.notCalled(dataService.get);
		});
	});
});
