/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../typings/lodash/lodash.d.ts' />

'use strict';

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

interface IContainerServiceMock {
	searchFilter: any;
	dataSource: any;
}

describe('CardSearchController', () => {
	var scope: angular.IScope;
	var cardSearch: CardSearchController;
	var containerService: IContainerServiceMock;
	var filter: any;
	var $timeout: angular.ITimeoutService;
	var refreshSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);

		refreshSpy = sinon.spy();

		filter = {};

		containerService = {
			searchFilter: filter,
			dataSource: {
				refresh: refreshSpy,
			},
		};

		var services: any = test.angularFixture.inject('$timeout');
		$timeout = services.$timeout;
	});

	it('should lookup the search filter from the card container', (): void => {
		buildController();
		expect(cardSearch.hasSearchFilter).to.be.true;
		expect(cardSearch.searchPlaceholder).to.equal(defaultSearchPlaceholder);
	});

	it('should set hasSearchFilter to false if no search filter exists on the card container', (): void => {
		containerService.searchFilter = null;
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
			scope.$digest();

			expect(filter.searchText).to.be.empty;

			cardSearch.searchText = 'search';
			scope.$digest();

			expect(filter.searchText).to.equal('search');
		});

		it('should refresh the data source after a delay of the specified duration', (): void => {
			buildController(10);
			cardSearch.searchText = 'search';
			scope.$digest();

			sinon.assert.notCalled(refreshSpy);

			$timeout.flush(5);

			sinon.assert.notCalled(refreshSpy);

			$timeout.flush(5);

			sinon.assert.calledOnce(refreshSpy);
		});

		it('should reset the timer if the search text changes', (): void => {
			buildController(10);
			cardSearch.searchText = 'search';
			scope.$digest();

			sinon.assert.notCalled(refreshSpy);

			$timeout.flush(5);

			sinon.assert.notCalled(refreshSpy);

			cardSearch.searchText = 'search 2';
			scope.$digest();

			$timeout.flush(5);

			sinon.assert.notCalled(refreshSpy);

			$timeout.flush(5);

			sinon.assert.calledOnce(refreshSpy);
		});
	});

	function buildController(delay?: number, filter?: any): void {
		var bindings: any = {
			delay: delay,
			containerService: containerService,
			searchFilter: filter,
		};

		var controllerResult: test.IControllerResult<CardSearchController>
			= test.angularFixture.controllerWithBindings<CardSearchController>(controllerName, bindings);

		scope = controllerResult.scope;
		cardSearch = controllerResult.controller;
	}
});
