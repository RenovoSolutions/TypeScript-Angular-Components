/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='stringWithWatermark.ts' />

module rl.ui.components.stringWithWatermark {
	import test = rl.utilities.services.test;

	describe('StringWithWatermarkController', () => {
		var scope: ng.IScope;
		var controller: StringWithWatermarkController;

		beforeEach(() => {
			angular.mock.module(moduleName);
		});

		it('should update hasString to reflect whether string is null or empty', (): void => {
			buildController();
			scope.$digest();

			expect(controller.hasString).to.be.false;

			controller.string = 'a string';
			scope.$digest();

			expect(controller.hasString).to.be.true;

			controller.string = '';
			scope.$digest();

			expect(controller.hasString).to.be.false;

			// whitespace clears the watermark
			controller.string = ' ';
			scope.$digest();

			expect(controller.hasString).to.be.true;
		});

		function buildController(): void {
			var controllerResult: test.IControllerResult<StringWithWatermarkController>
				= test.angularFixture.controllerWithBindings<StringWithWatermarkController>(controllerName);

			scope = controllerResult.scope;
			controller = controllerResult.controller;
		}
	});
}
