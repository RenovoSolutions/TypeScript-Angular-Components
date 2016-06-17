import { Subject } from 'rxjs';

import { PagerComponent } from './pager';


interface IDataPagerMock {
	pageSize: number;
	pageNumber: number;
	pageSizeChanges: Subject<number>;
}

interface IDataSourceMock {
	count: number;
	countChanges: Subject<number>;
	setCount(count: number): void;
	pager: IDataPagerMock;
}

describe('PagerComponent', () => {
	let pager: PagerComponent;
	let dataPager: IDataPagerMock;
	let dataSource: IDataSourceMock;
	let cardContainer: any;

	beforeEach(() => {
		dataPager = {
			pageSize: 1,
			pageNumber: 1,
			pageSizeChanges: new Subject<number>(),
		};

		dataSource = {
			count: 1,
			countChanges: new Subject<number>(),
			setCount(count: number): void {
				dataSource.count = count;
				dataSource.countChanges.next(count);
			},
			pager: dataPager,
		};

		cardContainer = { dataSource };

		pager = new PagerComponent(cardContainer);
		pager.ngOnInit();
	});

	describe('first', (): void => {
		it('should set the current page to the first page', (): void => {
			pager.pager.pageNumber = 5;

			pager.first();

			expect(pager.pager.pageNumber).to.equal(1);
		});
	});

	describe('previous', (): void => {
		it('should decrement the current page if it is not on the first page', (): void => {
			pager.pager.pageNumber = 5;

			pager.previous();

			expect(pager.pager.pageNumber).to.equal(4);
		});

		it('should stay on the current page if it is on the first page', (): void => {
			pager.pager.pageNumber = 1;

			pager.previous();

			expect(pager.pager.pageNumber).to.equal(1);
		});
	});

	describe('next', (): void => {
		beforeEach((): void => {
			dataSource.count = 5;
			pager = new PagerComponent(cardContainer);
			pager.ngOnInit();
		});

		it('should increment the current page if it is not on the last page', (): void => {
			pager.pager.pageNumber = 1;

			pager.next();

			expect(pager.pager.pageNumber).to.equal(2);
		});

		it('should stay on the current page if it is on the last page', (): void => {
			pager.pager.pageNumber = 5;

			pager.next();

			expect(pager.pager.pageNumber).to.equal(5);
		});
	});

	describe('goto', (): void => {
		beforeEach((): void => {
			dataSource.count = 5;
			pager = new PagerComponent(cardContainer);
			pager.ngOnInit();
			pager.pager.pageNumber = 5;
		});

		it('should go to the specified page if the page exists', (): void => {
			pager.goto(3);
			expect(pager.pager.pageNumber).to.equal(3);
		});

		it('should stay on the current page if the specified page is before the first page', (): void => {
			pager.goto(0);
			expect(pager.pager.pageNumber).to.equal(5);
		});

		it('should stay on the current page if the specified page is after the last page', (): void => {
			pager.goto(6);
			expect(pager.pager.pageNumber).to.equal(5);
		});
	});

	describe('last', (): void => {
		it('should go to the last page', (): void => {
			dataSource.count = 5;
			pager = new PagerComponent(cardContainer);
			pager.ngOnInit();

			pager.pager.pageNumber = 1;

			pager.last();

			expect(pager.pager.pageNumber).to.equal(5);
		});
	});

	describe('setPage', (): void => {
		it('should update the pageNumber on the pager when the page is set', (): void => {
			dataSource.count = 5;
			pager = new PagerComponent(cardContainer);
			pager.ngOnInit();

			pager.setPage(2);

			expect(dataPager.pageNumber).to.equal(2);

			pager.setPage(4);

			expect(dataPager.pageNumber).to.equal(4);
		});
	});

	describe('updatePageCount', (): void => {
		it('should set the last page to the item count divided by the page size rounded up', (): void => {
			dataPager.pageSize = 3;
			dataSource.setCount(10);

			// 10 / 3 = 3.3333...
			pager.last();
			expect(pager.pager.pageNumber).to.equal(4);
		});

		it('should update the last page when the data source count changes', (): void => {
			dataSource.count = 1;
			pager = new PagerComponent(cardContainer);
			pager.ngOnInit();
			pager.last();
			expect(pager.pager.pageNumber).to.equal(1);

			dataSource.setCount(5);

			pager.last();
			expect(pager.pager.pageNumber).to.equal(5);
		});

		it('should update the last page when the page size changes', (): void => {
			dataSource.count = 10;
			pager = new PagerComponent(cardContainer);
			pager.ngOnInit();
			pager.last();
			expect(pager.pager.pageNumber).to.equal(10);

			// increasing the page size to 5 decreases the number of pages to 2
			dataPager.pageSize = 5;
			dataPager.pageSizeChanges.next(5);

			pager.last();
			expect(pager.pager.pageNumber).to.equal(2);
		});

		it('should update the current page when the last page changes', (): void => {
			dataSource.count = 5;
			pager = new PagerComponent(cardContainer);
			pager.ngOnInit();
			pager.pager.pageNumber = 5;

			dataSource.setCount(8);

			expect(pager.pager.pageNumber).to.equal(1);
		});
	});

	describe('updatePaging', (): void => {
		describe('canGoBack', (): void => {
			beforeEach((): void => {
				dataSource.count = 5;
				pager = new PagerComponent(cardContainer);
				pager.ngOnInit();
			});

			it('should be false if on the first page', (): void => {
				pager.pager.pageNumber = 1;
				expect(pager.canGoBack).to.be.false;
			});

			it('should be true if not on the first page', (): void => {
				pager.pager.pageNumber = 5;
				expect(pager.canGoBack).to.be.true;
			});
		});

		describe('canGoForward', (): void => {
			beforeEach((): void => {
				dataSource.count = 5;
				pager = new PagerComponent(cardContainer);
				pager.ngOnInit();
			});

			it('should be false if on the last page', (): void => {
				pager.pager.pageNumber = 5;
				expect(pager.canGoForward).to.be.false;
			});

			it('should be true if not on the last page', (): void => {
				pager.pager.pageNumber = 1;
				expect(pager.canGoForward).to.be.true;
			});
		});

		describe('pages', (): void => {
			it('should generate a range of pages equal to the visible page count centered around the current page', (): void => {
				dataSource.count = 5;
				pager = new PagerComponent(cardContainer);
				pager.pageCount = 5;
				pager.ngOnInit();

				pager.setPage(3);

				expect(pager.pages).to.have.length(5);
				expect(pager.pages[0]).to.equal(1);
				expect(pager.pages[1]).to.equal(2);
				expect(pager.pages[2]).to.equal(3);
				expect(pager.pages[3]).to.equal(4);
				expect(pager.pages[4]).to.equal(5);

				dataSource.count = 5;
				pager = new PagerComponent(cardContainer);
				pager.pageCount = 3;
				pager.ngOnInit();

				pager.setPage(3);

				expect(pager.pages).to.have.length(3);
				expect(pager.pages[0]).to.equal(2);
				expect(pager.pages[1]).to.equal(3);
				expect(pager.pages[2]).to.equal(4);
			});

			it('should show more pages after the current page if the current page is too close to the first page', (): void => {
				dataSource.count = 8;
				pager = new PagerComponent(cardContainer);
				pager.pageCount = 5
				pager.ngOnInit();

				pager.setPage(2);

				expect(pager.pages).to.have.length(5);
				expect(pager.pages[0]).to.equal(1);
				expect(pager.pages[1]).to.equal(2);
				expect(pager.pages[2]).to.equal(3);
				expect(pager.pages[3]).to.equal(4);
				expect(pager.pages[4]).to.equal(5);
			});

			it('should show more pages before the current page if the current page is too close to the last page', (): void => {
				dataSource.count = 8;
				pager = new PagerComponent(cardContainer);
				pager.pageCount = 5;
				pager.ngOnInit();

				pager.setPage(7);

				expect(pager.pages).to.have.length(5);
				expect(pager.pages[0]).to.equal(4);
				expect(pager.pages[1]).to.equal(5);
				expect(pager.pages[2]).to.equal(6);
				expect(pager.pages[3]).to.equal(7);
				expect(pager.pages[4]).to.equal(8);
			});

			it('should show all pages if the page count is greater than the number of pages', (): void => {
				dataSource.count = 3;
				pager = new PagerComponent(cardContainer);
				pager.pageCount = 5;
				pager.ngOnInit();

				pager.setPage(3);

				expect(pager.pages).to.have.length(3);
				expect(pager.pages[0]).to.equal(1);
				expect(pager.pages[1]).to.equal(2);
				expect(pager.pages[2]).to.equal(3);
			});

			it('should show an additional page after the current page if an even number of visible pages is specified', (): void => {
				dataSource.count = 5;
				pager = new PagerComponent(cardContainer);
				pager.pageCount = 4;
				pager.ngOnInit();

				pager.setPage(3);

				expect(pager.pages).to.have.length(4);
				expect(pager.pages[0]).to.equal(2);
				expect(pager.pages[1]).to.equal(3);
				expect(pager.pages[2]).to.equal(4);
				expect(pager.pages[3]).to.equal(5);
			});
		});
	});
});
