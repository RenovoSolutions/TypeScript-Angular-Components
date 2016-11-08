import { BehaviorSubject } from 'rxjs';

import { PagerComponent } from './pager';

interface IDataPagerMock {
	pageSize$: BehaviorSubject<number>;
	pageNumber$: BehaviorSubject<number>;
	setPage: Sinon.SinonSpy;
}

interface IDataSourceMock {
	count$: BehaviorSubject<number>;
	pager: IDataPagerMock;
}

describe('PagerComponent', () => {
	let pager: PagerComponent<any>;
	let dataPager: IDataPagerMock;
	let dataSource: IDataSourceMock;
	let cardContainer: any;

	beforeEach(() => {
		dataPager = {
			pageSize$: new BehaviorSubject(1),
			pageNumber$: new BehaviorSubject(1),
			setPage: sinon.spy(page => dataPager.pageNumber$.next(page)),
		};

		dataSource = {
			count$: new BehaviorSubject(1),
			pager: dataPager,
		};

		cardContainer = { dataSource };

		pager = new PagerComponent(cardContainer);
		pager.ngOnInit();
	});

	describe('lastPage$', () => {
		it('should get the total number of pages based on the count and page size', () => {
			let lastPage;
			pager.lastPage$.subscribe(result => lastPage = result);
			dataSource.count$.next(40);
			dataPager.pageSize$.next(4);
			expect(lastPage).to.equal(10);
		});

		it('should round up to the nearest page', () => {
			let lastPage;
			pager.lastPage$.subscribe(result => lastPage = result);
			dataSource.count$.next(41);
			dataPager.pageSize$.next(4);
			expect(lastPage).to.equal(11);
		});
	});

	describe('canGoBack$', () => {
		it('should be true if the page number is greater than 1', () => {
			let canGoBack;
			pager.canGoBack$.subscribe(result => canGoBack = result);
			dataPager.pageNumber$.next(4);
			expect(canGoBack).to.be.true;
		});

		it('should be false if the page number is 1', () => {
			let canGoBack;
			pager.canGoBack$.subscribe(result => canGoBack = result);
			dataPager.pageNumber$.next(1);
			expect(canGoBack).to.be.false;
		});
	});

	describe('canGoForward$', () => {
		it('should be true if the page number is less than the last page', () => {
			let canGoForward;
			pager.canGoForward$.subscribe(result => canGoForward = result);
			dataPager.pageNumber$.next(4);
			dataSource.count$.next(40);
			dataPager.pageSize$.next(4);
			expect(canGoForward).to.be.true;
		});

		it('should be false if the page number equal to the last page', () => {
			let canGoForward;
			pager.canGoForward$.subscribe(result => canGoForward = result);
			dataPager.pageNumber$.next(4);
			dataSource.count$.next(40);
			dataPager.pageSize$.next(10);
			expect(canGoForward).to.be.false;
		});
	});

	describe('pages$', () => {
		it('should generate a range of pages centered around the current page', () => {
			dataSource.count$.next(5);
			pager.ngOnInit();
			let pages;
			pager.pages$.subscribe(result => pages = result);

			dataPager.pageNumber$.next(3);

			expect(pages).to.deep.equal([1, 2, 3, 4, 5]);
		});

		it('should limit the number of pages to the visible page count', () => {
			dataSource.count$.next(5);
			pager.pageCount = 3;
			pager.ngOnInit();
			let pages;
			pager.pages$.subscribe(result => pages = result);

			dataPager.pageNumber$.next(3);

			expect(pages).to.deep.equal([2, 3, 4]);
		});

		it('should show more pages after the current page if too close to the first page', () => {
			dataSource.count$.next(5);
			pager.ngOnInit();
			let pages;
			pager.pages$.subscribe(result => pages = result);

			dataPager.pageNumber$.next(2);

			expect(pages).to.deep.equal([1, 2, 3, 4, 5]);
		});

		it('should show more pages before the current page if too close to the last page', () => {
			dataSource.count$.next(8);
			pager.ngOnInit();
			let pages;
			pager.pages$.subscribe(result => pages = result);

			dataPager.pageNumber$.next(7);

			expect(pages).to.deep.equal([4, 5, 6, 7, 8]);
		});

		it('should show all pages if the page count is greater than the number of pages', () => {
			dataSource.count$.next(3);
			pager.ngOnInit();
			let pages;
			pager.pages$.subscribe(result => pages = result);

			dataPager.pageNumber$.next(3);

			expect(pages).to.deep.equal([1, 2, 3]);
		});

		it('should show an additional page after the current page if an even number of visible pages is specified', () => {
			dataSource.count$.next(5);
			pager.pageCount = 4;
			pager.ngOnInit();
			let pages;
			pager.pages$.subscribe(result => pages = result);

			dataPager.pageNumber$.next(3);

			expect(pages).to.deep.equal([2, 3, 4, 5]);
		});
	});

	describe('first', (): void => {
		it('should set the current page to the first page', (): void => {
			dataPager.pageNumber$.next(5);

			pager.first();

			expect(dataPager.pageNumber$.getValue()).to.equal(1);
		});
	});

	describe('previous', (): void => {
		it('should decrement the current page if it is not on the first page', (): void => {
			dataPager.pageNumber$.next(5);

			pager.previous();

			expect(dataPager.pageNumber$.getValue()).to.equal(4);
		});

		it('should stay on the current page if it is on the first page', (): void => {
			dataPager.pageNumber$.next(1);

			pager.previous();

			expect(dataPager.pageNumber$.getValue()).to.equal(1);
		});
	});

	describe('next', (): void => {
		beforeEach((): void => {
			dataSource.count$.next(5);
			pager = new PagerComponent(cardContainer);
			pager.ngOnInit();
		});

		it('should increment the current page if it is not on the last page', (): void => {
			dataPager.pageNumber$.next(1);

			pager.next();

			expect(dataPager.pageNumber$.getValue()).to.equal(2);
		});

		it('should stay on the current page if it is on the last page', (): void => {
			dataPager.pageNumber$.next(5);

			pager.next();

			expect(dataPager.pageNumber$.getValue()).to.equal(5);
		});
	});

	describe('goto', (): void => {
		beforeEach((): void => {
			dataSource.count$.next(5);
			pager = new PagerComponent(cardContainer);
			pager.ngOnInit();
			dataPager.pageNumber$.next(5);
		});

		it('should go to the specified page if the page exists', (): void => {
			pager.goto(3);
			expect(dataPager.pageNumber$.getValue()).to.equal(3);
		});

		it('should stay on the current page if the specified page is before the first page', (): void => {
			pager.goto(0);
			expect(dataPager.pageNumber$.getValue()).to.equal(5);
		});

		it('should stay on the current page if the specified page is after the last page', (): void => {
			pager.goto(6);
			expect(dataPager.pageNumber$.getValue()).to.equal(5);
		});
	});

	describe('last', (): void => {
		it('should go to the last page', (): void => {
			dataSource.count$.next(5);
			pager = new PagerComponent(cardContainer);
			pager.ngOnInit();

			dataPager.pageNumber$.next(1);

			pager.last();

			expect(dataPager.pageNumber$.getValue()).to.equal(5);
		});
	});
});
