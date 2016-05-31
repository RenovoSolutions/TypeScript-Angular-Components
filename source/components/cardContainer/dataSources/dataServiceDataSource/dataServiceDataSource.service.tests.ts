import { services } from 'typescript-angular-utilities';
import test = services.test;
import async = test.async;

import {
	IDataServiceDataSourceFactory,
	IAsyncDataSource,
	moduleName,
	factoryName,
} from './dataServiceDataSource.service';

import {
	moduleName as dataSourcesModuleName,
	dataSourceProcessor as __dataSourceProcessor,
} from '../dataSources.module';

import * as angular from 'angular';
import 'angular-mocks';

import * as _ from 'lodash';

interface IDataServiceMock {
	get<TDataType>(): angular.IPromise<TDataType[]>;
}

describe('dataServiceDataSource', () => {
	let dataServiceDataSourceFactory: IDataServiceDataSourceFactory;
	let dataSourceProcessor: __dataSourceProcessor.IDataSourceProcessor;
	let dataService: IDataServiceMock;
	let $rootScope: angular.IRootScopeService;

	beforeEach(() => {
		angular.mock.module(dataSourcesModuleName);
		angular.mock.module(moduleName);

		let services: any = test.angularFixture.inject(
			factoryName, __dataSourceProcessor.processorServiceName, '$rootScope');
		dataServiceDataSourceFactory = services[factoryName];
		dataSourceProcessor = services[__dataSourceProcessor.processorServiceName];
		$rootScope = services.$rootScope;

		dataService = <any> {};

		sinon.spy(dataSourceProcessor, 'processAndCount');
	});

	describe('loading', (): void => {
		it('should call data processor to process the data when refreshing', async((): void => {
			dataService.get = test.mock.promise([1, 2, 3]);

			dataServiceDataSourceFactory.getInstance<number>(dataService.get);
			test.mock.flushAll(dataService).then(() => {
				sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceProcessor.processAndCount);
			});
		}));

		it('should make an initial request to the server for data', async((): void => {
			dataService.get = test.mock.promise([1, 2]);

			let source: IAsyncDataSource<number> = dataServiceDataSourceFactory.getInstance<number>(dataService.get);

			let reloadedSpy: Sinon.SinonSpy = sinon.spy();
			source.reloaded.subscribe(reloadedSpy);
			let changedSpy: Sinon.SinonSpy = sinon.spy();
			source.changed.subscribe(changedSpy);

			test.mock.flushAll(dataService).then(() => {
				expect(source.dataSet).to.have.length(2);
				expect(source.dataSet[0]).to.equal(1);
				expect(source.dataSet[1]).to.equal(2);
				expect(source.count).to.equal(2);

				sinon.assert.calledOnce(reloadedSpy);
				sinon.assert.calledOnce(changedSpy);
			});
		}));
	});
});
