import { services } from 'typescript-angular-utilities';
import __test = services.test;
import fakeAsync = __test.fakeAsync;
import tick = __test.tick;
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
	dataSource: any;
}

describe('CardSearchComponent', () => {
	let cardSearch: CardSearchComponent;
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

	describe('search', (): void => {
		beforeEach((): void => {
			cardSearch.ngOnInit();
		});

		it('should set the search text on the filter', (): void => {
			cardSearch.setSearch('');

			expect(filter.searchText).to.be.empty;

			cardSearch.timer.catch(() => null);
			cardSearch.setSearch('search');

			expect(filter.searchText).to.equal('search');
		});

		it('should refresh the data source after a delay of the specified duration', fakeAsync((): void => {
			cardSearch.delay = 10;
			cardSearch.setSearch('search');

			sinon.assert.notCalled(refreshSpy);

			tick(5)
			flushMicrotasks();

			sinon.assert.notCalled(refreshSpy);

			tick(5);
			flushMicrotasks();

			sinon.assert.calledOnce(refreshSpy);
		}));

		it('should reset the timer if the search text changes', fakeAsync((): void => {
			cardSearch.delay = 10;
			cardSearch.setSearch('search');

			sinon.assert.notCalled(refreshSpy);

			tick(5);
			flushMicrotasks();

			sinon.assert.notCalled(refreshSpy);

			cardSearch.timer.catch(() => null);
			cardSearch.setSearch('search 2');

			tick(5);
			flushMicrotasks();

			sinon.assert.notCalled(refreshSpy);

			tick(5);
			flushMicrotasks();

			sinon.assert.calledOnce(refreshSpy);
		}));
	});
});
