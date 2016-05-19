import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	CardSearchController,
	moduleName,
	controllerName,
	defaultSearchPlaceholder,
} from './cardSearch';

import * as angular from 'angular';
import 'angular-mocks';

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

describe('CardSearchController', () => {
	let scope: angular.IScope;
	let cardSearch: CardSearchController;
	let cardContainer: ICardContainerMock;
	let filter: ISearchFilterMock;
	let $timeout: angular.ITimeoutService;
	let refreshSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);

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

		const services: any = test.angularFixture.inject('$timeout');
		$timeout = services.$timeout;
	});

	it('should lookup the search filter from the card container', (): void => {
		buildController();
		expect(cardSearch.hasSearchFilter).to.be.true;
		expect(cardSearch.searchPlaceholder).to.equal(defaultSearchPlaceholder);
	});

	it('should set hasSearchFilter to false if no search filter exists on the card container', (): void => {
		cardContainer.searchFilter = null;
		buildController();
		expect(cardSearch.hasSearchFilter).to.be.false;
		expect(cardSearch.searchPlaceholder).to.not.exist;
	});

	it('should still init the search filter if it was specified with an attribute binding', (): void => {
		let filter: any = {};
		buildController();
		expect(cardSearch.searchPlaceholder).to.equal(defaultSearchPlaceholder);
	});

	describe('search', (): void => {
		it('should set the search text on the filter', (): void => {
			buildController();
			cardSearch.searchText = '';

			expect(filter.searchText).to.be.empty;

			cardSearch.searchText = 'search';

			expect(filter.searchText).to.equal('search');
		});

		it('should refresh the data source after a delay of the specified duration', (): void => {
			buildController(10);
			cardSearch.searchText = 'search';

			sinon.assert.notCalled(refreshSpy);

			$timeout.flush(5);

			sinon.assert.notCalled(refreshSpy);

			$timeout.flush(5);

			sinon.assert.calledOnce(refreshSpy);
		});

		it('should reset the timer if the search text changes', (): void => {
			buildController(10);
			cardSearch.searchText = 'search';

			sinon.assert.notCalled(refreshSpy);

			$timeout.flush(5);

			sinon.assert.notCalled(refreshSpy);

			cardSearch.searchText = 'search 2';

			$timeout.flush(5);

			sinon.assert.notCalled(refreshSpy);

			$timeout.flush(5);

			sinon.assert.calledOnce(refreshSpy);
		});

		it('should subscribe to changes on the filter', (): void => {
			buildController();
			filter.trigger('search');
			expect(cardSearch.searchText).to.equal('search');
		});
	});

	function buildController(delay?: number, filter?: any): void {
		var bindings: any = {
			delay: delay,
			cardContainer: cardContainer,
			searchFilter: filter,
		};

		var controllerResult: test.IControllerResult<CardSearchController>
			= test.angularFixture.controllerWithBindings<CardSearchController>(controllerName, bindings);

		scope = controllerResult.scope;
		cardSearch = controllerResult.controller;
		cardSearch.$onInit();
	}
});
