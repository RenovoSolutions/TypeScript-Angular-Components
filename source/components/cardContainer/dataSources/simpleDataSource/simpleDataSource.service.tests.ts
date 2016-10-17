import { services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { SimpleDataSource, IDataSource } from './simpleDataSource.service';

import { Sorter } from '../../sorts/sorter/sorter.service';
import { MergeSort } from '../../sorts/mergeSort/mergeSort.service';

describe('SimpleDataSource', () => {
	let sorter: Sorter;

	beforeEach((): void => {
		sorter = new Sorter(new MergeSort(), __transform.transform);
	});

	it('should set the raw data source data on base', (): void => {
		const source: IDataSource<number> = new SimpleDataSource([1, 2, 3], sorter);

		// let count;
		let rawDataSet;
		// source.count$.subscribe(result => count = result);
		source.rawDataSet$.subscribe(result => rawDataSet = result);

		// expect(count).to.equal(3);
		expect(rawDataSet).to.have.length(3);
		expect(rawDataSet[0]).to.equal(1);
		expect(rawDataSet[1]).to.equal(2);
		expect(rawDataSet[2]).to.equal(3);

		expect(source.countFilterGroups).to.be.false;
	});
});
