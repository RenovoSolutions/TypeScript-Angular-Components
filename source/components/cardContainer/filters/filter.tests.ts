import { Observable } from 'rxjs';

import { Filter } from './filter';

class TestFilter extends Filter<any, any> {
	predicate = (item, value) => true;

	setValue(value: any): void {
		this.value$.next(value);
	}
}

describe('Filter', () => {
	let filter: TestFilter;

	beforeEach(() => {
		filter = new TestFilter();
	});

	it('should filter the data using the predicate', () => {
		const unfiltered = [1, 2, 3, 4];
		const filtered = [3, 4];
		filter.predicate = (item, value) => item > value;
		filter.setValue(2);
		let result;

		filter.filter(Observable.of(unfiltered)).subscribe(data => result = data);

		expect(result).to.deep.equal(filtered);
	});
});
