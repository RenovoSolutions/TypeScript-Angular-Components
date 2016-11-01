import { Observable, BehaviorSubject } from 'rxjs';

import { SortDirection } from '../../sorts/index';
import {
	IFilterWithValue,
	unthrottled,
	toFiltersWithValues,
	suppressInactiveFilters,
	toTypesWithValues,
	toFilterChanges,
	combineWithSorts,
	toObservableArray,
	pipe,
} from './smartDataActions';

describe('smart data source actions', () => {
	describe('unthrottled', () => {
		it('should fire an event for every active filter that changes', () => {
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
			const sorts = [
				{
					column: { label: 'col1' },
					direction: SortDirection.ascending,
				},
			];
			const appliedFiltersSpy = sinon.spy();

			unthrottled(filters, Observable.of(<any>sorts)).subscribe(appliedFiltersSpy);

			let expected = {
				filters: { one: 'Filter 1', two: 'Filter 2' },
				sorts: [{ column: 'col1', direction: SortDirection.getFullName(SortDirection.ascending) }],
			};
			sinon.assert.calledOnce(appliedFiltersSpy);
			sinon.assert.calledWith(appliedFiltersSpy, expected);
			appliedFiltersSpy.reset();

			filters[2].subject.next('Filter 3');

			sinon.assert.notCalled(appliedFiltersSpy);

			filters[1].subject.next('Filter 2 changed');

			expected = {
				filters: { one: 'Filter 1', two: 'Filter 2 changed' },
				sorts: [{ column: 'col1', direction: SortDirection.getFullName(SortDirection.ascending) }],
			};
			sinon.assert.calledOnce(appliedFiltersSpy);
			sinon.assert.calledWith(appliedFiltersSpy, expected);
		});

		it('should suppress sort changes', () => {
			const filters = [
				{
					type: 'one',
					serialize: () => Observable.of('value1'),
				},
				{
					type: 'two',
					serialize: () => Observable.of('value2'),
				},
			];
			const sorts = [
				{
					column: { label: 'col1' },
					direction: SortDirection.ascending,
				},
			];
			const sorts$: BehaviorSubject<any> = new BehaviorSubject(sorts);
			const appliedFiltersSpy = sinon.spy();

			unthrottled(<any>filters, sorts$).subscribe(appliedFiltersSpy);

			let expected = {
				filters: { one: 'value1', two: 'value2' },
				sorts: [{ column: 'col1', direction: SortDirection.getFullName(SortDirection.ascending) }],
			};
			sinon.assert.calledOnce(appliedFiltersSpy);
			sinon.assert.calledWith(appliedFiltersSpy, expected);
			appliedFiltersSpy.reset();

			const newSorts = [
				{
					column: { label: 'col2' },
					direction: SortDirection.ascending,
				},
			];

			sorts$.next(newSorts);

			sinon.assert.notCalled(appliedFiltersSpy);
		});
	});

	describe('suppressInactiveFilters', () => {
		it('should drop filters with a null current value', () => {
			const filters = [
				{ serialize: () => Observable.of('Filter 1') },
				{ serialize: () => Observable.of(null) },
			];
			const activeFiltersSpy = sinon.spy();

			suppressInactiveFilters(<any>filters).subscribe(activeFiltersSpy);

			sinon.assert.calledOnce(activeFiltersSpy);
			sinon.assert.calledWith(activeFiltersSpy, [filters[0]]);
		});

		it('should suppress changes to inactive filters', () => {
			const activeFilter = {
				serialize: () => activeFilter.stream,
				stream: new BehaviorSubject('Filter 1'),
			};
			const inactiveFilter = {
				serialize: () => inactiveFilter.stream,
				stream: new BehaviorSubject(null),
			};
			const activeFiltersSpy = sinon.spy();

			suppressInactiveFilters(<any>[activeFilter, inactiveFilter]).subscribe(activeFiltersSpy);

			sinon.assert.calledOnce(activeFiltersSpy);
			sinon.assert.calledWith(activeFiltersSpy, [activeFilter]);
			activeFiltersSpy.reset();

			inactiveFilter.stream.next('Filter 2');

			sinon.assert.notCalled(activeFiltersSpy);
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

	describe('toFilterChanges', () => {
		it('should map the types and values to an object mapping', () => {
			const filters = [
				{ type: 'type1', serialize: () => Observable.of('value1') },
				{ type: 'type2', serialize: () => Observable.of('value2') },
			];
			const activeFilterChanges = sinon.spy();

			toFilterChanges(Observable.of(<any>filters)).subscribe(activeFilterChanges);

			sinon.assert.calledOnce(activeFilterChanges);
			sinon.assert.calledWith(activeFilterChanges, { type1: 'value1', type2: 'value2' });
		});

	});

	describe('toTypesWithValues', () => {
		it('should map to an array of types and values', () => {
			const filters = [
				{ type: 'type1', serialize: () => Observable.of('Value 1') },
				{ type: 'type2', serialize: () => Observable.of('Value 2') },
			];
			let typesWithValues;

			toTypesWithValues(Observable.of(<any>filters)).subscribe(result => typesWithValues = result);

			expect(typesWithValues[0].type).to.equal('type1');
			expect(typesWithValues[0].value).to.equal('Value 1');
			expect(typesWithValues[1].type).to.equal('type2');
			expect(typesWithValues[1].value).to.equal('Value 2');
		});
	});

	describe('combineWithSorts', () => {
		it('should combine the filter values and sorts into a single event object', () => {
			const filterValues = { type1: 'value1' };
			const sorts = [
				{
					column: { label: 'col1' },
					direction: SortDirection.ascending,
				},
			];
			let filtersAndSorts;

			combineWithSorts(Observable.of(filterValues), Observable.of(<any>sorts)).subscribe(result => filtersAndSorts = result);

			expect(filtersAndSorts.filters).to.equal(filterValues);
			expect(filtersAndSorts.sorts).to.have.length(1);
			expect(filtersAndSorts.sorts[0].column).to.equal('col1');
			expect(filtersAndSorts.sorts[0].direction).to.equal(SortDirection.getFullName(SortDirection.ascending));
		});
	});

	describe('toObservableArray', () => {
		it('should map the array to an array of observables using the specified transform', () => {
			const array = [1, 2, 3];
			const transform = item => Observable.of(item);
			const expectedResult = [Observable.of(1), Observable.of(2), Observable.of(3)];

			const observableArray = toObservableArray(array, transform);

			expect(observableArray).to.deep.equal(expectedResult);
		});
	});

	describe('pipe', () => {
		it('should run the actions in order and pipe the result of each action to the next', () => {
			const one = sinon.spy(() => 1);
			const two = sinon.spy(() => 2);
			const three = sinon.spy(() => 3);

			const result = pipe(0, [one, two, three]);

			sinon.assert.calledOnce(one);
			sinon.assert.calledWith(one, 0);
			sinon.assert.calledOnce(two);
			sinon.assert.calledWith(two, 1);
			sinon.assert.calledOnce(three);
			sinon.assert.calledWith(three, 2);
			expect(result).to.equal(3);
		});
	});
});
