import { Observable } from 'rxjs';

import { count, sort, page, filter, process } from './dataSourceProcessor';

describe('data source processor', () => {
	describe('process', () => {
		it('should sort, filter, page, and count the data', () => {
			const unprocessed = [2, 3, 1, 4];
			const sorted = [1, 2, 3, 4];
			const filtered = [2, 3, 4];
			const paged = [2, 3];
			const sorts = [<any>{}];
			const filters = [{ filter: () => Observable.of(filtered) }];
			const pager = { filter: () => Observable.of(paged) };
			const sorter = { sort: () => sorted };
			let dataCount;
			let filteredDataSet;
			let dataSet;

			const result = process(Observable.of(sorts), <any>filters, <any>pager, Observable.of(unprocessed), <any>sorter);

			result.count.subscribe(count => dataCount = count);
			result.filteredDataSet.subscribe(data => filteredDataSet = data);
			result.dataSet.subscribe(data => dataSet = data);

			expect(dataCount).to.equal(3);
			expect(filteredDataSet).to.deep.equal(filtered);
			expect(dataSet).to.deep.equal(paged);
		});
	});

	describe('count', () => {
		it('should return the length of the data set', () => {
			let result;
			count(Observable.of([1, 2, 3])).subscribe(_count => result = _count);
			expect(result).to.equal(3);
		});

		it('should return 0 if the data set is null', () => {
			let result;
			count(Observable.of(null)).subscribe(_count => result = _count);
			expect(result).to.equal(0);
		});
	});

	describe('sort', () => {
		it('should return the result of sorting against the data if sorts are specified', () => {
			const unsorted = [2, 3, 1, 4];
			const sorted = [1, 2, 3, 4];
			const sorts = [<any>{}];
			const sorter = { sort: sinon.spy(() => sorted) };
			let result;

			sort(Observable.of(unsorted), Observable.of(sorts), <any>sorter).subscribe(data => result = data);

			sinon.assert.calledOnce(sorter.sort);
			sinon.assert.calledWith(sorter.sort, unsorted, sorts);
			expect(result).to.deep.equal(sorted);
		});

		it('should return the data if no sorts are specified', () => {
			const unsorted = [2, 3, 1, 4];
			let result;

			sort(Observable.of(unsorted), Observable.of(null), null).subscribe(data => result = data);

			expect(result).to.equal(unsorted);
		});
	});

	describe('filter', () => {
		it('should filter out items that don\'t pass all the filters', () => {
			const unfiltered = [1, 2, 3, 4];
			const filtered = [4];
			const dataFilter = { filter: sinon.spy(() => Observable.of(filtered)) };
			let result;

			filter(Observable.of(unfiltered), [<any>dataFilter]).subscribe(data => result = data);

			sinon.assert.calledOnce(dataFilter.filter);
			sinon.assert.calledWith(dataFilter.filter, Observable.of(unfiltered));
			expect(result).to.deep.equal(filtered);
		});

		it('should return the data if no filters are specified', () => {
			const unfiltered = [1, 2, 3, 4];
			let result;

			filter(Observable.of(unfiltered), null).subscribe(data => result = data);

			expect(result).to.equal(unfiltered);
		});
	});

	describe('page', () => {
		it('should filter out items that aren\'t on the page', () => {
			const unpaged = [1, 2, 3, 4];
			const paged = [1, 2];
			const pager = { filter: sinon.spy(() => Observable.of(paged)) };
			let result;

			page(Observable.of(unpaged), <any>pager).subscribe(data => result = data);

			sinon.assert.calledOnce(pager.filter);
			sinon.assert.calledWith(pager.filter, Observable.of(unpaged));
			expect(result).to.deep.equal(paged);
		});

		it('should return the data if no pager is specified', () => {
			const unpaged = [1, 2, 3, 4];
			let result;

			page(Observable.of(unpaged), null).subscribe(data => result = data);

			expect(result).to.equal(unpaged);
		});
	});
});
