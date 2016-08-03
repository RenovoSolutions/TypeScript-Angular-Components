import { addProviders, inject } from '@angular/core/testing';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import test = services.test;
import fakeAsync = test.fakeAsync;
import __array = services.array;
import __synchronizedRequests = services.synchronizedRequests;

import { AsyncDataSource, IDataSource } from './asyncDataSource.service';

import { DataSourceProcessor } from './dataSourceProcessor.service';
import { Sorter } from '../sorts/sorter/sorter.service';
import { MergeSort } from '../sorts/mergeSort/mergeSort.service';

interface IDataServiceMock {
	get: Sinon.SinonSpy;
}

describe('AsyncDataSource', () => {
	let dataSourceProcessor: DataSourceProcessor;
	let dataService: IDataServiceMock;
	let source: AsyncDataSource<number>;
	let reloadedSpy: Sinon.SinonSpy;
	let changedSpy: Sinon.SinonSpy;
	let redrawingSpy: Sinon.SinonSpy;

	beforeEach(() => {
		dataService = {
			get: test.mock.promise([1, 2]),
		};
		addProviders([
			DataSourceProcessor,
			Sorter,
			MergeSort,
			services.UTILITY_PROVIDERS,
		]);
		inject([DataSourceProcessor, __array.ArrayUtility, __synchronizedRequests.SynchronizedRequestsFactory]
				, (dataSourceProcessor, array, synchronizedRequestsFactory) => {
			source = new AsyncDataSource<number>(dataService.get, dataSourceProcessor, array, synchronizedRequestsFactory);
		})();

		reloadedSpy = sinon.spy();
		changedSpy = sinon.spy();
		redrawingSpy = sinon.spy();
		source.reloaded.subscribe(reloadedSpy);
		source.changed.subscribe(changedSpy);
		source.redrawing.subscribe(redrawingSpy);
		source.processData = sinon.spy();
	});

	it('should call make a request to get the data when reload is called', fakeAsync((): void => {
		source.reload();

		sinon.assert.calledOnce(dataService.get);

		test.mock.flushAll(dataService);

		sinon.assert.calledOnce(<Sinon.SinonSpy>source.processData);
	}));

	it('should fire changed, reloaded, and redrawing events when the reload completeds', fakeAsync((): void => {
		source.reload();
		test.mock.flushAll(dataService);
		sinon.assert.calledOnce(changedSpy);
		sinon.assert.calledOnce(reloadedSpy);
		sinon.assert.calledOnce(redrawingSpy);
	}));

	it('should allow the consumer to specify params for the request', (): void => {
		(<any>source).getParams = sinon.spy((): number => { return 4; });
		source.reload();
		sinon.assert.calledOnce(dataService.get);
		sinon.assert.calledWith(dataService.get, 4);
	});
});
