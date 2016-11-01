import { Observable, BehaviorSubject } from 'rxjs';

import { SortDirection } from '../../sorts/index';
import {
	IFilterWithValue,
	unthrottled,
	toFiltersWithValues,
	suppressInactiveFilters,
	toTypesWithValues,
	toActiveFilterChanges,
	combineWithSorts,
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
			const appliedFiltersSpy = sinon.spy();

			unthrottled(filters).subscribe(appliedFiltersSpy);

			sinon.assert.calledOnce(appliedFiltersSpy);
			sinon.assert.calledWith(appliedFiltersSpy, { one: 'Filter 1', two: 'Filter 2' });
			appliedFiltersSpy.reset();

			filters[2].subject.next('Filter 3');

			sinon.assert.notCalled(appliedFiltersSpy);

			filters[1].subject.next('Filter 2 changed');

			sinon.assert.calledOnce(appliedFiltersSpy);
			sinon.assert.calledWith(appliedFiltersSpy, { one: 'Filter 1', two: 'Filter 2 changed' });
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
				{ filter: { type: 'Type1' }, value: 'Filter 1' },
				{ filter: {}, value: null },
			];
			const activeFiltersSpy = sinon.spy();

			suppressInactiveFilters(Observable.of(<any>filtersWithValues)).subscribe(activeFiltersSpy);

			sinon.assert.calledOnce(activeFiltersSpy);
			sinon.assert.calledWith(activeFiltersSpy, [filtersWithValues[0].filter]);
		});

		it('should suppress changes to inactive filters', () => {
			const activeFilter: any = { type: 'Type1' };
			const activeFilter$: BehaviorSubject<IFilterWithValue> = new BehaviorSubject({ filter: activeFilter, value: 'Filter 1' });
			const inactiveFilter$: BehaviorSubject<IFilterWithValue> = new BehaviorSubject({ filter: <any>{}, value: null });
			const filtersWithValues$ = Observable.combineLatest(activeFilter$, inactiveFilter$);
			const activeFiltersSpy = sinon.spy();

			suppressInactiveFilters(filtersWithValues$).subscribe(activeFiltersSpy);

			sinon.assert.calledOnce(activeFiltersSpy);
			sinon.assert.calledWith(activeFiltersSpy, [activeFilter]);
			activeFiltersSpy.reset();

			inactiveFilter$.next({ filter: <any>{}, value: 'Filter 2' });

			sinon.assert.notCalled(activeFiltersSpy);
		});
	});

	describe('toTypesWithValues', () => {
		it('should map to an array of types and values', () => {
			const filters = [
				{ type: 'Type1', serialize: () => Observable.of('Value 1') },
				{ type: 'Type2', serialize: () => Observable.of('Value 2') },
			];
			let typesWithValues;

			toTypesWithValues(Observable.of(<any>filters)).subscribe(result => typesWithValues = result);

			expect(typesWithValues[0].type).to.equal('Type1');
			expect(typesWithValues[0].value).to.equal('Value 1');
			expect(typesWithValues[1].type).to.equal('Type2');
			expect(typesWithValues[1].value).to.equal('Value 2');
		});
	});

	describe('toActiveFilterChanges', () => {
		it('should map the types and values to an object mapping', () => {
			const typesWithValues = [
				{ type: 'type1', value: 'value1' },
				{ type: 'type2', value: 'value2' },
			];
			const activeFilterChanges = sinon.spy();

			toActiveFilterChanges(Observable.of(typesWithValues)).subscribe(activeFilterChanges);

			sinon.assert.calledOnce(activeFilterChanges);
			sinon.assert.calledWith(activeFilterChanges, { type1: 'value1', type2: 'value2' });
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
