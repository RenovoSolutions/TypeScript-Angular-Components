import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	controllerName,
	LazyLoadController,
} from './lazyLoad';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface ITestObject {
	prop: string;
}

describe('LazyLoadController', () => {
	var scope: angular.IScope;
	var lazyLoad: LazyLoadController;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	it('should set init true when the expression first evaluates to true', (): void => {
		buildController(false);
		scope.$digest();

		expect(lazyLoad.init).to.be.false;

		lazyLoad.$onChanges({
			show: <any>{ currentValue: true },
		});

		expect(lazyLoad.init).to.be.true;

		lazyLoad.$onChanges({
			show: <any>{ currentValue: false },
		});

		expect(lazyLoad.init).to.be.true;
	});

	function buildController(expression: boolean): void {
		var controllerResult: test.IControllerResult<LazyLoadController>
			= test.angularFixture.controllerWithBindings<LazyLoadController>(controllerName, { show: expression });

		scope = <angular.IScope>controllerResult.scope;
		lazyLoad = controllerResult.controller;
	}
});
