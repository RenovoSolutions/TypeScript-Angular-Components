/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='multiStepIndicator.ts' />

module rl.ui.components.multiStepIndicator {
	import test = utilities.services.test;
	
	interface ITestObject {
		prop: string;
	}
	
	describe('MultiStepIndicatorController', () => {
		var scope: ng.IScope;
		var multiStepIndicator: MultiStepIndicatorController;
		var redirectSpy: Sinon.SinonSpy;
	
		beforeEach(() => {
			angular.mock.module(moduleName);

			redirectSpy = sinon.spy();
	
			test.angularFixture.mock({
				$state: { go: redirectSpy },
			});
		});
	
		it('should set inactive to true if no click handler or state name is provided', (): void => {
			var step: IStep = <any>{};
			buildController([step]);
			expect((<any>step).inactive).to.be.true;
		});
	
		it('should provide a default click handler that redirects to the specified state and sets the step to current if a state name is provided', (): void => {
			var step: IStep = <any>{ stateName: 'state' };
			buildController([step]);
	
			step.onClick();
	
			sinon.assert.calledOnce(redirectSpy);
			sinon.assert.calledWith(redirectSpy, 'state');
			expect(step.isCurrent).to.be.true;
		});
	
		function buildController(steps: IStep[]): void {
			var controllerResult: test.IControllerResult<MultiStepIndicatorController>
				= test.angularFixture.controllerWithBindings<MultiStepIndicatorController>(controllerName, { steps: steps });
	
			scope = <ng.IScope>controllerResult.scope;
			multiStepIndicator = controllerResult.controller;
		}
	});
}
