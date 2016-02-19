/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../typings/lodash/lodash.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	PagerController,
	moduleName,
	controllerName,
} from './pager';

import * as angular from 'angular';
import 'angular-mocks';

interface IDataPagerMock {
	pageSize: number;
	pageNumber: number;
}

interface IDataSourceMock {
	onPagingChange: Sinon.SinonSpy;
	count: number;
}

describe('PagerController', () => {
	var scope: angular.IScope;
	var pager: PagerController;
	var dataPager: IDataPagerMock;
	var dataSource: IDataSourceMock;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	describe('first', (): void => {
		it('should set the current page to the first page', (): void => {
			buildController();

			pager.currentPage = 5;

			pager.first();

			expect(pager.currentPage).to.equal(1);
		});
	});

	describe('previous', (): void => {
		beforeEach((): void => {
			buildController();
		});

		it('should decrement the current page if it is not on the first page', (): void => {
			pager.currentPage = 5;

			pager.previous();

			expect(pager.currentPage).to.equal(4);
		});

		it('should stay on the current page if it is on the first page', (): void => {
			pager.currentPage = 1;

			pager.previous();

			expect(pager.currentPage).to.equal(1);
		});
	});

	describe('next', (): void => {
		beforeEach((): void => {
			buildController(5);
		});

		it('should increment the current page if it is not on the last page', (): void => {
			pager.currentPage = 1;

			pager.next();

			expect(pager.currentPage).to.equal(2);
		});

		it('should stay on the current page if it is on the last page', (): void => {
			pager.currentPage = 5;

			pager.next();

			expect(pager.currentPage).to.equal(5);
		});
	});

	describe('goto', (): void => {
		beforeEach((): void => {
			buildController(5);
			pager.currentPage = 5;
		});

		it('should go to the specified page if the page exists', (): void => {
			pager.goto(3);
			expect(pager.currentPage).to.equal(3);
		});

		it('should stay on the current page if the specified page is before the first page', (): void => {
			pager.goto(0);
			expect(pager.currentPage).to.equal(5);
		});

		it('should stay on the current page if the specified page is after the last page', (): void => {
			pager.goto(6);
			expect(pager.currentPage).to.equal(5);
		});
	});

	describe('last', (): void => {
		it('should go to the last page', (): void => {
			buildController(5);

			pager.currentPage = 1;

			pager.last();

			expect(pager.currentPage).to.equal(5);
		});
	});

	describe('currentPage', (): void => {
		it('should update the pageNumber on the pager when the currentPage changes', (): void => {
			buildController(5);
			pager.currentPage = 2;
			scope.$digest();

			expect(dataPager.pageNumber).to.equal(2);
			sinon.assert.calledOnce(dataSource.onPagingChange);

			pager.currentPage = 4;
			scope.$digest();

			expect(dataPager.pageNumber).to.equal(4);
			sinon.assert.calledTwice(dataSource.onPagingChange);
		});
	});

	describe('updatePageCount', (): void => {
		it('should set the last page to the item count divided by the page size rounded up', (): void => {
			buildController();
			dataPager.pageSize = 3;
			dataSource.count = 10;
			scope.$digest();

			// 10 / 3 = 3.3333...
			pager.last();
			expect(pager.currentPage).to.equal(4);
		});

		it('should update the last page when the data source count changes', (): void => {
			buildController(1);
			pager.last();
			expect(pager.currentPage).to.equal(1);

			dataSource.count = 5;
			scope.$digest();

			pager.last();
			expect(pager.currentPage).to.equal(5);
		});

		it('should update the last page when the page size changes', (): void => {
			buildController(10);
			pager.last();
			expect(pager.currentPage).to.equal(10);

			// increasing the page size to 5 decreases the number of pages to 2
			dataPager.pageSize = 5;
			scope.$digest();

			pager.last();
			expect(pager.currentPage).to.equal(2);
		});

		it('should update the current page when the last page changes', (): void => {
			buildController(5);
			pager.currentPage = 5;

			dataSource.count = 8;
			scope.$digest();

			expect(pager.currentPage).to.equal(1);
		});
	});

	describe('updatePaging', (): void => {
		describe('canGoBack', (): void => {
			beforeEach((): void => {
				buildController(5);
			});

			it('should be false if on the first page', (): void => {
				pager.currentPage = 1;
				scope.$digest();
				expect(pager.canGoBack).to.be.false;
			});

			it('should be true if not on the first page', (): void => {
				pager.currentPage = 5;
				scope.$digest();
				expect(pager.canGoBack).to.be.true;
			});
		});

		describe('canGoForward', (): void => {
			beforeEach((): void => {
				buildController(5);
			});

			it('should be false if on the last page', (): void => {
				pager.currentPage = 5;
				scope.$digest();
				expect(pager.canGoForward).to.be.false;
			});

			it('should be true if not on the last page', (): void => {
				pager.currentPage = 1;
				scope.$digest();
				expect(pager.canGoForward).to.be.true;
			});
		});

		describe('pages', (): void => {
			it('should generate a range of pages equal to the visible page count centered around the current page', (): void => {
				buildController(5, 5);
				pager.currentPage = 3;
				scope.$digest();

				expect(pager.pages).to.have.length(5);
				expect(pager.pages[0]).to.equal(1);
				expect(pager.pages[1]).to.equal(2);
				expect(pager.pages[2]).to.equal(3);
				expect(pager.pages[3]).to.equal(4);
				expect(pager.pages[4]).to.equal(5);

				buildController(5, 3);
				pager.currentPage = 3;
				scope.$digest();

				expect(pager.pages).to.have.length(3);
				expect(pager.pages[0]).to.equal(2);
				expect(pager.pages[1]).to.equal(3);
				expect(pager.pages[2]).to.equal(4);
			});

			it('should show more pages after the current page if the current page is too close to the first page', (): void => {
				buildController(8, 5);
				pager.currentPage = 2;
				scope.$digest();

				expect(pager.pages).to.have.length(5);
				expect(pager.pages[0]).to.equal(1);
				expect(pager.pages[1]).to.equal(2);
				expect(pager.pages[2]).to.equal(3);
				expect(pager.pages[3]).to.equal(4);
				expect(pager.pages[4]).to.equal(5);
			});

			it('should show more pages before the current page if the current page is too close to the last page', (): void => {
				buildController(8, 5);
				pager.currentPage = 7;
				scope.$digest();

				expect(pager.pages).to.have.length(5);
				expect(pager.pages[0]).to.equal(4);
				expect(pager.pages[1]).to.equal(5);
				expect(pager.pages[2]).to.equal(6);
				expect(pager.pages[3]).to.equal(7);
				expect(pager.pages[4]).to.equal(8);
			});

			it('should show all pages if the page count is greater than the number of pages', (): void => {
				buildController(3, 5);
				pager.currentPage = 3;
				scope.$digest();

				expect(pager.pages).to.have.length(3);
				expect(pager.pages[0]).to.equal(1);
				expect(pager.pages[1]).to.equal(2);
				expect(pager.pages[2]).to.equal(3);
			});

			it('should show an additional page after the current page if an even number of visible pages is specified', (): void => {
				buildController(5, 4);
				pager.currentPage = 3;
				scope.$digest();

				expect(pager.pages).to.have.length(4);
				expect(pager.pages[0]).to.equal(2);
				expect(pager.pages[1]).to.equal(3);
				expect(pager.pages[2]).to.equal(4);
				expect(pager.pages[3]).to.equal(5);
			});
		});
	});

	function buildController(lastPage?: number, pageCount?: number): void {
		dataPager = {
			pageSize: 1,
			pageNumber: 1,
		};

		dataSource = {
			count: lastPage,
			onPagingChange: sinon.spy(),
		};

		var bindings: any = {
			pageCount: pageCount,
			builder: {
				_pager: dataPager,
				_dataSource: dataSource,
			},
		};

		var controllerResult: test.IControllerResult<PagerController>
			= test.angularFixture.controllerWithBindings<PagerController>(controllerName, bindings);

		scope = controllerResult.scope;
		pager = controllerResult.controller;

		if (lastPage != null) {
			scope.$digest();
			dataSource.onPagingChange.reset();
		}
	}
});
