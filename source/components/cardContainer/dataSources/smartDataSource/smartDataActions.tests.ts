import { Observable, BehaviorSubject } from 'rxjs';

import {
	IFilterWithValue,
	unthrottled,
	toFiltersWithValues,
	suppressInactiveFilters,
	toTypesWithValues,
	toActiveFilterChanges,
	toObservableArray,
	pipe,
} from './smartDataActions';

describe('smart data source actions', () => {
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

	describe('suppressInactiveFilters', () => {
		it('should drop filters with a null current value', () => {
			const filtersWithValues = [
				{ filter: {}, value: 'Filter 1' },
				{ filter: {}, value: null },
			];
			let activeFilters;

			suppressInactiveFilters(Observable.of(<any>filtersWithValues)).subscribe(result => activeFilters = result);

			expect(activeFilters).to.have.length(1);
			expect(activeFilters[0]).to.equal(filtersWithValues[0].filter);
		});

		it('should suppress changes to inactive filters', () => {
			const activeFilter$: BehaviorSubject<IFilterWithValue> = new BehaviorSubject({ filter: <any>{}, value: 'Filter 1' });
			const inactiveFilter$: BehaviorSubject<IFilterWithValue> = new BehaviorSubject({ filter: <any>{}, value: null });
			const filtersWithValues$ = Observable.combineLatest(activeFilter$, inactiveFilter$);
			let activeFilters;

			suppressInactiveFilters(filtersWithValues$).subscribe(result => activeFilters = result);

			expect(activeFilters).to.have.length(1);
			expect(activeFilters[0]).to.equal(activeFilter$.getValue().filter);

			inactiveFilter$.next({ filter: <any>{}, value: 'Filter 2' });

			expect(activeFilters).to.have.length(1);
			expect(activeFilters[0]).to.equal(activeFilter$.getValue().filter);
		});
	});
});
