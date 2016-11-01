import { Observable, BehaviorSubject } from 'rxjs';

import { unthrottled, toFiltersWithValues } from './smartDataActions';

describe('rxjs testing', () => {
	describe('unthrottled', () => {
		it('should log for every active filter that changes', () => {
			const filters = [
				{
					type: 'one',
					subject: new BehaviorSubject('Filter 1'),
					serialize: () => filters[0].subject,
				},
				{
					type: 'two',
					subject: new BehaviorSubject('Filter 2'),
					serialize: () => filters[1].subject,
				},
				{
					type: 'three',
					subject: new BehaviorSubject(null),
					serialize: () => filters[2].subject,
				},
			];
			let appliedFilters;

			unthrottled(filters).subscribe(result => appliedFilters = result);

			expect(appliedFilters).to.deep.equal({ one: 'Filter 1', two: 'Filter 2' });

			filters[2].subject.next('Filter 3');

			expect(appliedFilters).to.deep.equal({ one: 'Filter 1', two: 'Filter 2' });

			filters[1].subject.next('Filter 2 changed');

			expect(appliedFilters).to.deep.equal({ one: 'Filter 1', two: 'Filter 2 changed' });
		});
	});

	describe('toFiltersWithValues', () => {
		it('should map to an array of filters and values', () => {
			const filters = [
				{ serialize: () => Observable.of('Filter 1') },
				{ serialize: () => Observable.of('Filter 2') },
			];
			let filtersWithValues;

			toFiltersWithValues(<any>filters).subscribe(result => filtersWithValues = result);

			expect(filtersWithValues[0].filter).to.equal(filters[0]);
			expect(filtersWithValues[0].value).to.equal('Filter 1');
			expect(filtersWithValues[1].filter).to.equal(filters[1]);
			expect(filtersWithValues[1].value).to.equal('Filter 2');
		});
	});
});
