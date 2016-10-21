import { BehaviorSubject } from 'rxjs';
import { rlFakeAsync, rlTick } from 'rl-async-testing';

import { CardSearchComponent, defaultSearchPlaceholder } from './cardSearch';

interface ISearchFilterMock {
	setSearch: Sinon.SinonSpy;
	searchText$: BehaviorSubject<string>;
	minSearchLength?: number;
}

interface ICardContainerMock {
	searchFilter: any;
	searchPlaceholder: any;
}

describe('CardSearchComponent', () => {
	let cardSearch: CardSearchComponent<any>;
	let cardContainer: ICardContainerMock;
	let filter: ISearchFilterMock;

	beforeEach(() => {
		filter = {
			setSearch: sinon.spy(),
			searchText$: new BehaviorSubject(''),
		};

		cardContainer = {
			searchFilter: filter,
			searchPlaceholder: null,
		};

		cardSearch = new CardSearchComponent(<any>cardContainer);
	});

	describe('searchLengthError$', () => {
		let searchLengthError: boolean;

		beforeEach(() => {
			cardSearch.ngOnInit();
			cardSearch.searchLengthError$.subscribe(result => searchLengthError = result);
		});

		it('should be false if the search is null', () => {
			filter.searchText$.next(null);
			expect(searchLengthError).to.be.false;
		});

		it('should be false if the search is empty', () => {
			filter.searchText$.next('');
			expect(searchLengthError).to.be.false;
		});

		it('should be false if the search is above the minimum search length', () => {
			filter.minSearchLength = 3;
			filter.searchText$.next('1234');
			expect(searchLengthError).to.be.false;
		});

		it('should be true if the search is present but below the minimum search length', () => {
			filter.minSearchLength = 3;
			filter.searchText$.next('12');
			expect(searchLengthError).to.be.true;
		});
	});

	describe('ngOnInit', () => {
		it('should lookup the search filter from the card container', (): void => {
			cardSearch.ngOnInit();
			expect(cardSearch.hasSearchFilter).to.be.true;
			expect(cardSearch.searchPlaceholder).to.equal(defaultSearchPlaceholder);
		});

		it('should set hasSearchFilter to false if no search filter exists on the card container', (): void => {
			cardContainer.searchFilter = null;
			cardSearch.ngOnInit();
			expect(cardSearch.hasSearchFilter).to.be.false;
			expect(cardSearch.searchPlaceholder).to.not.exist;
		});

		it('should still init the search filter if it was specified with an attribute binding', (): void => {
			let filter: any = {};
			cardSearch.searchFilter = filter;
			cardSearch.ngOnInit();
			expect(cardSearch.searchPlaceholder).to.equal(defaultSearchPlaceholder);
		});

		it('should lookup the search placeholder from the card container', (): void => {
			cardSearch.ngOnInit();
			cardContainer.searchPlaceholder = 'custom placeholder';
			expect(cardSearch.searchPlaceholder).to.equal(cardContainer.searchPlaceholder);
		});
	});

	describe('searchChanges$', (): void => {
		beforeEach(rlFakeAsync((): void => {
			cardSearch.delay = 10;
			cardSearch.ngOnInit();
			cardSearch.searchChanges$.next('');

			rlTick(10);
			rlTick();
			filter.setSearch.reset();
		}));

		it('should set the search on the filter after a delay of the specified duration', rlFakeAsync((): void => {
			cardSearch.searchChanges$.next('search');

			sinon.assert.notCalled(filter.setSearch);

			rlTick(5);
			rlTick();

			sinon.assert.notCalled(filter.setSearch);

			rlTick(5);
			rlTick();

			sinon.assert.calledOnce(filter.setSearch);
		}));

		it('should reset the timer if the search text changes', rlFakeAsync((): void => {
			cardSearch.searchChanges$.next('search');

			sinon.assert.notCalled(filter.setSearch);

			rlTick(5);
			rlTick();

			sinon.assert.notCalled(filter.setSearch);

			cardSearch.searchChanges$.next('search 2');

			rlTick(5);
			rlTick();

			sinon.assert.notCalled(filter.setSearch);

			rlTick(5);
			rlTick();

			sinon.assert.calledOnce(filter.setSearch);
		}));
	});

	describe('minSearchError', () => {
		it('should show an error for the minimum search length', () => {
			cardSearch.searchFilter = <any>{ minSearchLength: 3 };
			expect(cardSearch.minSearchError).to.equal('You must enter at least 3 characters to perform a search');
		});
	});
});
