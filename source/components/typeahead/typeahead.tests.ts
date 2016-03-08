/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;
import __parentChild = services.parentChildBehavior;

import {
	moduleName,
	controllerName,
	TypeaheadController,
	ISelectParams,
	IGetItemsParams,
	ITypeaheadBehavior,
} from './typeahead';

import * as angular from 'angular';
import 'angular-mocks';

import * as _ from 'lodash';

interface IWrappedItem {
	value: ITestObject;
}

interface ITestObject {
	prop: number;
}

describe('TypeaheadController', () => {
	let scope: angular.IScope;
	let typeahead: TypeaheadController;
	let $q: angular.IQService;
	let $timeout: angular.ITimeoutService;
	let parentChild: __parentChild.IParentChildBehaviorService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		let services: any = test.angularFixture.inject('$q', '$timeout', __parentChild.serviceName);
		$q = services.$q;
		$timeout = services.$timeout;
		parentChild = services[__parentChild.serviceName];
	});

    it('should collapse on init if allowCollapse is specified and a model value is present', (): void => {
		let allowCollapse: boolean = true;
		buildControllerWithoutInit(null, true, null, null, allowCollapse);

		typeahead.ngModel.$viewValue = 'Item';
		typeahead.$onInit();
		$timeout.flush();

		expect(typeahead.collapsed).to.be.true;
    });

	describe('loadItems', (): void => {
		let items: string[];

		beforeEach((): void => {
			items = ['Item 1', 'Item 2', 'Another item', 'A fourth item'];
		});

		it('should return an empty list if no text is entered', (): void => {
			buildController();

			let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItems = getItemsSpy;

			typeahead.refresh('');

			sinon.assert.notCalled(getItemsSpy);
			expect(typeahead.visibleItems).to.be.empty;
		});

		it('should return the result of the getItems function if useClientSearching is off', (): void => {
			buildController();

			// simulate a server-side search
			let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when([items[0], items[1]]); });
			typeahead.getItems = getItemsSpy;

			typeahead.refresh('Item ');

			sinon.assert.calledOnce(getItemsSpy);
			let firstArg: IGetItemsParams = getItemsSpy.firstCall.args[0];
			expect(firstArg.search).to.equal('Item ');

			scope.$digest();

			expect(typeahead.visibleItems.length).to.equal(2);
			expect(typeahead.visibleItems[0]).to.equal(items[0]);
			expect(typeahead.visibleItems[1]).to.equal(items[1]);
		});

		it('should apply the search string if useClientSearching is on', (): void => {
			buildController(null, true);

			let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItems = getItemsSpy;

			typeahead.refresh('A');

			sinon.assert.calledOnce(getItemsSpy);
			expect(getItemsSpy.firstCall.args).to.be.empty;

			scope.$digest();

			expect(typeahead.visibleItems.length).to.equal(2);
			expect(typeahead.visibleItems[0]).to.equal(items[2]);
			expect(typeahead.visibleItems[1]).to.equal(items[3]);
		});

		it('should cache the results of the parent getItems function and apply searches aganst the cached data if useClientSearching is on'
			, (): void => {
				buildController(null, true);

				let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
				typeahead.getItems = getItemsSpy;
				typeahead.refresh('A');
				scope.$digest();

				getItemsSpy.reset();

				typeahead.refresh('2');

				scope.$digest();

				sinon.assert.notCalled(getItemsSpy);

				expect(typeahead.visibleItems.length).to.equal(1);
				expect(typeahead.visibleItems[0]).to.equal(items[1]);
			});

		it('should add a special search option to the list if a create handler is provided and no match is found', (): void => {
			let createSpy: Sinon.SinonSpy = sinon.spy();
			buildController(null, true, createSpy);

			let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItems = getItemsSpy;

			typeahead.refresh('A');

			scope.$digest();

			expect(typeahead.visibleItems.length).to.equal(3);
			expect(typeahead.visibleItems[0].__isSearchOption).to.be.true;
			expect(typeahead.visibleItems[1]).to.equal(items[2]);
			expect(typeahead.visibleItems[2]).to.equal(items[3]);
		});
	});

	describe('behavior', (): void => {
		it('should register a child behavior for adding items to the cached item list', (): void => {
			buildController(null, true);

			let behavior: ITypeaheadBehavior = parentChild.getChildBehavior(typeahead.childLink);

			expect(behavior).to.exist;
			expect(_.isFunction(behavior.add)).to.be.true;
			expect(_.isFunction(behavior.remove)).to.be.true;
		});

		it('should add the specified item to the cached item list', (): void => {
			buildController(null, true);

			let items: string[] = [];
			let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItems = getItemsSpy;
			typeahead.refresh('A');
			scope.$digest();

			let newItem: string = 'New item';

			parentChild.triggerChildBehavior(typeahead.childLink, (behavior: ITypeaheadBehavior): void => {
				behavior.add(newItem);
			});

			expect(items.length).to.equal(1);
			expect(items[0]).to.equal(newItem);
		});

		it('should remove the specified item from the cached items list', (): void => {
			buildController(null, true);

			let items: string[] = ['Item 1'];
			let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItems = getItemsSpy;
			typeahead.refresh('I');
			scope.$digest();

			parentChild.triggerChildBehavior(typeahead.childLink, (behavior: ITypeaheadBehavior): void => {
				behavior.remove(items[0]);
			});

			expect(items).to.be.empty;
		});
	});

	describe('select', (): void => {
		let items: string[];

		beforeEach((): void => {
			items = ['Item 1', 'Item 2', 'Another item', 'A fourth item'];
		});

		it('should collapse if no select handler is specified', (): void => {
			buildController(null, true);
			initialLoad();

			typeahead.selection = items[0];

			expect(typeahead.selection).to.equal(items[0]);
			expect(typeahead.collapsed).to.be.true;
		});

		it('should collapse if a select handler is provided and allowCollapse is turned on', (): void => {
			let allowCollapse: boolean = true;
			let selectSpy: Sinon.SinonSpy = sinon.spy();
			buildController(null, true, null, selectSpy, allowCollapse);
			initialLoad();

			typeahead.selection = items[0];

			expect(typeahead.selection).to.equal(items[0]);
			expect(typeahead.collapsed).to.be.true;

			sinon.assert.calledOnce(selectSpy);
			expect(selectSpy.firstCall.args[0].value).to.equal(items[0]);
		});

		it('should call the select function without collapsing', (): void => {
			let selectSpy: Sinon.SinonSpy = sinon.spy();
			buildController(null, true, null, selectSpy);
			initialLoad();

			typeahead.selection = items[0];

			expect(typeahead.selection).to.not.exist;
			expect(typeahead.collapsed).to.be.false;

			sinon.assert.calledOnce(selectSpy);
			expect(selectSpy.firstCall.args[0].value).to.equal(items[0]);
		});

		it('should call create with the search text if the search option is selected', (): void => {
			let createSpy: Sinon.SinonSpy = sinon.spy((wrappedSearch: any): any => { return wrappedSearch; });
			buildController(null, true, createSpy);
			initialLoad();

			typeahead._searchOption.text = 'search';
			typeahead.selection = typeahead._searchOption;

			sinon.assert.calledOnce(createSpy);
			expect(createSpy.firstCall.args[0].value).to.equal('search');

			expect(typeahead.selection.value).to.equal('search');
			expect(typeahead.collapsed).to.be.true;
		});

		function initialLoad() {
			let getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItems = getItemsSpy;

			typeahead.refresh('A');
			scope.$digest();
		}
	});

	function buildController(transform?: Sinon.SinonSpy | string
						, useClientSearching?: boolean
						, create?: Sinon.SinonSpy
						, select?: Sinon.SinonSpy
						, allowCollapse?: boolean): void {
		buildControllerWithoutInit(transform, useClientSearching, create, select, allowCollapse);
		typeahead.$onInit();
	}

	function buildControllerWithoutInit(transform?: Sinon.SinonSpy | string
						, useClientSearching?: boolean
						, create?: Sinon.SinonSpy
						, select?: Sinon.SinonSpy
						, allowCollapse?: boolean): void {
		let ngModel: any = {
			$viewValue: null,
			$setViewValue: (value: any): void => { ngModel.$viewValue = value; },
		};

		let bindings: any = {
			select: select || sinon.spy(),
			useClientSearching: useClientSearching,
			childLink: {},
			transform: transform,
			create: create,
			allowCollapse: allowCollapse,
			ngModel: ngModel,
		};

		let $attrs: any = {};

		$attrs.select = select != null ? 'select' : null;
		$attrs.create = create != null ? 'create' : null;

		let controllerResult: test.IControllerResult<TypeaheadController> =
			test.angularFixture.controllerWithBindings<TypeaheadController>(controllerName, bindings, { $attrs: $attrs });

		scope = controllerResult.scope;
		typeahead = controllerResult.controller;
	}
});
