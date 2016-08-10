import { addProviders, inject } from '@angular/core/testing';

import { services } from 'typescript-angular-utilities';
import test = services.test;
import fakeAsync = test.fakeAsync;
import __genericSearchFilter = services.genericSearchFilter;
import __object = services.object;
import __array = services.array;
import __synchronizedRequests = services.synchronizedRequests;

import { ClientServerDataSource } from './clientServerDataSource.service';

import { DataSourceProcessor } from '../dataSourceProcessor.service';
import { Sorter } from '../../sorts/sorter/sorter.service';
import { MergeSort } from '../../sorts/mergeSort/mergeSort.service';

import * as angular from 'angular';
import 'angular-mocks';

interface IDataServiceMock {
	get(search: string): angular.IPromise<number[]>;
}

interface ITestFilterModel {
	prop: string;
}

describe('ClientServerDataSource', () => {
	let dataSourceProcessor: DataSourceProcessor;
	let dataService: IDataServiceMock;
	let searchFilter: __genericSearchFilter.IGenericSearchFilter;
	let source: ClientServerDataSource<number>;
	let reloadedSpy: Sinon.SinonSpy;
	let changedSpy: Sinon.SinonSpy;

	beforeEach(() => {
		addProviders([
			DataSourceProcessor,
			Sorter,
			MergeSort,
			services.UTILITY_PROVIDERS,
		]);
		inject([DataSourceProcessor, __genericSearchFilter.GenericSearchFilterFactory]
			, (_dataSourceProcessor, genericSearchFactory) => {

			dataSourceProcessor = _dataSourceProcessor;
			sinon.spy(dataSourceProcessor, 'processAndCount');
			searchFilter = genericSearchFactory.getInstance(false);
		})();

		dataService = {
			get: test.mock.promise([1, 2]),
		};

		reloadedSpy = sinon.spy();
		changedSpy = sinon.spy();
	});

	describe('server search', (): void => {
		beforeEach(inject([__array.ArrayUtility, __object.ObjectUtility, __synchronizedRequests.SynchronizedRequestsFactory]
			, (arrayUtility, objectUtility, synchronizedRequestsFactory): void => {
			source = new ClientServerDataSource<number>(<any>dataService.get
				, searchFilter
				, null
				, null
				, dataSourceProcessor
				, arrayUtility
				, objectUtility
				, synchronizedRequestsFactory);
			source.reloaded.subscribe(reloadedSpy);
			source.changed.subscribe(changedSpy);
		}));

		it('should call data processor to process the data when refreshing', fakeAsync((): void => {
			searchFilter.searchText = 'search';
			source.reload();

			test.mock.flushAll(dataService);

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceProcessor.processAndCount);
		}));

		it('should make a request to reload the data when the search text changes', fakeAsync((): void => {
			searchFilter.searchText = 'search';
			source.refresh();

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataService.get);

			test.mock.flushAll(dataService)

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
		}));

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

	describe('filter model', (): void => {
		let filterModel: ITestFilterModel;
		let validateSpy: Sinon.SinonSpy;

		beforeEach(inject([__array.ArrayUtility, __object.ObjectUtility, __synchronizedRequests.SynchronizedRequestsFactory]
			, (arrayUtility, objectUtility, synchronizedRequestsFactory): void => {
			validateSpy = sinon.spy((model: ITestFilterModel): boolean => {
				return model.prop != null;
			});

			let getFilterModel: any = (): ITestFilterModel => { return filterModel; };

			source = new ClientServerDataSource<number>(<any>dataService.get
				, searchFilter
				, getFilterModel
				, validateSpy
				, dataSourceProcessor
				, arrayUtility
				, objectUtility
				, synchronizedRequestsFactory);
			source.reloaded.subscribe(reloadedSpy);
			source.changed.subscribe(changedSpy);
		}));

		it('should make a request to reload the data when the filter model changes', fakeAsync((): void => {
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
		}));

		it('should clear the data set without making a request if filter model is invalid', (): void => {
			filterModel = { prop: null };
			source.refresh();

			sinon.assert.notCalled(<Sinon.SinonSpy>dataService.get);

			expect(source.dataSet).to.be.null;
		});
	});
});
