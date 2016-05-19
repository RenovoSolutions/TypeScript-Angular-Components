import { AliasController, moduleName, controllerName } from './alias';

import { services } from 'typescript-angular-utilities';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

describe('AliasController', () => {
	let scope: any;
	let alias: AliasController;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	it('should alias the specified object as the second string', (): void => {
		scope = {
			item: 4,
		};

		buildController('item as val');
		scope.$digest();

		expect(scope.val).to.equal(4);

		scope.item = 6;
		scope.$digest();

		expect(scope.val).to.equal(6);
	});

	it('should allow the alias to be interpolated', (): void => {
		scope = {
			item: 4,
			name: 'val',
		};

		buildController('item as {{name}}');
		scope.$digest();

		expect(scope.val).to.equal(4);
	});

	function buildController(expression?: string): void {
		let $attrs: any = {
			rlAlias: expression,
		};

		let controllerResult: test.IControllerResult<AliasController>
			= test.angularFixture.controllerWithBindings<AliasController>(controllerName, null, { $attrs }, scope);

		scope = controllerResult.scope;
		alias = controllerResult.controller;
	}
});
