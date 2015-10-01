/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../typings/lodash/lodash.d.ts' />

'use strict';

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
} from './cardContainer.module';

import * as angular from 'angular';
import 'angular-mocks';

interface IDataSourceMock {
	refresh: Sinon.SinonSpy;
	pager?: IDataPagerMock;
	filters?: { [index: string]: IFilterMock};
	rawDataSet?: any[];
	dataSet?: any[];
	filteredDataSet?: any[];
	watch: Sinon.SinonSpy;
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
	var scope: ICardContainerScope;
	var cardContainer: CardContainerController;
	var mockedDataSource: IDataSourceMock;
	var $attrs: ICardContainerAttrs;

	beforeEach(() => {
		angular.mock.module(moduleName);

		$attrs = <any>{ disableSelection: null };

		test.angularFixture.mock({
			$attrs: $attrs,
		});

		cardContainer = <any>{};
	});

	describe('data source', (): void => {
		it('should put source on the controller', (): void => {
			buildController();
			expect(cardContainer.dataSource).to.equal(mockedDataSource);
		});
	});

	describe('paging', (): void => {
		it('should build a pager and give to the data source if paging is on', (): void => {
			cardContainer.paging = true;
			buildController();

			expect(cardContainer.pager).to.equal(cardContainer.dataSource.pager);
			expect(cardContainer.dataSource.pager.pageNumber).to.exist;
			expect(cardContainer.dataSource.pager.pageSize).to.exist;
			expect(_.isFunction(cardContainer.dataSource.pager.filter)).to.be.true;
		});

		it('should not have a pager if paging is off', (): void => {
			cardContainer.paging = false;
			buildController();

			expect(cardContainer.pager).to.not.exist;
			expect(cardContainer.dataSource.pager).to.not.exist;
		});

		it('should use the data sources pager if paging is not specified', (): void => {
			var pager: IDataPagerMock = {
				pageNumber: 1,
				pageSize: 10,
				filter: sinon.spy(),
			};

			var dataSource: IDataSourceMock = buildMockedDataSource();
			dataSource.pager = pager;

			cardContainer.source = <any>dataSource;
			buildController();

			expect(cardContainer.pager).to.equal(pager);
			expect(cardContainer.dataSource.pager).to.equal(pager);
		});
	});

