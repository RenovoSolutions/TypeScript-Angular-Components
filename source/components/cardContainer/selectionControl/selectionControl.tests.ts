/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/angularMocks.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../typings/lodash/lodash.d.ts' />
/// <reference path='../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='selectionControl.ts' />

module rl.ui.components.cardContainer.selectionControl {
	import test = utilities.services.test;
	
	interface IItemMock {
		viewData: ISelectionViewData;
	}
	
	interface ISelectionViewData {
		selected: boolean;
	}
	
	interface ICardContainerMock {
		numberSelected: number;
		dataSource: any;
		pager: any;
	}

	describe('selectionControl', () => {
		var scope: ng.IScope;
		var selection: SelectionControlController;
		var cardContainerController: ICardContainerMock;
	
		beforeEach(() => {
			angular.mock.module(moduleName);
		});
	
		describe('pagingEnabled', (): void => {
			it('should set pagingEnabled to true if a pager exists on the card container', (): void => {
				buildController(null, true);
				expect(cardContainerController.pager).to.exist;
				expect(selection.pagingEnabled).to.be.true;
			});
	
			it('should set pagingEnabled to false if a pager does not exist on the card container', (): void => {
				buildController(null, false);
				expect(cardContainerController.pager).to.not.exist;
				expect(selection.pagingEnabled).to.be.false;
			});
		});
	
		it('should update the selectedItems when the cardContainer numberSelected changes', (): void => {
			buildController();
	
			cardContainerController.numberSelected = 2;
			scope.$digest();
	
			expect(selection.selectedItems).to.equal(2);
	
			cardContainerController.numberSelected = 4;
			scope.$digest();
	
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
			cardContainerController = {
				numberSelected: 0,
				dataSource: {
					dataSet: _.take(items, 2),
					filteredDataSet: items,
				},
				pager: hasPager ? {} : null,
			};
	
			var $element: any = {
				controller(): any {
					return cardContainerController;
				},
			};
	
			var controllerResult: test.IControllerResult<SelectionControlController> =
				test.angularFixture.controller<SelectionControlController>(controllerName, {}, { $element: $element });
	
			scope = controllerResult.scope;
			selection = controllerResult.controller;
		}
	
		function setAllSelected(items: IItemMock[]): void {
			_.each(items, (item: IItemMock): void => { item.viewData.selected = true; });
		}
	});
}
