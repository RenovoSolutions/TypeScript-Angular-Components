/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/angularMocks.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../typings/lodash/lodash.d.ts' />
/// <reference path='../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='cardSearch.ts' />

module rl.ui.components.cardContainer.cardSearch {
	import test = utilities.services.test;
	
	interface ICardContainerMock {
		lookupFilter: Sinon.SinonSpy;
		dataSource: any;
	}
	
	describe('CardSearchController', () => {
		var scope: ng.IScope;
		var cardSearch: CardSearchController;
		var cardContainerController: ICardContainerMock;
		var filter: any;
		var $timeout: ng.ITimeoutService;
		var refreshSpy: Sinon.SinonSpy;
	
		beforeEach(() => {
			angular.mock.module(moduleName);
	
			refreshSpy = sinon.spy();
	
			filter = {};
	
			cardContainerController = {
				lookupFilter: sinon.spy((): any => { return filter; }),
				dataSource: {
					refresh: refreshSpy,
				},
			};
	
			var services: any = test.angularFixture.inject('$timeout');
			$timeout = services.$timeout;
		});
	
		it('should lookup the search filter from the card container', (): void => {
			buildController();
			sinon.assert.calledOnce(cardContainerController.lookupFilter);
			expect(cardSearch.hasSearchFilter).to.be.true;
		});
	
		it('should set hasSearchFilter to false if no search filter exists on the card container', (): void => {
			cardContainerController.lookupFilter = sinon.spy((): any => { return null; });
			buildController();
			sinon.assert.calledOnce(cardContainerController.lookupFilter);
			expect(cardSearch.hasSearchFilter).to.be.false;
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
	
		function buildController(delay?: number): void {
			var bindings: any = {
				delay: delay,
			};
	
			var $element: any = {
				controller(): any {
					return cardContainerController;
				},
			};
	
			var controllerResult: test.IControllerResult<CardSearchController>
				= test.angularFixture.controller<CardSearchController>(controllerName, bindings, { $element: $element }, true);
	
			scope = controllerResult.scope;
			cardSearch = controllerResult.controller;
		}
	});
}
