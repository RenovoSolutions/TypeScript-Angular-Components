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
	let parentChild: __parentChild.IParentChildBehaviorService;
	let selectSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);

		selectSpy = sinon.spy();

		let services: any = test.angularFixture.inject('$q', __parentChild.serviceName);
		$q = services.$q;
		parentChild = services[__parentChild.serviceName];
	});

	describe('transform', (): void => {
		it('should call transform on the scope if transform is provided', (): void => {
			let transform: Sinon.SinonSpy = sinon.spy((item: any): any => { return item.prop; });

			buildController(transform);

			let item: ITestObject = {
				prop: 1,
			};

			expect(typeahead.getDisplayName(item)).to.equal(1);
			sinon.assert.calledOnce(transform);
		});

		it('should return the item directly if transform is not provided', (): void => {
			buildController();

			let item: ITestObject = { prop: 1 };

			expect(typeahead.getDisplayName(item)).to.equal(item);
		});

		it('should return the item directly if the object is null', (): void => {
			let transform: Sinon.SinonSpy = sinon.spy((wrappedItem: any): any => { return wrappedItem.value.prop; });

			buildController(transform);

			expect(typeahead.getDisplayName(null)).to.be.null;
		});

		it('should use transform as a property selector if a string value is provided', (): void => {
			let transform: string = 'prop';

			buildController(transform);

			expect(typeahead.getDisplayName(item)).to.equal(item.prop);
		});
	});

	function buildController(transform?: Sinon.SinonSpy | string, useClientSearching?: boolean, create?: Sinon.SinonSpy): void {
		let bindings: any = {
			select: selectSpy,
			useClientSearching: useClientSearching,
			childLink: {},
			transform: transform,
			create: create,
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