	describe('card coordination', (): void => {
		var behavior: card.ICardBehavior; //*behavior will move to card

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

			var okayToOpen: boolean = false;

			okayToOpen = cardContainer.openCard();

			sinon.assert.calledOnce(<Sinon.SinonSpy>behavior.close);

			expect(okayToOpen).to.be.true;
		});
	});

	describe('column sizes', (): void => {
		it('should fill column size with all breakpoint values', (): void => {
			cardContainer.columns = <any>[
				{
					size: {},
				},
				{
					size: {
						xs: 1,
					},
				},
				{
					size: {
						lg: 1,
					},
				},
				{
					size: {
						xs: 1,
						md: 2,
					},
				},
				{
					size: {
						xs: 1,
						sm: 2,
						md: 3,
						lg: 4,
					},
				},
			];

			buildController();

			var size: IBreakpointSize = cardContainer.columns[0].size;
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
			cardContainer.columns = <any>[
				{
					size: 3,
				},
			];

			buildController();

			var size: IBreakpointSize = cardContainer.columns[0].size;
			expect(size.xs).to.equal(3);
			expect(size.sm).to.equal(3);
			expect(size.md).to.equal(3);
			expect(size.lg).to.equal(3);
		});
	});

	describe('sort', (): void => {
		it('should add new columns to the front and bump off sorts when greater tham max sorts', (): void => {
			var columns: IColumn[] = <any>[
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
			cardContainer.columns = columns;
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

			sinon.assert.calledThrice(mockedDataSource.refresh);
		});

		it('should change sort direction if specified column is already at the front of the sort', (): void => {
			var columns: IColumn[] = <any>[
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

			sinon.assert.callCount(mockedDataSource.refresh, 4);
		});

		it('should replace all sorts with columns secondary sorts if present', (): void => {
			var columnWithSecondarySorts: IColumn = <any>{
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
			var secondarySortColumn: IColumn = <any>{
				label: 'secondarySortCol',
				size: {},
			};
			var columns: IColumn[] = <any>[
				{
					label: 'colWithoutSecondary1',
					size: {},
				},
				{
					label: 'colWithoutSecondary2',
					size: {},
				},
				columnWithSecondarySorts,
				secondarySortColumn,
			];
			cardContainer.columns = columns;
			buildController();

			cardContainer.sort(columns[0]);
			cardContainer.sort(columns[1]);

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

			sinon.assert.callCount(mockedDataSource.refresh, 5);
		});

		it('should override the default max column size', (): void => {
			cardContainer.maxColumnSorts = 1;
			var columns: IColumn[] = <any>[
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

			cardContainer.sort(columns[0]);
			cardContainer.sort(columns[1]);

			expect(cardContainer.dataSource.sorts).to.have.length(1);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(columns[1]);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
		});
	});

	describe('selectable cards', (): void => {
		var dataSource: IDataSourceMock;
		beforeEach((): void => {
			dataSource = buildMockedDataSource();
			dataSource.rawDataSet = [
				{ id: 0 },
				{ id: 1 },
			];

			cardContainer.source = <any>dataSource;
			cardContainer.selectableCards = true;
		});

		it('should add view data to all data items', (): void => {
			dataSource.watch = sinon.spy();
			buildController();

			expect(dataSource.rawDataSet).to.have.length(2);
			expect(dataSource.rawDataSet[0].viewData).to.exist;
			expect(dataSource.rawDataSet[1].viewData).to.exist;

			sinon.assert.calledTwice(dataSource.watch);

			var firstCall: Sinon.SinonSpyCall = dataSource.watch.firstCall;
			expect(firstCall.args[1]).to.equal('changed');

			var secondCall: Sinon.SinonSpyCall = dataSource.watch.secondCall;
			expect(secondCall.args[1]).to.equal('redrawing');
		});

		it('should add view data to new items when changed is fire', (): void => {
			var changeEvent: Sinon.SinonSpy;
			dataSource.watch = sinon.spy((listener: Sinon.SinonSpy, event: string): void => {
				if (event === 'changed') {
					changeEvent = listener;
				}
			});

			buildController();

			dataSource.rawDataSet.push({ id: 3 });

			expect(dataSource.rawDataSet).to.have.length(3);
			expect(dataSource.rawDataSet[0].viewData).to.exist;
			expect(dataSource.rawDataSet[1].viewData).to.exist;
			expect(dataSource.rawDataSet[2].viewData).to.not.exist;

			changeEvent();

			expect(dataSource.rawDataSet[2].viewData).to.exist;
		});

		it('should update count of selected items when selection changes', (): void => {
			dataSource.rawDataSet = [
				{ id: 0 },
				{ id: 1 },
			];
			dataSource.dataSet = dataSource.rawDataSet;
			dataSource.filteredDataSet = dataSource.rawDataSet;
			dataSource.watch = sinon.spy();
			buildController();

			_.each(dataSource.dataSet, (item: any): void => {
				item.viewData.selected = true;
			});

			expect(cardContainer.numberSelected).to.equal(0);

			cardContainer.selectionChanged();

			expect(cardContainer.numberSelected).to.equal(2);

			_.each(dataSource.dataSet, (item: any): void => {
				item.viewData.selected = false;
			});

			expect(cardContainer.numberSelected).to.equal(2);

			scope.$emit('selectionChanged');

			expect(cardContainer.numberSelected).to.equal(0);
		});

		it('should fire selectionChanged when selectionChanged is called', (): void => {
			var selectionSpy: Sinon.SinonSpy = sinon.spy();
			dataSource.watch = sinon.spy();
			buildController();

			scope.$on('selectionChanged', selectionSpy);

			cardContainer.selectionChanged();

			sinon.assert.calledOnce(selectionSpy);
		});

		it('should clear selected items that are not in the filtered data set when collection is redrawn', (): void => {
			var redrawingEvent: Sinon.SinonSpy;
			dataSource.watch = sinon.spy((listener: Sinon.SinonSpy, event: string): void => {
				if (event === 'redrawing') {
					redrawingEvent = listener;
				}
			});
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

			redrawingEvent();

			expect(cardContainer.numberSelected).to.equal(4);

			dataSource.dataSet.pop();
			dataSource.dataSet.pop();
			dataSource.filteredDataSet = dataSource.dataSet;

			redrawingEvent();

			expect(cardContainer.numberSelected).to.equal(2);
		});

		it('should apply a sort in the select column', (): void => {
			dataSource.watch = sinon.spy();
			buildController();

			cardContainer.sortSelected();

			expect(cardContainer.dataSource.sorts).to.have.length(1);
			expect(cardContainer.dataSource.sorts[0].column).to.equal(cardContainer.selectionColumn);
			expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
		});

		it('should allow individual items to disable selection if a disable selection function is provided', (): void => {
			dataSource.watch = sinon.spy();
			$attrs.disableSelection = 'disableSelection';
			cardContainer.disableSelection = (): string => {
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
			dataSource.watch = sinon.spy();
			$attrs.disableSelection = 'disableSelection';
			cardContainer.disableSelection = (): string => {
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

	function buildController(): void {
		if (cardContainer.source == null) {
			mockedDataSource = buildMockedDataSource();
			cardContainer.source = <any>mockedDataSource;
		}

		var controllerResult: test.IControllerResult<CardContainerController>
			= test.angularFixture.controllerWithBindings<CardContainerController>(controllerName, cardContainer);

		scope = <ICardContainerScope>controllerResult.scope;
		cardContainer = controllerResult.controller;
	}

	function buildMockedDataSource(): IDataSourceMock {
		return <any>{
			refresh: sinon.spy(),
		};
	}
});
