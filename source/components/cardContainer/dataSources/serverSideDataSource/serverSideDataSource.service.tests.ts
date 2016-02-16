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

import * as angular from 'angular';
import 'angular-mocks';

interface IDataServiceMock {
	get: Sinon.SinonSpy;
}

describe('serverSideDataSource', () => {
	let serverSideDataSourceFactory: IServerSideDataSourceFactory;
	let dataSourceProcessor: __dataSourceProcessor.IDataSourceProcessor;
	let dataService: IDataServiceMock;
	let $rootScope: angular.IRootScopeService;
	let mock: test.mock.IMock;
	let filter: filters.ISerializableFilter;
	let source: IServerSideDataSource<number>;

	beforeEach(() => {
		angular.mock.module(dataSourcesModuleName);
		angular.mock.module(test.mock.moduleName);
		angular.mock.module(moduleName);
		let dependencies: any = test.angularFixture.inject(
			factoryName, __dataSourceProcessor.processorServiceName, test.mock.serviceName);
		serverSideDataSourceFactory = dependencies[factoryName];
		dataSourceProcessor = dependencies[__dataSourceProcessor.processorServiceName];
		mock = dependencies[test.mock.serviceName];

		filter = {
			type: 'myFilter',
			filter: (item: number): boolean => { return item === this.value; },
			serialize: (): number => { return this.value; },
			value: 1,
		};

		dataService = mock.service();

		sinon.spy(dataSourceProcessor, 'processAndCount');

		mock.promise(dataService, 'get', [1, 2]);

		source = <any>serverSideDataSourceFactory.getInstance<number>(<any>dataService.get);
		source.filters = { 'myFilter': filter };
		source.sorts = <any>[{
			column: { label: 'col1' },
			direction: 1,
		}];
		source.pager = {
			pageNumber: 5,
			pageSize: 10,
		};
	});

	it('should serialize the filters and apply the values to the server request', (): void => {
		source.refresh();

		let filterValues: any = dataService.get.firstCall.args[0].filters;
		expect(filters['myFilter']).to.equal(1);
	});

	it('should apply sorts to the server request', (): void => {
		source.refresh();

		let sorts: any = dataService.get.firstCall.args[0].sorts;
		expect(sorts[0].column).to.equal('col1');
		expect(sorts[0].direction).to.equal(1);
	});

	it('should apply the paging data to the server request', (): void => {
		source.refresh();

		let paging: any = dataService.get.firstCall.args[0].paging;
		expect(paging.pageNumber).to.equal(5);
		expect(paging.pageSize).to.equal(10);
	});
});
