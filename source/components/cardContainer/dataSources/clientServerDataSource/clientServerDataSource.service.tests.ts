import { services, downgrade } from 'typescript-angular-utilities';
import test = services.test;
import genericSearchFilter = services.genericSearchFilter;

import {
	IClientServerDataSourceFactory,
	IClientServerDataSource,
	moduleName,
	factoryName,
} from './clientServerDataSource.service';

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

describe('clientServerDataSource', () => {
	let clientServerDataSourceFactory: IClientServerDataSourceFactory;
	let dataSourceProcessor: __dataSourceProcessor.IDataSourceProcessor;
	let dataService: IDataServiceMock;
	let $rootScope: angular.IRootScopeService;
	let searchFilter: genericSearchFilter.IGenericSearchFilter;
	let source: IClientServerDataSource<number>;
	let reloadedSpy: Sinon.SinonSpy;
	let changedSpy: Sinon.SinonSpy;
	let $q: angular.IQService;

	beforeEach(() => {
		angular.mock.module(dataSourcesModuleName);
		angular.mock.module(moduleName);
		let dependencies: any = test.angularFixture.inject(
			factoryName, __dataSourceProcessor.processorServiceName, '$rootScope', downgrade.genericSearchFilterServiceName, '$q');
		clientServerDataSourceFactory = dependencies[factoryName];
		dataSourceProcessor = dependencies[__dataSourceProcessor.processorServiceName];
		$rootScope = dependencies.$rootScope;
		$q = dependencies.$q;
		searchFilter = dependencies[downgrade.genericSearchFilterServiceName].getInstance();

		dataService = {
			get: test.mock.promise([1, 2]),
		};

		sinon.spy(dataSourceProcessor, 'processAndCount');

		reloadedSpy = sinon.spy();
		changedSpy = sinon.spy();
	});

	describe('server search', (): void => {
		beforeEach((): void => {
			source = <any>clientServerDataSourceFactory.getInstance<number>(<any>dataService.get, searchFilter);
			source.reloaded.subscribe(reloadedSpy);
			source.changed.subscribe(changedSpy);
		});

		it('should call data processor to process the data when refreshing', (): void => {
			searchFilter.searchText = 'search';
			source.reload();

			test.mock.flushAll(dataService);

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceProcessor.processAndCount);
		});

		it('should make a request to reload the data when the search text changes', (): void => {
			searchFilter.searchText = 'search';
			source.refresh();

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataService.get);

			test.mock.flushAll(dataService);

			expect(source.dataSet).to.have.length(2);
			expect(source.dataSet[0]).to.equal(1);
			expect(source.dataSet[1]).to.equal(2);
			expect(source.count).to.equal(2);

			sinon.assert.calledOnce(reloadedSpy);
			sinon.assert.calledOnce(changedSpy);

			searchFilter.searchText = 'search 2';
			source.refresh();

			sinon.assert.calledTwice(<Sinon.SinonSpy>dataService.get);

			test.mock.flushAll(dataService);

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

			source = <any>clientServerDataSourceFactory.getInstance(get, searchFilter);
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

			source = <any>clientServerDataSourceFactory.getInstance<number>(<any>dataService.get, searchFilter, getFilterModel, validateSpy);
			source.reloaded.subscribe(reloadedSpy);
			source.changed.subscribe(changedSpy);
		});

		it('should make a request to reload the data when the filter model changes', (): void => {
			filterModel = { prop: '123' };
			source.refresh();

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataService.get);

			test.mock.flushAll(dataService);

			expect(source.dataSet).to.have.length(2);
			expect(source.dataSet[0]).to.equal(1);
			expect(source.dataSet[1]).to.equal(2);
			expect(source.count).to.equal(2);

			sinon.assert.calledOnce(reloadedSpy);
			sinon.assert.calledOnce(changedSpy);

			filterModel.prop = '456';
			source.refresh();

			sinon.assert.calledTwice(<Sinon.SinonSpy>dataService.get);

			test.mock.flushAll(dataService);

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
