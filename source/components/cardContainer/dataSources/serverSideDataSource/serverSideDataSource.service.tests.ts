/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../../typings/lodash/lodash.d.ts' />

'use strict';

import { services, filters } from 'typescript-angular-utilities';
import test = services.test;

import {
	IServerSideDataSourceFactory,
	IServerSideDataSource,
	moduleName,
	factoryName,
} from './serverSideDataSource.service';

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
}

describe('serverSideDataSource', () => {
	let serverSideDataSourceFactory: IServerSideDataSourceFactory;
	let dataSourceProcessor: __dataSourceProcessor.IDataSourceProcessor;
	let dataService: IDataServiceMock;
	let $rootScope: angular.IRootScopeService;
	let mock: test.mock.IMock;
	let filter: ITestFilter;
	let source: IServerSideDataSource<number>;

	beforeEach(() => {
		angular.mock.module(dataSourcesModuleName);
		angular.mock.module(test.mock.moduleName);
		angular.mock.module(moduleName);
		let dependencies: any = test.angularFixture.inject(
			factoryName, __dataSourceProcessor.processorServiceName, test.mock.serviceName, '$rootScope');
		serverSideDataSourceFactory = dependencies[factoryName];
		dataSourceProcessor = dependencies[__dataSourceProcessor.processorServiceName];
		mock = dependencies[test.mock.serviceName];
		$rootScope = dependencies.$rootScope;

		filter = <any>{
			type: 'myFilter',
			filter: (item: number): boolean => { return item === filter.value; },
			serialize: (): number => { return filter.value; },
			value: 1,
		};

		dataService = mock.service();

		sinon.spy(dataSourceProcessor, 'processAndCount');

		mock.promise(dataService, 'get', { dataSet: [1, 2], count: 2 });

		source = <any>serverSideDataSourceFactory.getInstance<number>(<any>dataService.get);
		source.filters = <any>[filter];
		source.sorts = <any>[{
			column: { label: 'col1' },
			direction: SortDirection.none,
		}];
		source.pager = <any>{
			pageNumber: 5,
			pageSize: 10,
		};
	});

	it('should serialize the filters and apply the values to the server request', (): void => {
		source.refresh();

		let filterValues: any = dataService.get.firstCall.args[0].filters;
		expect(filterValues['myFilter']).to.equal(1);
	});

	it('should apply sorts to the server request', (): void => {
		source.refresh();

		let sorts: any = dataService.get.firstCall.args[0].sorts;
		expect(sorts[0].column).to.equal('col1');
		expect(sorts[0].direction).to.equal('none');
	});

	it('should apply the paging data to the server request', (): void => {
		source.refresh();

		let paging: any = dataService.get.firstCall.args[0].paging;
		expect(paging.pageNumber).to.equal(5);
		expect(paging.pageSize).to.equal(10);
	});

	it('should specify no value for unserializable filters', (): void => {
		let clientSideFilter: any = { filter: (item: number): boolean => { return item === 1; }};
		source.filters = [clientSideFilter];
		source.refresh();

		let filterValues: any = dataService.get.firstCall.args[0].filters;
		expect(filters['clientSideFilter']).to.not.exist;
	});

	it('should set the data set and count with the response from the server', (): void => {
		source.refresh();
		mock.flush(dataService);
		$rootScope.$digest();

		expect(source.dataSet[0]).to.equal(1);
		expect(source.dataSet[1]).to.equal(2);
		expect(source.count).to.equal(2);
	});
});
