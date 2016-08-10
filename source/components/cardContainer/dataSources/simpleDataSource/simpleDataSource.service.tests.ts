import { addProviders, inject } from '@angular/core/testing';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __array = services.array;

import { SimpleDataSource, IDataSource } from './simpleDataSource.service';

import { DataSourceProcessor } from '../dataSourceProcessor.service';
import { Sorter } from '../../sorts/sorter/sorter.service';
import { MergeSort } from '../../sorts/mergeSort/mergeSort.service';

describe('SimpleDataSource', () => {
	let processor: DataSourceProcessor;

	beforeEach((): void => {
		addProviders([
			DataSourceProcessor,
			Sorter,
			MergeSort,
			services.UTILITY_PROVIDERS,
		]);
		inject([DataSourceProcessor], (_processor) => {
			processor = _processor;
		})();
	});

	it('should set data set and filter count settings on base', (): void => {
		const source: IDataSource<number> = new SimpleDataSource([1, 2, 3], processor, __array.arrayUtility);

		// inherit functionality from the dataSourceBase
		expect(_.isFunction(source.refresh)).to.be.true;

		expect(source.count).to.equal(3);
		expect(source.rawDataSet).to.have.length(3);
		expect(source.rawDataSet[0]).to.equal(1);
		expect(source.rawDataSet[1]).to.equal(2);
		expect(source.rawDataSet[2]).to.equal(3);

		expect(source.countFilterGroups).to.be.false;
	});
});
