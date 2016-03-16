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
	TypeaheadListController,
} from './typeaheadList';

import * as angular from 'angular';
import 'angular-mocks';

import * as _ from 'lodash';

interface ITestObject {
	id: number;
	prop?: number;
}

describe('TypeaheadListController', () => {
	let scope: angular.IScope;
	let typeaheadList: TypeaheadListController;
	let $q: angular.IQService;
	let parentChild: __parentChild.IParentChildBehaviorService;
	let items: ITestObject[];

	beforeEach(() => {
		angular.mock.module(moduleName);

		items = [
			{ id: 1, prop: 2 },
			{ id: 2, prop: 5 },
			{ id: 3, prop: 3 },
			{ id: 4, prop: 7 },
			{ id: 5, prop: 4 },
		];

		let services: any = test.angularFixture.inject('$q', __parentChild.serviceName);
		$q = services.$q;
		parentChild = services[__parentChild.serviceName];
	});

	describe('loadItems', (): void => {
		it('should filter out items that are already selected', (done: MochaDone): void => {
			let selections: ITestObject[] = [items[0], items[2]];
			buildController(selections);

			typeaheadList.loadItems().then((data: ITestObject[]): void => {
				expect(data).to.have.length(3);
				expect(data[0]).to.equal(2);
				expect(data[1]).to.equal(4);
				expect(data[2]).to.equal(5);
				done();
			});
			scope.$digest();
		});
	});

	describe('add', (): void => {
		it('should remove the item from the typeahead and add it to the list', (): void => {
			let list: ITestObject[] = [];
			buildController(list);
			let removeSpy: Sinon.SinonSpy = sinon.spy();
			parentChild.registerChildBehavior(typeaheadList.typeaheadLink, <any>{
				remove: removeSpy,
			});

			typeaheadList.add(items[0]);

			expect(list).to.have.length(1);
			expect(list[0].id).to.equal(1);
			sinon.assert.calledOnce(removeSpy);
			expect(removeSpy.firstCall.args[0].id).to.equal(1);
		});
	});

	describe('remove', (): void => {
		it('should add the item back to the typeahead and remove it from the list', (): void => {
			let list: ITestObject[] = [items[0]];
			buildController(list);
			let addSpy: Sinon.SinonSpy = sinon.spy();
			parentChild.registerChildBehavior(typeaheadList.typeaheadLink, <any>{
				add: addSpy,
			});

			typeaheadList.remove(list[0]);

			expect(list).to.be.empty;
			sinon.assert.calledOnce(addSpy);
			expect(addSpy.firstCall.args[0].id).to.equal(1);
		});
	});

	function buildController(list?: ITestObject[]): void {
		let ngModel: any = {
			$viewValue: list,
			$setViewValue: (value: any): void => { ngModel.$viewValue = value; },
		};

		let bindings: any = {
			childLink: {},
			ngModel: ngModel,
		};

		let controllerResult: test.IControllerResult<TypeaheadListController> =
			test.angularFixture.controllerWithBindings<TypeaheadListController>(controllerName, bindings);

		scope = controllerResult.scope;
		typeaheadList = controllerResult.controller;
		typeaheadList.getItems = sinon.spy((): angular.IPromise<ITestObject[]> => {
			return $q.when(items);
		});
		typeaheadList.$onInit();
	}
});
