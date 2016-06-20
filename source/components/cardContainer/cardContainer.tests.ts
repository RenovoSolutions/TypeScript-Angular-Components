import * as _ from 'lodash';
import { Subject } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;

import { DataPager } from './paging/index';

import { CardContainerComponent	} from './cardContainer';
import {
	IBreakpointSize,
	IColumn,
	CardComponent,
	sorts,
	builder as __builder,
} from './index';

interface IDataSourceMock {
	refresh: Sinon.SinonSpy;
	onSortChange?: Sinon.SinonSpy;
	pager?: IDataPagerMock;
	filters?: IFilterMock[];
	rawDataSet?: any[];
	dataSet?: any[];
	filteredDataSet?: any[];
	initPager: Sinon.SinonSpy;
	changed: Subject<void>;
	redrawing: Subject<void>;
}

interface IDataPagerMock {
	pageSize: number;
	pageNumber: number;
	filter: Sinon.SinonSpy;
}

interface IFilterMock {
	type: string;
	filter: Sinon.SinonSpy;
}

describe('CardContainerComponent', () => {
	let cardContainer: CardContainerComponent<any>;
	let builder: __builder.CardContainerBuilder;
	let mockedDataSource: IDataSourceMock;

	beforeEach(() => {
		cardContainer = new CardContainerComponent(__object.objectUtility, __array.arrayUtility, new DataPager());

		builder = new __builder.CardContainerBuilder(<any>{}, <any>{}, <any>{});

		mockedDataSource = buildMockedDataSource();
		cardContainer.dataSource = <any>mockedDataSource;
		builder._dataSource = <any>mockedDataSource;
	});

	describe('data source', (): void => {
		it('should put source on the controller', (): void => {
			cardContainer.ngOnInit();
			expect(cardContainer.dataSource).to.equal(mockedDataSource);
		});
	});

	describe('paging', (): void => {
		it('should build a pager and give to the data source if paging is on', (): void => {
			builder.usePaging();
			cardContainer.ngOnInit();

			expect(cardContainer.builder._pager).to.equal(cardContainer.dataSource.pager);
			expect(cardContainer.dataSource.pager.pageNumber).to.exist;
			expect(cardContainer.dataSource.pager.pageSize).to.exist;
			expect(_.isFunction(cardContainer.dataSource.pager.filter)).to.be.true;
		});

		it('should not have a pager if paging is off', (): void => {
			cardContainer.ngOnInit();

			expect(cardContainer.builder._pager).to.not.exist;
			expect(cardContainer.dataSource.pager).to.not.exist;
		});

		it('should use the data source\'s pager if paging is not specified', (): void => {
			let pager: IDataPagerMock = {
				pageNumber: 1,
				pageSize: 10,
				filter: sinon.spy(),
			};

			let dataSource: IDataSourceMock = buildMockedDataSource();
			dataSource.pager = pager;

			builder._dataSource = <any>dataSource;
			cardContainer.ngOnInit();

			expect(cardContainer.builder._pager).to.equal(pager);
			expect(cardContainer.dataSource.pager).to.equal(pager);
		});
	});

	describe('card coordination', (): void => {
		let card: CardComponent<any>;

		beforeEach((): void => {
			card = <any>{
				close: sinon.spy((): boolean => { return true; }),
			};
		});

		it('should signal cards to close before a card opens', (): void => {
			cardContainer.ngOnInit();

			cardContainer.registerCard(card);

			let okayToOpen: boolean = false;

			okayToOpen = cardContainer.openCard();

			sinon.assert.calledOnce(<Sinon.SinonSpy>card.close);

			expect(okayToOpen).to.be.true;
		});
	});

	describe('column sizes', (): void => {
		it('should fill column size with all breakpoint values', (): void => {
			builder.addColumn(<any>{
				size: {},
			});
			builder.addColumn(<any>{
				size: {
					xs: 1,
				},
			});
			builder.addColumn(<any>{
				size: {
					lg: 1,
				},
			});
			builder.addColumn(<any>{
				size: {
					xs: 1,
					md: 2,
				},
			});
			builder.addColumn(<any>{
				size: {
					xs: 1,
					sm: 2,
					md: 3,
					lg: 4,
				},
			});

			cardContainer.ngOnInit();

			let size: IBreakpointSize = cardContainer.columns[0].size;
			expect(size.xs).to.equal(0);
			expect(size.sm).to.equal(0);
			expect(size.md).to.equal(0);
			expect(size.lg).to.equal(0);

			size = cardContainer.columns[1].size;
			expect(size.xs).to.equal(1);
			expect(size.sm).to.equal(1);
			expect(size.md).to.equal(1);
			expect(size.lg).to.equal(1);

			size = cardContainer.columns[2].size;
			expect(size.xs).to.equal(0);
			expect(size.sm).to.equal(0);
			expect(size.md).to.equal(0);
			expect(size.lg).to.equal(1);

			size = cardContainer.columns[3].size;
			expect(size.xs).to.equal(1);
			expect(size.sm).to.equal(1);
			expect(size.md).to.equal(2);
			expect(size.lg).to.equal(2);

			size = cardContainer.columns[4].size;
			expect(size.xs).to.equal(1);
			expect(size.sm).to.equal(2);
			expect(size.md).to.equal(3);
			expect(size.lg).to.equal(4);
		});

		it('should use constant size for all breakpoints', (): void => {
			builder.addColumn(<any>{
				size: 3,
			});

			cardContainer.ngOnInit();

			let size: IBreakpointSize = cardContainer.columns[0].size;
			expect(size.xs).to.equal(3);
			expect(size.sm).to.equal(3);
			expect(size.md).to.equal(3);
			expect(size.lg).to.equal(3);
		});
	});

	describe('sort', (): void => {
		it('should add new columns to the front and bump off sorts when greater tham max sorts', (): void => {
			let columns: IColumn<any>[] = <any>[
				{
					label: 'col1',
					size: {},
				},
				{
					label: 'col2',
					size: {},
				},
				{
					label: 'col3',
					size: {},
				},
			];
			builder.addColumn(columns[0]);
			builder.addColumn(columns[1]);
			builder.addColumn(columns[2]);
			cardContainer.maxColumnSorts = 2;
			cardContainer.ngOnInit();

			cardContainer.sort(columns[0]);

			expect(cardContainer.dataSource.sorts).to.have.length(1);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(columns[0]);
			expect(columns[0].sortDirection).to.equal(sorts.SortDirection.ascending);

			cardContainer.sort(columns[1]);

			expect(cardContainer.dataSource.sorts).to.have.length(2);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(columns[1]);
			expect(cardContainer.dataSource.sorts[1].direction).to.equal(sorts.SortDirection.ascending);
			expect(cardContainer.dataSource.sorts[1].column).to.equal(columns[0]);
			expect(columns[1].sortDirection).to.equal(sorts.SortDirection.ascending);
			expect(columns[0].sortDirection).to.be.null;

			cardContainer.sort(columns[2]);

			expect(cardContainer.dataSource.sorts).to.have.length(2);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(columns[2]);
			expect(cardContainer.dataSource.sorts[1].direction).to.equal(sorts.SortDirection.ascending);
			expect(cardContainer.dataSource.sorts[1].column).to.equal(columns[1]);
			expect(columns[2].sortDirection).to.equal(sorts.SortDirection.ascending);
			expect(columns[1].sortDirection).to.be.null;
			expect(columns[0].sortDirection).to.be.null;

			sinon.assert.calledThrice(mockedDataSource.onSortChange);
		});

		it('should change sort direction if specified column is already at the front of the sort', (): void => {
			let columns: IColumn<any>[] = <any>[
				{
					label: 'col1',
					size: {},
				},
				{
					label: 'col2',
					size: {},
				},
			];
			cardContainer.columns = columns;
			cardContainer.ngOnInit();

			cardContainer.sort(columns[1]);
			cardContainer.sort(columns[0]);

			expect(cardContainer.dataSource.sorts).to.have.length(2);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(columns[0]);
			expect(columns[0].sortDirection).to.equal(sorts.SortDirection.ascending);

			cardContainer.sort(columns[0]);

			expect(cardContainer.dataSource.sorts).to.have.length(2);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.descending);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(columns[0]);
			expect(columns[0].sortDirection).to.equal(sorts.SortDirection.descending);

			cardContainer.sort(columns[0]);

			expect(cardContainer.dataSource.sorts).to.have.length(1);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(columns[1]);
			expect(columns[0].sortDirection).to.be.null;

			sinon.assert.callCount(mockedDataSource.onSortChange, 4);
		});

		it('should replace all sorts with columns secondary sorts if present', (): void => {
			let columnWithSecondarySorts: IColumn<any> = <any>{
				label: 'colWithSecondary',
				size: {},
				secondarySorts: {
					ascending: [
						{
							column: 'secondarySortCol',
							direction: sorts.SortDirection.descending,
						},
					],
					descending: [
						{
							column: 'secondarySortCol',
							direction: sorts.SortDirection.ascending,
						},
					],
				},
			};
			let secondarySortColumn: IColumn<any> = <any>{
				label: 'secondarySortCol',
				size: {},
			};
			let colWithoutSecondary1: IColumn<any> = <any>{
				label: 'colWithoutSecondary1',
				size: {},
			};
			let colWithoutSecondary2: IColumn<any> = <any>{
				label: 'colWithoutSecondary2',
				size: {},
			};
			builder.addColumn(colWithoutSecondary1);
			builder.addColumn(colWithoutSecondary2);
			builder.addColumn(columnWithSecondarySorts);
			builder.addColumn(secondarySortColumn);
			cardContainer.ngOnInit();

			cardContainer.sort(colWithoutSecondary1);
			cardContainer.sort(colWithoutSecondary2);

			cardContainer.sort(columnWithSecondarySorts);

			expect(cardContainer.dataSource.sorts).to.have.length(2);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(columnWithSecondarySorts);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
			expect(cardContainer.dataSource.sorts[1].column).to.equal(secondarySortColumn);
			expect(cardContainer.dataSource.sorts[1].direction).to.equal(sorts.SortDirection.descending);

			cardContainer.sort(columnWithSecondarySorts);

			expect(cardContainer.dataSource.sorts).to.have.length(2);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(columnWithSecondarySorts);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.descending);
			expect(cardContainer.dataSource.sorts[1].column).to.equal(secondarySortColumn);
			expect(cardContainer.dataSource.sorts[1].direction).to.equal(sorts.SortDirection.ascending);

			cardContainer.sort(columnWithSecondarySorts);

			expect(cardContainer.dataSource.sorts).to.be.empty;

			sinon.assert.callCount(mockedDataSource.onSortChange, 5);
		});

		it('should override the default max column size', (): void => {
			builder.maxColumnSorts = 1;
			let columns: IColumn<any>[] = <any>[
				{
					label: 'col1',
					size: {},
				},
				{
					label: 'col2',
					size: {},
				},
			];
			builder.addColumn(columns[0]);
			builder.addColumn(columns[1]);
			cardContainer.ngOnInit();

			cardContainer.sort(columns[0]);
			cardContainer.sort(columns[1]);

			expect(cardContainer.dataSource.sorts).to.have.length(1);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(columns[1]);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
		});
	});

	describe('filters', (): void => {
		it('should set the filters on the data source and call refresh', (): void => {
			let filters: IFilterMock[] = [{
				type: 'type',
				filter: sinon.spy(),
			}];

			let dataSource: IDataSourceMock = buildMockedDataSource();

			builder._dataSource = <any>dataSource;
			builder._filters = filters;

			cardContainer.ngOnInit();

			expect(dataSource.filters).to.equal(filters);
			sinon.assert.calledOnce(dataSource.refresh);
		});

		it('should init filters from data source filters if no filters are specified', (): void => {
			let filters: IFilterMock[] = [{
				type: 'type',
				filter: sinon.spy(),
			}];

			let dataSource: IDataSourceMock = buildMockedDataSource();
			dataSource.filters = filters;

			builder._dataSource = <any>dataSource;

			cardContainer.ngOnInit();

			expect(cardContainer.filters).to.equal(filters);
		});
	});

	function buildMockedDataSource(): IDataSourceMock {
		return <any>{
			refresh: sinon.spy(),
			onSortChange: sinon.spy(),
			initPager: sinon.spy(),
			changed: new Subject<void>(),
			redrawing: new Subject<void>(),
		};
	}
});
