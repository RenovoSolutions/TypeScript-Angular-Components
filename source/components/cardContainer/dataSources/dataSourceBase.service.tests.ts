import { Subject } from 'rxjs';

import { DataSourceBase } from './dataSourceBase.service';
import { IDataSource } from './dataSource';

describe('DataSourceBase', () => {
	let dataSourceBase: DataSourceBase<number>;

	beforeEach(() => {
		dataSourceBase = new DataSourceBase<number>();
	});

	describe('needsRefinedSearch', (): void => {
		it('should need refined search if the data set is empty and the raw data set is smaller than the total count', (): void => {
			(dataSourceBase as any)._dataSet.next([]);
			(dataSourceBase as any)._rawDataSet.next([1, 2]);
			(dataSourceBase as any)._count.next(3);
			(dataSourceBase as any)._isEmpty.next(true);
			let needsRefinedSearch;

			dataSourceBase.needsRefinedSearch$.subscribe(result => needsRefinedSearch = result);

			expect(needsRefinedSearch).to.be.true;
		});

		it('should need refined search if the data set is empty and isEmpty is set to false', (): void => {
			(dataSourceBase as any)._dataSet.next([]);
			(dataSourceBase as any)._rawDataSet.next([]);
			(dataSourceBase as any)._count.next(0);
			(dataSourceBase as any)._isEmpty.next(false);
			let needsRefinedSearch;

			dataSourceBase.needsRefinedSearch$.subscribe(result => needsRefinedSearch = result);

			expect(needsRefinedSearch).to.be.true;
		});

		it('should need refined search if the data set is null and isEmpty is set to false', (): void => {
			(dataSourceBase as any)._dataSet.next(null);
			(dataSourceBase as any)._rawDataSet.next(null);
			(dataSourceBase as any)._count.next(0);
			(dataSourceBase as any)._isEmpty.next(false);
			let needsRefinedSearch;

			dataSourceBase.needsRefinedSearch$.subscribe(result => needsRefinedSearch = result);

			expect(needsRefinedSearch).to.be.true;
		});
	});

	describe('isEmpty', () => {
		it('should specify isEmpty if the data set is empty and isEmpty is true', (): void => {
			(dataSourceBase as any)._rawDataSet.next([]);
			(dataSourceBase as any)._isEmpty.next(true);
			let isEmpty;

			dataSourceBase.isEmpty$.subscribe(result => isEmpty = result);

			expect(isEmpty).to.be.true;
		});

		it('should specify isEmpty if the data set is empty and isEmpty is unspecified', (): void => {
			(dataSourceBase as any)._rawDataSet.next([]);
			let isEmpty;

			dataSourceBase.isEmpty$.subscribe(result => isEmpty = result);

			expect(isEmpty).to.be.true;
		});
	});

	describe('remove', (): void => {
		it('should remove an item and emit the updated list', (): void => {
			(dataSourceBase as any)._rawDataSet.next([1, 2, 3]);
			let rawDataSet;
			dataSourceBase.rawDataSet$.subscribe(result => rawDataSet = result);

			dataSourceBase.remove(2);

			expect(rawDataSet).to.deep.equal([1, 3]);
		});
	});

	describe('add', (): void => {
		it('should add an item and emit the updated list', (): void => {
			(dataSourceBase as any)._rawDataSet.next([1, 2, 3]);
			let rawDataSet;
			dataSourceBase.rawDataSet$.subscribe(result => rawDataSet = result);

			dataSourceBase.add(4);

			expect(rawDataSet).to.deep.equal([1, 2, 3, 4]);
		});
	});

	describe('replace', (): void => {
		it('should replace an item and emit the updated list', (): void => {
			(dataSourceBase as any)._rawDataSet.next([1, 2, 3]);
			let rawDataSet;
			dataSourceBase.rawDataSet$.subscribe(result => rawDataSet = result);

			dataSourceBase.replace(2, 5);

			expect(rawDataSet).to.deep.equal([1, 5, 3]);
		});
	});

	describe('clear', (): void => {
		it('should clear all datasets, count, and reset isEmpty', (): void => {
			(dataSourceBase as any)._rawDataSet.next([1, 2, 3]);
			(dataSourceBase as any)._dataSet.next([1, 2, 3]);
			(dataSourceBase as any)._filteredDataSet.next([1, 2]);
			(dataSourceBase as any)._count.next(3);
			(dataSourceBase as any)._isEmpty.next(false);
			let rawDataSet;
			let dataSet;
			let filteredDataSet;
			let count;
			let isEmpty;
			dataSourceBase.rawDataSet$.subscribe(result => rawDataSet = result);
			dataSourceBase.dataSet$.subscribe(result => dataSet = result);
			dataSourceBase.filteredDataSet$.subscribe(result => filteredDataSet = result);
			dataSourceBase.count$.subscribe(result => count = result);
			(dataSourceBase as any)._isEmpty.subscribe(result => isEmpty = result);

			dataSourceBase.clear();

			expect(rawDataSet.length).to.equal(0);
			expect(dataSet.length).to.equal(0);
			expect(filteredDataSet.length).to.equal(0);
			expect(count).to.equal(0);
			expect(isEmpty).to.be.true;
		});
	});
});
