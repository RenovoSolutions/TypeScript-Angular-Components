import * as _ from 'lodash';

import { services, downgrade } from 'typescript-angular-utilities';
import test = services.test;
import __array = services.array;
import __synchronizedRequests = services.synchronizedRequests;

import {
	AsyncDataSource,
} from './asyncDataSource.service';

import {
	IDataSource,
	moduleName,
	dataSourceProcessor as __dataSourceProcessor,
} from './dataSources.module';

import * as angular from 'angular';
import 'angular-mocks';

interface IDataServiceMock {
	get: Sinon.SinonSpy;
}

describe('asyncDataSource', () => {
	let dataSourceProcessor: __dataSourceProcessor.IDataSourceProcessor;
	let dataService: IDataServiceMock;
	let $rootScope: angular.IRootScopeService;
	let source: AsyncDataSource<number>;
	let reloadedSpy: Sinon.SinonSpy;
	let changedSpy: Sinon.SinonSpy;
	let redrawingSpy: Sinon.SinonSpy;
	let $q: angular.IQService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = test.angularFixture.inject('$rootScope'
													, '$q'
													, downgrade.arrayServiceName
													, downgrade.synchronizedRequestsServiceName);

		$rootScope = services.$rootScope;
		$q = services.$q;

		dataService = {
			get: test.mock.promise([1, 2]),
		};

		source = new AsyncDataSource<number>(dataService.get
											, <any>dataSourceProcessor
											, services[downgrade.arrayServiceName]
											, services[downgrade.synchronizedRequestsServiceName]);

		reloadedSpy = sinon.spy();
		changedSpy = sinon.spy();
		redrawingSpy = sinon.spy();
		source.reloaded.subscribe(reloadedSpy);
		source.changed.subscribe(changedSpy);
		source.redrawing.subscribe(redrawingSpy);
		source.processData = sinon.spy();
	});

	it('should call make a request to get the data when reload is called', (): void => {
		source.reload();

		sinon.assert.calledOnce(dataService.get);

		test.mock.flushAll(dataService);

		sinon.assert.calledOnce(<Sinon.SinonSpy>source.processData);
	});

	it('should fire changed, reloaded, and redrawing events when the reload completeds', (): void => {
		source.reload();
		test.mock.flushAll(dataService);
		sinon.assert.calledOnce(changedSpy);
		sinon.assert.calledOnce(reloadedSpy);
		sinon.assert.calledOnce(redrawingSpy);
	});

	it('should allow the consumer to specify params for the request', (): void => {
		(<any>source).getParams = sinon.spy((): number => { return 4; });
		source.reload();
		sinon.assert.calledOnce(dataService.get);
		sinon.assert.calledWith(dataService.get, 4);
	});

	it('should accept the results from only the most recent request', (): void => {
		let firstRequestData: number[] = [1, 2];
		let secondRequestData: number[] = [3, 4];
		let firstRequest: angular.IDeferred<number[]> = $q.defer<number[]>();
		let secondRequest: angular.IDeferred<number[]> = $q.defer<number[]>();

		let get: Sinon.SinonSpy = sinon.spy((): angular.IPromise<number[]> => { return firstRequest.promise; });

		source.getDataSet = get;

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
