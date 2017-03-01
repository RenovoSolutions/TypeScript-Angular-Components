import { Observable } from 'rxjs';

import { SearchFilter } from './searchFilter.service';

interface SearchUtilityMock {
	search: sinon.SinonSpy;
	tokenizedSearch: sinon.SinonSpy;
}

describe('SearchFilter', () => {
	let filter: SearchFilter;
	let searchUtility: SearchUtilityMock;

	beforeEach(() => {
		searchUtility = {
			search: sinon.spy(),
			tokenizedSearch: sinon.spy(),
		};

		filter = new SearchFilter(<any>searchUtility);
	});

	it('should update the search results when the search is updated', () => {
		const item1 = 'item 1';
		const item2 = 'item 2';
		const data = [item1, item2];
		searchUtility.search = sinon.spy((item, search) => item === search);
		filter.setSearch(item1);
		let result;

		filter.filter(Observable.of(data)).subscribe(data => result = data);

		expect(result).to.deep.equal([item1]);

		filter.setSearch(item2);

		expect(result).to.deep.equal([item2]);
	});

	it('should return true for all items if the search is empty', () => {
		expect(filter.predicate('item 1', '')).to.be.true;
		expect(filter.predicate(1, '')).to.be.true;
		expect(filter.predicate('random', '')).to.be.true;
		expect(filter.predicate({}, '')).to.be.true;
	});

	it('should return true for all items if the search is less than the minSearchLength', () => {
		const search = 'sea';
		filter.minSearchLength = 4;

		expect(filter.predicate('item 1', search)).to.be.true;
		expect(filter.predicate(1, search)).to.be.true;
		expect(filter.predicate('random', search)).to.be.true;
		expect(filter.predicate({}, search)).to.be.true;
	});

	it('should use tokenized search if tokenized is true', () => {
		const item = 'item';
		const search = item;
		searchUtility.tokenizedSearch = sinon.spy((item, search) => item === search);
		filter.tokenized = true;

		expect(filter.predicate(item, search)).to.be.true;
		sinon.assert.calledOnce(searchUtility.tokenizedSearch);
		sinon.assert.calledWith(searchUtility.tokenizedSearch, item, search);
	});

	it('should use normal search by default', () => {
		const item = 'item';
		const search = item;
		searchUtility.search = sinon.spy((item, search) => item === search);

		expect(filter.predicate(item, search)).to.be.true;
		sinon.assert.calledOnce(searchUtility.search);
		sinon.assert.calledWith(searchUtility.search, item, search);
	});
});
