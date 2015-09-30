/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../../typings/lodash/lodash.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;
import genericSearchFilter = services.genericSearchFilter;

import {
	IServerSearchDataSourceFactory,
	IServerSearchDataSource,
	moduleName,
	factoryName,
} from './serverSearchDataSource.service';

import {
	moduleName as dataSourcesModuleName,
	dataSourceProcessor as __dataSourceProcessor,
} from '../dataSources.module';

import * as angular from 'angular';
import 'angular-mocks';

interface IDataServiceMock {
	get(search: string): angular.IPromise<number[]>;
}

describe('serverSearchDataSource', () => {
	let serverSearchDataSourceFactory: IServerSearchDataSourceFactory;
	let dataSourceProcessor: __dataSourceProcessor.IDataSourceProcessor;
	let dataService: IDataServiceMock;
	let $rootScope: angular.IRootScopeService;
	let mock: test.mock.IMock;
	let searchFilter: genericSearchFilter.IGenericSearchFilter;
	let source: IServerSearchDataSource<number>;
	let reloadedSpy: Sinon.SinonSpy;
	let changedSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(genericSearchFilter.moduleName);
		angular.mock.module(dataSourcesModuleName);
		angular.mock.module(test.mock.moduleName);
		angular.mock.module(moduleName);
		let dependencies: any = test.angularFixture.inject(
			factoryName, __dataSourceProcessor.processorServiceName, '$rootScope', test.mock.serviceName, genericSearchFilter.factoryName);
		serverSearchDataSourceFactory = dependencies[factoryName];
		dataSourceProcessor = dependencies[__dataSourceProcessor.processorServiceName];
		$rootScope = dependencies.$rootScope;
		mock = dependencies[test.mock.serviceName];
		searchFilter = dependencies[genericSearchFilter.factoryName].getInstance();

		dataService = mock.service();

		sinon.spy(dataSourceProcessor, 'processAndCount');

		mock.promise(dataService, 'get', [1, 2]);

		source = <any>serverSearchDataSourceFactory.getInstance<number>(<any>dataService.get, searchFilter);

		reloadedSpy = sinon.spy();
		source.watch(reloadedSpy, 'reloaded');
		changedSpy = sinon.spy();
		source.watch(changedSpy, 'changed');
	});

	describe('server search', (): void => {
		it('should call data processor to process the data when refreshing', (): void => {
			searchFilter.searchText = 'search';
			source.reload();

			mock.flush(dataService);

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceProcessor.processAndCount);
		});

		it('should make a request to reload the data when the search text changes', (): void => {
			searchFilter.searchText = 'search';
			source.refresh();

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataService.get);

			mock.flush(dataService);

			expect(source.dataSet).to.have.length(2);
			expect(source.dataSet[0]).to.equal(1);
			expect(source.dataSet[1]).to.equal(2);
			expect(source.count).to.equal(2);

			sinon.assert.calledOnce(reloadedSpy);
			sinon.assert.calledOnce(changedSpy);

			searchFilter.searchText = 'search 2';
			source.refresh();

			sinon.assert.calledTwice(<Sinon.SinonSpy>dataService.get);

			mock.flush(dataService);

			sinon.assert.calledTwice(reloadedSpy);
			sinon.assert.calledTwice(changedSpy);
		});

		it('should clear the data set without making a request if no search is provided', (): void => {
			searchFilter.searchText = '';
			source.refresh();

			sinon.assert.notCalled(<Sinon.SinonSpy>dataService.get);

			expect(source.dataSet).to.be.null;
		});

		it('should clear the data set without making a request if search is less than minimum length', (): void => {
			searchFilter.searchText = 'se';
			source.refresh();

			sinon.assert.notCalled(<Sinon.SinonSpy>dataService.get);

			expect(source.dataSet).to.be.null;
		});
	});
});
