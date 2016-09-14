import { addProviders, inject } from '@angular/core/testing';

import { services, filters } from 'typescript-angular-utilities';
import test = services.test;
import rlFakeAsync = test.rlFakeAsync;
import __object = services.object;
import __array = services.array;

import { ServerSideDataSource, IServerSideDataSource } from './serverSideDataSource.service';

import { DataSourceProcessor } from '../dataSourceProcessor.service';
import { Sorter } from '../../sorts/sorter/sorter.service';
import { MergeSort } from '../../sorts/mergeSort/mergeSort.service';

import { SortDirection } from '../../sorts/sort';

interface IDataServiceMock {
	get: Sinon.SinonSpy;
}

interface ITestFilter extends filters.ISerializableFilter<number> {
	value: number;
}

describe('ServerSideDataSource', () => {
	let dataSourceProcessor: DataSourceProcessor;
	let dataService: IDataServiceMock;
	let filter: ITestFilter;
	let source: IServerSideDataSource<number>;

	beforeEach(() => {
		filter = <any>{
			type: 'myFilter',
			filter: (item: number): boolean => { return item === filter.value; },
			serialize: (): number => { return filter.value; },
			value: 1,
		};

		dataService = {
			get: test.mock.promise({ dataSet: [1, 2], count: 2 }),
		};

		addProviders([
			DataSourceProcessor,
			Sorter,
			MergeSort,
			services.UTILITY_PROVIDERS,
		]);
		inject([DataSourceProcessor, __array.ArrayUtility, __object.ObjectUtility]
			, (_dataSourceProcessor, array, object) => {

			dataSourceProcessor = _dataSourceProcessor;
			sinon.spy(dataSourceProcessor, 'processAndCount');
			source = <any>new ServerSideDataSource<number>(dataService.get, <any>dataSourceProcessor, array, object);
		})();

		source.filters = <any>[filter];
		source.sorts = <any>[{
			column: { label: 'col1' },
			direction: SortDirection.none,
		}];
		source.pager = <any>{
			pageNumber: 5,
			pageSize: 10,
			filter: sinon.spy(),
		};
	});

	it('should serialize the filters and apply the values to the server request', (): void => {
		source.refresh();

		let filterValues: any = dataService.get.firstCall.args[0].filters;
		expect(filterValues['myFilter']).to.equal(1);
	});

	it('should apply sorts to the server request', (): void => {
		source.refresh();

		let sorts: any = dataService.get.firstCall.args[0].sorts;
		expect(sorts[0].column).to.equal('col1');
		expect(sorts[0].direction).to.equal('none');
	});

	it('should apply the paging data to the server request', (): void => {
		source.refresh();

		let paging: any = dataService.get.firstCall.args[0].paging;
		expect(paging.pageNumber).to.equal(5);
		expect(paging.pageSize).to.equal(10);
	});

	it('should specify no value for unserializable filters', (): void => {
		let clientSideFilter: any = { filter: (item: number): boolean => { return item === 1; }};
		source.filters = [clientSideFilter];
		source.refresh();

		let filterValues: any = dataService.get.firstCall.args[0].filters;
		expect(filters['clientSideFilter']).to.not.exist;
	});

	it('should set the data set and count with the response from the server', rlFakeAsync((): void => {
		source.refresh();
		test.mock.flushAll(dataService);
		expect(source.dataSet[0]).to.equal(1);
		expect(source.dataSet[1]).to.equal(2);
		expect(source.count).to.equal(2);
	}));
});
