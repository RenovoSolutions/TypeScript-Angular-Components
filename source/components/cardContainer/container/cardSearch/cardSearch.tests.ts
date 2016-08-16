import { services } from 'typescript-angular-utilities';
import __test = services.test;
import rlFakeAsync = __test.rlFakeAsync;
import rlTick = __test.rlTick;
import flushMicrotasks = __test.flushMicrotasks;
import __timeout = services.timeout;

import { CardSearchComponent, defaultSearchPlaceholder } from './cardSearch';

interface ISearchFilterMock {
	subscribe: Sinon.SinonSpy;
	trigger: Sinon.SinonSpy;
	callback?: Sinon.SinonSpy;
	searchText?: string;
}

interface ICardContainerMock {
	searchFilter: any;
	searchPlaceholder: any;
	dataSource: any;
}

describe('CardSearchComponent', () => {
	let cardSearch: CardSearchComponent<any>;
	let cardContainer: ICardContainerMock;
	let filter: ISearchFilterMock;
	let refreshSpy: Sinon.SinonSpy;

	beforeEach(() => {
		refreshSpy = sinon.spy();

		filter = {
			callback: null,
			trigger: sinon.spy((search: string): void => {
				filter.searchText = search;
				filter.callback();
			}),
			subscribe: sinon.spy((callback: Sinon.SinonSpy): void => { filter.callback = callback; }),
		};

		cardContainer = {
			searchFilter: filter,
			searchPlaceholder: null,
			dataSource: {
				refresh: refreshSpy,
			},
		};

		cardSearch = new CardSearchComponent(<any>cardContainer, new __timeout.TimeoutService);
	});

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

	describe('search', (): void => {
		beforeEach((): void => {
			cardSearch.ngOnInit();
		});

		it('should set the search text on the filter', (): void => {
			cardSearch.setSearch('');

			expect(filter.searchText).to.be.empty;

			cardSearch.setSearch('search');

			expect(filter.searchText).to.equal('search');
		});

		it('should refresh the data source after a delay of the specified duration', rlFakeAsync((): void => {
			cardSearch.delay = 10;
			cardSearch.setSearch('search');

			sinon.assert.notCalled(refreshSpy);

			rlTick(5)
			flushMicrotasks();

			sinon.assert.notCalled(refreshSpy);

			rlTick(5);
			flushMicrotasks();

			sinon.assert.calledOnce(refreshSpy);
		}));

		it('should reset the timer if the search text changes', rlFakeAsync((): void => {
			cardSearch.delay = 10;
			cardSearch.setSearch('search');

			sinon.assert.notCalled(refreshSpy);

			rlTick(5);
			flushMicrotasks();

			sinon.assert.notCalled(refreshSpy);

			cardSearch.setSearch('search 2');

			rlTick(5);
			flushMicrotasks();

			sinon.assert.notCalled(refreshSpy);

			rlTick(5);
			flushMicrotasks();

			sinon.assert.calledOnce(refreshSpy);
		}));
	});
});
