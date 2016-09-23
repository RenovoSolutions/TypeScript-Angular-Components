import { services } from 'typescript-angular-utilities';
import test = services.test;
import rlFakeAsync = test.rlFakeAsync;
import __object = services.object;
import __array = services.array;
import __transform = services.transform;

import { DataServiceDataSource, IAsyncDataSource } from './dataServiceDataSource.service';

import { DataSourceProcessor } from '../dataSourceProcessor.service';
import { Sorter } from '../../sorts/sorter/sorter.service';
import { MergeSort } from '../../sorts/mergeSort/mergeSort.service';

import * as _ from 'lodash';

interface IDataServiceMock {
	get<TDataType>(): angular.IPromise<TDataType[]>;
}

describe('DataServiceDataSource', () => {
	let dataSourceProcessor: DataSourceProcessor;
	let dataService: IDataServiceMock;
	let arrayUtility: __array.ArrayUtility;

	beforeEach(() => {
		dataSourceProcessor = new DataSourceProcessor(__object.objectUtility, new Sorter(new MergeSort(), __transform.transform));
		sinon.spy(dataSourceProcessor, 'processAndCount');
		arrayUtility = __array.arrayUtility;

		dataService = <any> {};
	});

	describe('loading', (): void => {
		it('should call data processor to process the data when refreshing', rlFakeAsync((): void => {
			dataService.get = test.mock.promise([1, 2, 3]);

			new DataServiceDataSource(dataService.get, dataSourceProcessor, arrayUtility);
			test.mock.flushAll(dataService)

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSourceProcessor.processAndCount);
		}));

		it('should make an initial request to the server for data', rlFakeAsync((): void => {
			dataService.get = test.mock.promise([1, 2]);

			let source: IAsyncDataSource<number> = new DataServiceDataSource<number>(dataService.get, dataSourceProcessor, arrayUtility);

			let reloadedSpy: Sinon.SinonSpy = sinon.spy();
			source.reloaded.subscribe(reloadedSpy);
			let changedSpy: Sinon.SinonSpy = sinon.spy();
			source.changed.subscribe(changedSpy);

			test.mock.flushAll(dataService);

			expect(source.dataSet).to.have.length(2);
			expect(source.dataSet[0]).to.equal(1);
			expect(source.dataSet[1]).to.equal(2);
			expect(source.count).to.equal(2);

			sinon.assert.calledOnce(reloadedSpy);
			sinon.assert.calledOnce(changedSpy);
		}));
	});
});
