import { rlFakeAsync, mock } from 'rl-async-testing';

import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __transform = services.transform;

import { SmartDataSourceOld } from './smartDataSourceOld.service';

import { DataSourceProcessorOld } from '../processor/dataSourceProcessorOld.service';
import { Sorter } from '../../sorts/sorter/sorter.service';
import { MergeSort } from '../../sorts/mergeSort/mergeSort.service';

import { SortDirection } from '../../sorts/sort';

interface IDataServiceMock {
	get: sinon.SinonSpy;
}

interface ITestFilter extends filters.ISerializableFilter<number> {
	value: number;
	trigger: Function;
	dispose: sinon.SinonSpy;
}

interface IDataSourceProcessorMock {
	process: sinon.SinonSpy;
	sort: sinon.SinonSpy;
	page: sinon.SinonSpy;
}

describe('SmartDataSourceOld', () => {
	let dataSourceProcessor: IDataSourceProcessorMock;
	let dataService: IDataServiceMock;
	let appliedFilter: ITestFilter;
	let unappliedFilter: ITestFilter;
	let source: SmartDataSourceOld<number>;
	let data: number[];

	beforeEach(() => {
		appliedFilter = <any>{
			type: 'filter1',
			filter: (item: number): boolean => { return true; },
			serialize: (): number => { return appliedFilter.value; },
			value: 1,
			trigger: null,
			dispose: sinon.spy(),
			subscribe: (callback: Function): any => {
				appliedFilter.trigger = callback;
				return {
					dispose: appliedFilter.dispose,
				};
			},
		};
		unappliedFilter = <any>{
			type: 'filter2',
			filter: (item: number): boolean => { return item === unappliedFilter.value; },
			serialize: (): number => { return unappliedFilter.value; },
			value: null,
			trigger: null,
			dispose: sinon.spy(),
			subscribe: (callback: Function): any => {
				unappliedFilter.trigger = callback;
				return {
					dispose: unappliedFilter.dispose,
				};
			},
		};

		data = [1, 2];

		dataService = {
			get: mock.promise({ dataSet: data, count: 2 }),
		};

		dataSourceProcessor = <any>new DataSourceProcessorOld(__object.objectUtility, new Sorter(new MergeSort(), __transform.transform));
		dataSourceProcessor.process = sinon.spy((data: any): any => { return { dataSet: data }; });
		dataSourceProcessor.sort = sinon.spy();
		dataSourceProcessor.page = sinon.spy();
		source = new SmartDataSourceOld<number>(dataService.get, <any>dataSourceProcessor, __array.arrayUtility, __object.objectUtility);

		source.filters = <any>[appliedFilter, unappliedFilter];
		source.sorts = <any>[{
			column: { label: 'col1' },
			direction: SortDirection.none,
		}];
		source.pager = <any>{
			pageNumber: 1,
			pageSize: 2,
			filter: sinon.spy(),
		};
	});

	it('should use the count returned by the server when a reload resolves', rlFakeAsync((): void => {
		let clientCount: number = 2;
		let serverCount: number = 4;
		dataSourceProcessor.process = sinon.spy((data: any): any => {
			return {
				dataSet: data,
				count: clientCount,
			};
		});

		data = [1, 2, 3, 4];
		dataService.get = mock.promise({ dataSet: data, count: serverCount });
		source.getDataSet = dataService.get;
		source.reload();
		mock.flushAll(dataService);

		expect(source.count).to.equal(serverCount);
	}));

	describe('throttled', (): void => {
		beforeEach(rlFakeAsync((): void => {
			data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			dataService.get = mock.promise({ dataSet: data, count: 20 });
			source.getDataSet = dataService.get;
			source.reload();
			mock.flushAll(dataService);
			dataService.get.reset();

			expect(source.throttled).to.be.true;
		}));

		it('should make a request when excecuting a full refresh', (): void => {
			source.refresh();
			sinon.assert.calledOnce(dataService.get);
		});

		it('should make a request if the sorts change', (): void => {
			source.onSortChange();
			sinon.assert.calledOnce(dataService.get);
		});

		it('should handle paging without making a server request', (): void => {
			source.onPagingChange();
			sinon.assert.calledOnce(dataSourceProcessor.page);
			sinon.assert.notCalled(dataService.get);
		});
	});

	describe('not throttled', (): void => {
		beforeEach(rlFakeAsync((): void => {
			data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			dataService.get = mock.promise({ dataSet: data, count: 10 });
			source.getDataSet = dataService.get;
			source.reload();
			mock.flushAll(dataService);
			dataService.get.reset();
			dataSourceProcessor.process.reset();

			expect(source.throttled).to.be.false;
		}));

		it('should make a request if any applied filter changes', (): void => {
			appliedFilter.trigger();
			sinon.assert.calledOnce(dataService.get);
		});

		it('should handle an unapplied filter on the client', (): void => {
			unappliedFilter.value = 2;
			source.refresh();
			sinon.assert.notCalled(dataService.get);
			sinon.assert.calledOnce(dataSourceProcessor.process);
		});

		it('should handle sorting on the client', (): void => {
			source.onSortChange();
			sinon.assert.calledOnce(dataSourceProcessor.sort);
			sinon.assert.calledOnce(dataSourceProcessor.page);
			sinon.assert.notCalled(dataService.get);
		});

		it('should handle paging without making a server request', (): void => {
			source.onPagingChange();
			sinon.assert.calledOnce(dataSourceProcessor.page);
			sinon.assert.notCalled(dataService.get);
		});
	});
});
