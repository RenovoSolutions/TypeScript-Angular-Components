import { BehaviorSubject } from 'rxjs';
import { isFunction } from 'lodash';

import { DataPager } from './paging/index';
import { Sorter } from './sorts/index';

import { CardContainerComponent } from './cardContainer';
import {
	IBreakpointSize,
	IColumn,
	CardComponent,
	sorts,
} from './index';

interface IDataSourceMock {
	pager?: IDataPagerMock;
	filters?: IFilterMock[];
	rawDataSet$: BehaviorSubject<any>;
	dataSet$: BehaviorSubject<any>;
	filteredDataSet$: BehaviorSubject<any>;
	init: sinon.SinonSpy;
}

interface IDataPagerMock {
	pageSize$: BehaviorSubject<number>;
	pageNumber$: BehaviorSubject<number>;
	filter: sinon.SinonSpy;
}

interface IFilterMock {
	filter: sinon.SinonSpy;
}

interface SortManagerMock {
	updateSorts: sinon.SinonSpy;
	setup: sinon.SinonSpy;
}

describe('CardContainerComponent', () => {
	let cardContainer: CardContainerComponent<any>;
	let dataSource: IDataSourceMock;
	let sortManager: SortManagerMock;

	beforeEach(() => {
		sortManager = {
			updateSorts: sinon.spy(),
			setup: sinon.spy(),
		};

		cardContainer = new CardContainerComponent(new DataPager(), <any>{}, <any>sortManager);

		cardContainer.builder = <any>{};

		dataSource = buildMockedDataSource();
		cardContainer.dataSource = <any>dataSource;
	});

	function buildMockedDataSource(): IDataSourceMock {
		return <any>{
			rawDataSet$: new BehaviorSubject([]),
			filteredDataSet$: new BehaviorSubject([]),
			dataSet$: new BehaviorSubject([]),
			init: sinon.spy(),
		};
	}

	it('should set the filters on the data source', (): void => {
		let filters: IFilterMock[] = [{
			filter: sinon.spy(),
		}];

		let dataSource: IDataSourceMock = buildMockedDataSource();

		cardContainer.builder.dataSource = <any>dataSource;
		cardContainer.builder.filters = <any>filters;

		cardContainer.ngOnInit();

		expect(dataSource.filters).to.equal(filters);
	});

	describe('hasItems', () => {
		it('should return true if the data set is not empty', () => {
			dataSource.dataSet$.next([]);
			let hasItems;
			cardContainer.hasItems$.subscribe(result => hasItems = result);

			expect(hasItems).to.be.false;

			dataSource.dataSet$.next([1]);

			expect(hasItems).to.be.true;
		});
	});

	describe('data source', (): void => {
		it('should put the source on the controller', (): void => {
			cardContainer.builder.dataSource = <any>dataSource;
			cardContainer.ngOnInit();
			expect(cardContainer.dataSource).to.equal(dataSource);
		});
	});

	describe('paging', (): void => {
		beforeEach(() => {
			cardContainer.builder.dataSource = <any>dataSource;
		});

		it('should build a pager and give to the data source if paging is on', (): void => {
			cardContainer.builder.paging = true;
			cardContainer.ngOnInit();

			expect(cardContainer.dataSource.pager.pageNumber$).to.exist;
			expect(cardContainer.dataSource.pager.pageSize$).to.exist;
			expect(isFunction(cardContainer.dataSource.pager.filter)).to.be.true;
		});

		it('should not have a pager if paging is off', (): void => {
			cardContainer.ngOnInit();
			expect(cardContainer.dataSource.pager).to.not.exist;
		});
	});

	describe('card coordination', (): void => {
		let card: CardComponent<any>;

		beforeEach((): void => {
			card = <any>{
				close: sinon.spy((): boolean => { return true; }),
			};
			cardContainer.cardChildren = <any>{
				toArray: () => [card],
			};
		});

		it('should signal cards to close before a card opens', (): void => {
			let okayToOpen: boolean = false;

			okayToOpen = cardContainer.openCard();

			sinon.assert.calledOnce(<sinon.SinonSpy>card.close);

			expect(okayToOpen).to.be.true;
		});
	});

	describe('sort', (): void => {
		it('should sort on the sort manager', () => {
			const column = <any>{};

			cardContainer.sort(column);

			sinon.assert.calledOnce(sortManager.updateSorts);
			expect(sortManager.updateSorts.firstCall.args[0]).to.equal(column);
		});
	});
});
