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
	var scope: angular.IScope;
	var typeahead: TypeaheadController;
	var $q: angular.IQService;
	var parentChild: __parentChild.IParentChildBehaviorService;
	var selectSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);

		selectSpy = sinon.spy();

		var services: any = test.angularFixture.inject('$q', __parentChild.serviceName);
		$q = services.$q;
		parentChild = services[__parentChild.serviceName];
	});

	it('should call select with the selection and hasSelection set to false', (): void => {
		buildController();
		scope.$digest();

		// watch on the scope and controller selection values, it will trigger twice
		sinon.assert.calledTwice(selectSpy);
		var firstArg: ISelectParams = selectSpy.firstCall.args[0];
		expect(firstArg.value).to.not.exist;
		expect(firstArg.hasSelection).to.be.false;
		selectSpy.reset();

		typeahead.selection = 'Item 4';
		scope.$digest();

		sinon.assert.calledOnce(selectSpy);
		firstArg = selectSpy.firstCall.args[0];
		expect(firstArg.value).to.equal(typeahead.selection);
		expect(firstArg.hasSelection).to.be.false;
	});

	it('should call select with the selection and hasSelection set to true when a selection is made', (): void => {
		buildController();
		scope.$digest();
		selectSpy.reset();

		typeahead.selection = { id: 4 };
		scope.$digest();

		sinon.assert.calledOnce(selectSpy);
		var firstArg: ISelectParams = selectSpy.firstCall.args[0];
		expect(firstArg.value).to.equal(typeahead.selection);
		expect(firstArg.hasSelection).to.be.true;
	});

	describe('transform', (): void => {
		it('should call transform on the scope if transform is provided', (): void => {
			var transform: Sinon.SinonSpy = sinon.spy((wrappedItem: any): any => { return wrappedItem.value.prop; });

			buildController(transform);

			var item: ITestObject = {
				prop: 1,
			};

			expect(typeahead.transform(item)).to.equal(1);

			sinon.assert.calledOnce(transform);
			var firstArg: IWrappedItem = transform.firstCall.args[0];
			expect(firstArg.value).to.equal(item);
		});

		it('should return the item directly if transform is not provided', (): void => {
			buildController();

			var item: ITestObject = { prop: 1 };

			expect(typeahead.transform(item)).to.equal(item);
		});

		it('should return the item directly if the object is null', (): void => {
			var transform: Sinon.SinonSpy = sinon.spy((wrappedItem: any): any => { return wrappedItem.value.prop; });

			buildController(transform);

			expect(typeahead.transform(null)).to.be.null;
		});
	});

	describe('getItems', (): void => {
		var items: string[];

		beforeEach((): void => {
			items = ['Item 1', 'Item 2', 'Another item', 'A fourth item'];
		});

		it('should return the result of the parent getItems function if useClientSearching is off', (): void => {
			buildController();

			// simulate a server-side search
			var getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when([items[0], items[1]]); });
			typeahead.getItemsInParent = getItemsSpy;

			var data: string[];

			typeahead.getItems('Item ').then((result: string[]): void => {
				data = result;
			});

			sinon.assert.calledOnce(getItemsSpy);
			var firstArg: IGetItemsParams = getItemsSpy.firstCall.args[0];
			expect(firstArg.search).to.equal('Item ');

			scope.$digest();

			expect(data.length).to.equal(2);
			expect(data[0]).to.equal(items[0]);
			expect(data[1]).to.equal(items[1]);
		});

		it('should apply the search string if useClientSearching is on', (): void => {
			buildController(null, true);

			var getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItemsInParent = getItemsSpy;

			var data: string[];

			typeahead.getItems('A').then((result: string[]): void => {
				data = result;
			});

			sinon.assert.calledOnce(getItemsSpy);
			expect(getItemsSpy.firstCall.args).to.be.empty;

			scope.$digest();

			expect(data.length).to.equal(2);
			expect(data[0]).to.equal(items[2]);
			expect(data[1]).to.equal(items[3]);
		});

		it('should cache the results of the parent getItems function and apply searches aganst the cached data if useClientSearching is on'
			, (): void => {
				buildController(null, true);

				var getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
				typeahead.getItemsInParent = getItemsSpy;
				typeahead.getItems('A');
				scope.$digest();

				getItemsSpy.reset();

				var data: string[];

				typeahead.getItems('2').then((result: string[]): void => {
					data = result;
				});

				scope.$digest();

				sinon.assert.notCalled(getItemsSpy);

				expect(data.length).to.equal(1);
				expect(data[0]).to.equal(items[1]);
			});
	});

	describe('behavior', (): void => {
		it('should register a child behavior for adding items to the cached item list', (): void => {
			buildController(null, true);

			var behavior: ITypeaheadBehavior = parentChild.getChildBehavior(typeahead.childLink);

			expect(behavior).to.exist;
			expect(_.isFunction(behavior.add)).to.be.true;
			expect(_.isFunction(behavior.remove)).to.be.true;
		});

		it('should add the specified item to the cached item list', (): void => {
			buildController(null, true);

			var items: string[] = [];
			var getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItemsInParent = getItemsSpy;
			typeahead.getItems('');
			scope.$digest();

			var newItem: string = 'New item';

			parentChild.triggerChildBehavior(typeahead.childLink, (behavior: ITypeaheadBehavior): void => {
				behavior.add(newItem);
			});

			expect(items.length).to.equal(1);
			expect(items[0]).to.equal(newItem);
		});

		it('should remove the specified item from the cached items list', (): void => {
			buildController(null, true);

			var items: string[] = ['Item 1'];
			var getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItemsInParent = getItemsSpy;
			typeahead.getItems('');
			scope.$digest();

			parentChild.triggerChildBehavior(typeahead.childLink, (behavior: ITypeaheadBehavior): void => {
				behavior.remove(items[0]);
			});

			expect(items).to.be.empty;
		});
	});

	describe('apply', (): void => {
		it('should clear the selection and remove it from the list after applying', (): void => {
			var applySpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<void> => { return $q.when(); });
			buildController(null, true, applySpy);

			var items: string[] = ['Item 1'];
			var getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItemsInParent = getItemsSpy;
			typeahead.getItems('');
			scope.$digest();

			typeahead.selection = items[0];
			typeahead.hasSelection = true;
			typeahead.applyItem();

			expect(items).to.have.length(1);

			scope.$digest();

			expect(typeahead.selection).to.be.null;
			expect(items).to.be.empty;
		});

		it('should clear the selection and remove it from the list immediately if apply doesnt return a promise', (): void => {
			var applySpy: Sinon.SinonSpy = sinon.spy((): void => { return null; });
			buildController(null, true, applySpy);

			var items: string[] = ['Item 1'];
			var getItemsSpy: Sinon.SinonSpy = sinon.spy((): angular.IPromise<string[]> => { return $q.when(items); });
			typeahead.getItemsInParent = getItemsSpy;
			typeahead.getItems('');
			scope.$digest();

			typeahead.selection = items[0];
			typeahead.hasSelection = true;
			typeahead.applyItem();

			expect(typeahead.selection).to.be.null;
			expect(items).to.be.empty;
		});
	});

	function buildController(transform?: Sinon.SinonSpy, useClientSearching?: boolean, apply?: Sinon.SinonSpy): void {
		var bindings: any = {
			select: selectSpy,
			useClientSearching: useClientSearching,
			childLink: {},
			transformInParent: transform,
			apply: apply,
		};

		var $attrs: any = {};

		if (transform == null) {
			$attrs.transform = null;
		} else {
			$attrs.transform = 'transform';
		}

		if (apply == null) {
			$attrs.apply = null;
		} else {
			$attrs.apply = 'apply';
		}

		var controllerResult: test.IControllerResult<TypeaheadController> =
			test.angularFixture.controllerWithBindings<TypeaheadController>(controllerName, bindings, { $attrs: $attrs });

		scope = controllerResult.scope;
		typeahead = controllerResult.controller;
	}
});
