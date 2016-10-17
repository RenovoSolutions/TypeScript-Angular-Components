import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	CardContainerController,
	ICardContainerScope,
	ICardContainerAttrs,
	IBreakpointSize,
	IColumn,
	moduleName,
	controllerName,
	card,
	sorts,
	builder as __builder,
} from './cardContainer.module';
import { cardContainerBuilderServiceName } from '../../componentsDowngrade';

import * as angular from 'angular';
import 'angular-mocks';
import { Subject } from 'rxjs';

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

describe('CardContainerController', () => {
	let scope: ICardContainerScope;
	let cardContainer: CardContainerController;
	let builder: __builder.CardContainerBuilderOld;
	let mockedDataSource: IDataSourceMock;
	let $attrs: ICardContainerAttrs;

	beforeEach(() => {
		angular.mock.module(moduleName);

		$attrs = <any>{ disableSelection: null };

		test.angularFixture.mock({
			$attrs: $attrs,
		});

		cardContainer = <any>{};

		let services: any = test.angularFixture.inject(cardContainerBuilderServiceName);

		builder = services[cardContainerBuilderServiceName].getInstance();
		builder._dataSource = null;
	});

	describe('data source', (): void => {
		it('should put source on the controller', (): void => {
			buildController();
			expect(cardContainer.dataSource).to.equal(mockedDataSource);
		});
	});

	describe('paging', (): void => {
		it('should build a pager and give to the data source if paging is on', (): void => {
			builder.usePaging();
			buildController();

			expect(cardContainer.builder._pager).to.equal(cardContainer.dataSource.pager);
			expect(cardContainer.dataSource.pager.pageNumber).to.exist;
			expect(cardContainer.dataSource.pager.pageSize).to.exist;
			expect(_.isFunction(cardContainer.dataSource.pager.filter)).to.be.true;
		});

		it('should not have a pager if paging is off', (): void => {
			buildController();

			expect(cardContainer.builder._pager).to.not.exist;
			expect(cardContainer.dataSource.pager).to.not.exist;
		});

		it('should use the data sources pager if paging is not specified', (): void => {
			let pager: IDataPagerMock = {
				pageNumber: 1,
				pageSize: 10,
				filter: sinon.spy(),
			};

			let dataSource: IDataSourceMock = buildMockedDataSource();
			dataSource.pager = pager;

			builder._dataSource = <any>dataSource;
			buildController();

			expect(cardContainer.builder._pager).to.equal(pager);
			expect(cardContainer.dataSource.pager).to.equal(pager);
		});
	});

	describe('card coordination', (): void => {
		let behavior: card.ICardBehavior; //*behavior will move to card

		beforeEach((): void => {
			behavior = {
				close: sinon.spy((): boolean => { return true; }),
			};
		});

		it('should signal cards to close before a card opens', (): void => {
			buildController();

			cardContainer.dataSource.dataSet = [
				{ viewData: { behavior: behavior } },
			];

			let okayToOpen: boolean = false;

			okayToOpen = cardContainer.openCard();

			sinon.assert.calledOnce(<Sinon.SinonSpy>behavior.close);

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

			buildController();

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

			buildController();

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
			buildController();

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
			buildController();

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
			buildController();

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
			buildController();

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

			buildController();

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

			buildController();

			expect(cardContainer.filters).to.equal(filters);
		});
	});

	describe('selectable cards', (): void => {
		let dataSource: IDataSourceMock;
		beforeEach((): void => {
			dataSource = buildMockedDataSource();
			dataSource.rawDataSet = [
				{ id: 0 },
				{ id: 1 },
			];

			builder._dataSource = <any>dataSource;
			builder.useSelection();
		});

		it('should add view data to all data items', (): void => {
			dataSource.redrawing.subscribe = sinon.spy();
			dataSource.changed.subscribe = sinon.spy();
			buildController();

			expect(dataSource.rawDataSet).to.have.length(2);
			expect(dataSource.rawDataSet[0].viewData).to.exist;
			expect(dataSource.rawDataSet[1].viewData).to.exist;

			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSource.redrawing.subscribe);
			sinon.assert.calledOnce(<Sinon.SinonSpy>dataSource.changed.subscribe);
		});

		it('should add view data to new items when changed is fire', (): void => {
			buildController();

			dataSource.rawDataSet.push({ id: 3 });

			expect(dataSource.rawDataSet).to.have.length(3);
			expect(dataSource.rawDataSet[0].viewData).to.exist;
			expect(dataSource.rawDataSet[1].viewData).to.exist;
			expect(dataSource.rawDataSet[2].viewData).to.not.exist;

			dataSource.changed.next(null);

			expect(dataSource.rawDataSet[2].viewData).to.exist;
		});

		it('should update count of selected items when selection changes', (): void => {
			dataSource.rawDataSet = [
				{ id: 0 },
				{ id: 1 },
			];
			dataSource.dataSet = dataSource.rawDataSet;
			dataSource.filteredDataSet = dataSource.rawDataSet;
			buildController();
			const numberSelectedSpy: Sinon.SinonSpy = sinon.spy();
			cardContainer.numberSelectedChanges.subscribe(numberSelectedSpy);

			_.each(dataSource.dataSet, (item: any): void => {
				item.viewData.selected = true;
			});

			expect(cardContainer.numberSelected).to.equal(0);

			cardContainer.selectionChanged();

			sinon.assert.calledOnce(numberSelectedSpy);
			expect(cardContainer.numberSelected).to.equal(2);

			_.each(dataSource.dataSet, (item: any): void => {
				item.viewData.selected = false;
			});

			expect(cardContainer.numberSelected).to.equal(2);

			cardContainer.selectionChanged();

			sinon.assert.calledTwice(numberSelectedSpy);
			expect(cardContainer.numberSelected).to.equal(0);
		});

		it('should fire selectionChangedEvent when selectionChanged is called', (): void => {
			let selectionSpy: Sinon.SinonSpy = sinon.spy();
			buildController();

			cardContainer.selectionChangedEvent = selectionSpy;

			cardContainer.selectionChanged();

			sinon.assert.calledOnce(selectionSpy);
		});

		it('should clear selected items that are not in the filtered data set when collection is redrawn', (): void => {
			dataSource.rawDataSet = [
				{ id: 0 },
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
			];
			dataSource.dataSet = _.clone(dataSource.rawDataSet);
			dataSource.filteredDataSet = dataSource.dataSet;
			buildController();

			_.each(dataSource.dataSet, (item: any): void => {
				item.viewData.selected = true;
			});

			dataSource.redrawing.next(null);

			expect(cardContainer.numberSelected).to.equal(4);

			dataSource.dataSet.pop();
			dataSource.dataSet.pop();
			dataSource.filteredDataSet = dataSource.dataSet;

			dataSource.redrawing.next(null);

			expect(cardContainer.numberSelected).to.equal(2);
		});

		it('should apply a sort in the select column', (): void => {
			buildController();

			cardContainer.sortSelected();

			expect(cardContainer.dataSource.sorts).to.have.length(1);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(cardContainer.selectionColumn);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
		});

		it('should allow individual items to disable selection if a disable selection function is provided', (): void => {
			$attrs.disableSelection = 'disableSelection';
			builder.disableSelection = (): string => {
				return 'disabled';
			};
			dataSource.rawDataSet = [
				{ id: 0 },
				{ id: 1 },
			];
			dataSource.dataSet = _.clone(dataSource.rawDataSet);
			dataSource.filteredDataSet = dataSource.dataSet;
			buildController();

			expect(dataSource.rawDataSet[0].viewData.disabledSelection).to.be.true;
			expect(dataSource.rawDataSet[0].viewData.selectionTitle).to.equal('disabled');
			expect(dataSource.rawDataSet[1].viewData.disabledSelection).to.be.true;
			expect(dataSource.rawDataSet[1].viewData.selectionTitle).to.equal('disabled');
		});

		it('should allow items to enable selection via a disable selection function if disable reason is null', (): void => {
			$attrs.disableSelection = 'disableSelection';
			builder.disableSelection = (): string => {
				return null;
			};
			dataSource.rawDataSet = [
				{ id: 0 },
				{ id: 1 },
			];
			dataSource.dataSet = _.clone(dataSource.rawDataSet);
			dataSource.filteredDataSet = dataSource.dataSet;
			buildController();

			expect(dataSource.rawDataSet[0].viewData.disabledSelection).to.be.false;
			expect(dataSource.rawDataSet[1].viewData.disabledSelection).to.be.false;
		});
	});

	describe('hasItems', (): void => {
		it('should return true if the data set is not empty', (): void => {
			let dataSource: IDataSourceMock;
			dataSource = buildMockedDataSource();
			dataSource.rawDataSet = [
				{ id: 0 },
				{ id: 1 },
			];
			dataSource.dataSet = dataSource.rawDataSet;
			buildController();

			cardContainer.dataSource.dataSet = [];

			expect(cardContainer.hasItems).to.be.false;

			cardContainer.dataSource.dataSet = [1];

			expect(cardContainer.hasItems).to.be.true;
		});
	});

	function buildController(): void {
		if (cardContainer.dataSource == null && builder._dataSource == null) {
			mockedDataSource = buildMockedDataSource();
			cardContainer.dataSource = <any>mockedDataSource;
			builder._dataSource = <any>mockedDataSource;
		}

		cardContainer.builder = builder;

		let locals: any = {
			$transclude: {},
		};

		let controllerResult: test.IControllerResult<CardContainerController>
			= test.angularFixture.controllerWithBindings<CardContainerController>(controllerName, cardContainer, locals);

		scope = <ICardContainerScope>controllerResult.scope;
		cardContainer = controllerResult.controller;
		cardContainer.selectionChangedEvent = sinon.spy();
		mockedDataSource.refresh.reset();
	}

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
