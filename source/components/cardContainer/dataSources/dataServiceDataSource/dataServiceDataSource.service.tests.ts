/// <reference path='../../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	IDataServiceDataSourceFactory,
	IDataServiceDataSource,
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
	let mock: test.mock.IMock;

	beforeEach(() => {
		angular.mock.module(dataSourcesModuleName);
		angular.mock.module(test.mock.moduleName);
		angular.mock.module(moduleName);

		let services: any = test.angularFixture.inject(
			factoryName, __dataSourceProcessor.processorServiceName, '$rootScope', test.mock.serviceName);
		dataServiceDataSourceFactory = services[factoryName];
		dataSourceProcessor = services[__dataSourceProcessor.processorServiceName];
		$rootScope = services.$rootScope;
		mock = services[test.mock.serviceName];

		dataService = mock.service();

		sinon.spy(dataSourceProcessor, 'processAndCount');
	});

	describe('loading', (): void => {
		it('should call data processor to process the data when refreshing', (): void => {
			mock.promise(dataService, 'get', [1, 2, 3]);

			dataServiceDataSourceFactory.getInstance<number>(dataService.get);
			mock.flush(dataService);
			$rootScope.$digest();

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceProcessor.processAndCount);
		});

		it('should make an initial request to the server for data', (): void => {
			mock.promise(dataService, 'get', [1, 2]);

			let source: IDataServiceDataSource<number> = dataServiceDataSourceFactory.getInstance<number>(dataService.get);

			let reloadedSpy: Sinon.SinonSpy = sinon.spy();
			source.watch(reloadedSpy, 'reloaded');
			let changedSpy: Sinon.SinonSpy = sinon.spy();
			source.watch(changedSpy, 'changed');

			mock.flush(dataService);
			$rootScope.$digest();

			expect(source.dataSet).to.have.length(2);
			expect(source.dataSet[0]).to.equal(1);
			expect(source.dataSet[1]).to.equal(2);
			expect(source.count).to.equal(2);

			sinon.assert.calledOnce(reloadedSpy);
			sinon.assert.calledOnce(changedSpy);
		});
	});
});
