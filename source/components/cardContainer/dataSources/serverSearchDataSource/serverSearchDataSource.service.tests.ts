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

interface ITestFilterModel {
	prop: string;
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
	let $q: angular.IQService;

	beforeEach(() => {
		angular.mock.module(genericSearchFilter.moduleName);
		angular.mock.module(dataSourcesModuleName);
		angular.mock.module(test.mock.moduleName);
		angular.mock.module(moduleName);
		let dependencies: any = test.angularFixture.inject(
			factoryName, __dataSourceProcessor.processorServiceName, '$rootScope', test.mock.serviceName, genericSearchFilter.factoryName, '$q');
		serverSearchDataSourceFactory = dependencies[factoryName];
		dataSourceProcessor = dependencies[__dataSourceProcessor.processorServiceName];
		$rootScope = dependencies.$rootScope;
		mock = dependencies[test.mock.serviceName];
		$q = dependencies.$q;
		searchFilter = dependencies[genericSearchFilter.factoryName].getInstance();

		dataService = mock.service();

		sinon.spy(dataSourceProcessor, 'processAndCount');

		mock.promise(dataService, 'get', [1, 2]);

		reloadedSpy = sinon.spy();
		changedSpy = sinon.spy();
	});

	describe('server search', (): void => {
		beforeEach((): void => {
			source = <any>serverSearchDataSourceFactory.getInstance<number>(<any>dataService.get, searchFilter);
			source.watch(reloadedSpy, 'reloaded');
			source.watch(changedSpy, 'changed');
		});

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

		it('should accept the results from only the most recent request', (): void => {
			let firstRequestData: number[] = [1, 2];
			let secondRequestData: number[] = [3, 4];
			let firstRequest: angular.IDeferred<number[]> = $q.defer<number[]>();
			let secondRequest: angular.IDeferred<number[]> = $q.defer<number[]>();

			let get: Sinon.SinonSpy = sinon.spy((): angular.IPromise<number[]> => { return firstRequest.promise; });

			source = <any>serverSearchDataSourceFactory.getInstance(get, searchFilter);
			searchFilter.searchText = 'search';
			source.reload();

			sinon.assert.calledOnce(get);

			get = sinon.spy((): angular.IPromise<number[]> => { return secondRequest.promise; });

			source.getDataSet = get;
			source.reload();

			sinon.assert.calledOnce(get);

			firstRequest.resolve(firstRequestData);
			$rootScope.$digest();

			expect(source.rawDataSet).to.not.exist;

			secondRequest.resolve(secondRequestData);
			$rootScope.$digest();

			expect(source.rawDataSet).to.equal(secondRequestData);
		});
	});

	describe('filter model', (): void => {
		let filterModel: ITestFilterModel;
		let validateSpy: Sinon.SinonSpy;

		beforeEach((): void => {
			validateSpy = sinon.spy((model: ITestFilterModel): boolean => {
				return model.prop != null;
			});

			let getFilterModel: any = (): ITestFilterModel => { return filterModel; };

			source = <any>serverSearchDataSourceFactory.getInstance<number>(<any>dataService.get, searchFilter, getFilterModel, validateSpy);
			source.watch(reloadedSpy, 'reloaded');
			source.watch(changedSpy, 'changed');
		});

		it('should make a request to reload the data when the filter model changes', (): void => {
			filterModel = { prop: '123' };
			source.refresh();

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataService.get);

			mock.flush(dataService);

			expect(source.dataSet).to.have.length(2);
			expect(source.dataSet[0]).to.equal(1);
			expect(source.dataSet[1]).to.equal(2);
			expect(source.count).to.equal(2);

			sinon.assert.calledOnce(reloadedSpy);
			sinon.assert.calledOnce(changedSpy);

			filterModel.prop = '456';
			source.refresh();

			sinon.assert.calledTwice(<Sinon.SinonSpy>dataService.get);

			mock.flush(dataService);

			sinon.assert.calledTwice(reloadedSpy);
			sinon.assert.calledTwice(changedSpy);
		});

		it('should clear the data set without making a request if filter model is invalid', (): void => {
			filterModel = { prop: null };
			source.refresh();

			sinon.assert.notCalled(<Sinon.SinonSpy>dataService.get);

			expect(source.dataSet).to.be.null;
		});
	});
});
