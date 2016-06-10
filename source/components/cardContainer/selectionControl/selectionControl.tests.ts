import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	SelectionControlController,
	controllerName,
	moduleName,
} from './selectionControl';

import * as angular from 'angular';
import 'angular-mocks';
import * as Rx from 'rxjs';

interface IItemMock {
	viewData: ISelectionViewData;
}

interface ISelectionViewData {
	selected: boolean;
}

interface ICardContainerMock {
	numberSelected: number;
	numberSelectedChanges: Rx.Subject<number>;
	dataSource: any;
	selectionChanged: Sinon.SinonSpy;
}

describe('selectionControl', () => {
	var scope: angular.IScope;
	var selection: SelectionControlController;
	var cardContainer: ICardContainerMock;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	describe('pagingEnabled', (): void => {
		it('should set pagingEnabled to true if a pager exists on the card container', (): void => {
			buildController(null, true);
			expect(cardContainer.dataSource.pager).to.exist;
			expect(selection.pagingEnabled).to.be.true;
		});

		it('should set pagingEnabled to false if a pager does not exist on the card container', (): void => {
			buildController(null, false);
			expect(cardContainer.dataSource.pager).to.not.exist;
			expect(selection.pagingEnabled).to.be.false;
		});
	});

	it('should update the selectedItems when the cardContainer numberSelected changes', (): void => {
		buildController();

		cardContainer.numberSelectedChanges.next(2);

		expect(selection.selectedItems).to.equal(2);

		cardContainer.numberSelectedChanges.next(4);

		expect(selection.selectedItems).to.equal(4);
	});

	describe('selection', (): void => {
		var items: IItemMock[];

		beforeEach(() => {
			items = [
				{
					viewData: {
						selected: false,
					},
				},
				{
					viewData: {
						selected: false,
					},
				},
				{
					viewData: {
						selected: false,
					},
				},
				{
					viewData: {
						selected: false,
					},
				},
			];

			buildController(items);
		});

		it('should select all items on the page', (): void => {
			selection.selectPage();

			expect(items[0].viewData.selected).to.be.true;
			expect(items[1].viewData.selected).to.be.true;
			expect(items[2].viewData.selected).to.be.false;
			expect(items[3].viewData.selected).to.be.false;
		});

		it('should select all items on all pages', (): void => {
			selection.selectAll();

			expect(items[0].viewData.selected).to.be.true;
			expect(items[1].viewData.selected).to.be.true;
			expect(items[2].viewData.selected).to.be.true;
			expect(items[3].viewData.selected).to.be.true;
		});

		it('should clear selection of all items on the page', (): void => {
			setAllSelected(items);

			selection.clearPage();

			expect(items[0].viewData.selected).to.be.false;
			expect(items[1].viewData.selected).to.be.false;
			expect(items[2].viewData.selected).to.be.true;
			expect(items[3].viewData.selected).to.be.true;
		});

		it('should clear selection of all items on all pages', (): void => {
			setAllSelected(items);

			selection.clearAll();

			expect(items[0].viewData.selected).to.be.false;
			expect(items[1].viewData.selected).to.be.false;
			expect(items[2].viewData.selected).to.be.false;
			expect(items[3].viewData.selected).to.be.false;
		});
	});

	function buildController(items?: IItemMock[], hasPager?: boolean): void {
		cardContainer = {
			numberSelected: 0,
			numberSelectedChanges: new Rx.Subject<number>(),
			dataSource: {
				dataSet: _.take(items, 2),
				filteredDataSet: items,
				pager: hasPager ? {} : null,
			},
			selectionChanged: sinon.spy(),
		};

		var bindings: any = {
			cardContainer: cardContainer,
		};

		var controllerResult: test.IControllerResult<SelectionControlController> =
			test.angularFixture.controllerWithBindings<SelectionControlController>(controllerName, bindings);

		scope = controllerResult.scope;
		selection = controllerResult.controller;
		selection.$onInit();
	}

	function setAllSelected(items: IItemMock[]): void {
		_.each(items, (item: IItemMock): void => { item.viewData.selected = true; });
	}
});
