/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='lazyLoad.ts' />

module rl.ui.components.lazyLoad {
	import test = utilities.services.test;
	
	interface ITestObject {
		prop: string;
	}
	
	describe('LazyLoadController', () => {
		var scope: ng.IScope;
		var lazyLoad: LazyLoadController;
	
		beforeEach(() => {
			angular.mock.module(moduleName);
		});
	
		it('should set init true when the expression first evaluates to true', (): void => {
			buildController(false);
			scope.$digest();
	
			expect(lazyLoad.init).to.be.false;
	
			lazyLoad.show = true;
			scope.$digest();
	
			expect(lazyLoad.init).to.be.true;
	
			lazyLoad.show = false;
			scope.$digest();
	
			expect(lazyLoad.init).to.be.true;
		});
	
		function buildController(expression: boolean): void {
			var controllerResult: test.IControllerResult<LazyLoadController>
				= test.angularFixture.controller<LazyLoadController>(controllerName, { show: expression }, null, true);
	
			scope = <ng.IScope>controllerResult.scope;
			lazyLoad = controllerResult.controller;
		}
	});
}
