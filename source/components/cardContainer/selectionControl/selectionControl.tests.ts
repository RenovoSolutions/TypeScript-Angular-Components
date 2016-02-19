/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../typings/lodash/lodash.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	SelectionControlController,
	controllerName,
	moduleName,
} from './selectionControl';

import * as angular from 'angular';
import 'angular-mocks';

interface IItemMock {
	viewData: ISelectionViewData;
}

interface ISelectionViewData {
	selected: boolean;
}

interface IContainerBuilderMock {
	_numberSelected: number;
	_dataSource: any;
	_pager: any;
}

describe('selectionControl', () => {
	var scope: angular.IScope;
	var selection: SelectionControlController;
	var builder: IContainerBuilderMock;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	describe('pagingEnabled', (): void => {
		it('should set pagingEnabled to true if a pager exists on the card container', (): void => {
			buildController(null, true);
			expect(builder._pager).to.exist;
			expect(selection.pagingEnabled).to.be.true;
		});

		it('should set pagingEnabled to false if a pager does not exist on the card container', (): void => {
			buildController(null, false);
			expect(builder._pager).to.not.exist;
			expect(selection.pagingEnabled).to.be.false;
		});
	});

	it('should update the selectedItems when the cardContainer numberSelected changes', (): void => {
		buildController();

		builder._numberSelected = 2;
		scope.$digest();

		expect(selection.selectedItems).to.equal(2);

		builder._numberSelected = 4;
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
		builder = {
			_numberSelected: 0,
			_dataSource: {
				dataSet: _.take(items, 2),
				filteredDataSet: items,
			},
			_pager: hasPager ? {} : null,
		};

		var bindings: any = {
			builder: builder,
		};

		var controllerResult: test.IControllerResult<SelectionControlController> =
			test.angularFixture.controllerWithBindings<SelectionControlController>(controllerName, bindings);

		scope = controllerResult.scope;
		selection = controllerResult.controller;
	}

	function setAllSelected(items: IItemMock[]): void {
		_.each(items, (item: IItemMock): void => { item.viewData.selected = true; });
	}
});
