/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='genericContainer.ts' />

module rl.ui.components.genericContainer {
	import test = utilities.services.test;
	
	describe('GenericContainerController', () => {
		var controller: GenericContainerController;
		var scope: ng.IScope;
		var swapSpy: Sinon.SinonSpy;
	
		beforeEach(() => {
			angular.mock.module(moduleName);
		});
	
		function buildController(selector: any, templates: any): void {
			swapSpy = sinon.spy();
			var controllerResult: test.IControllerResult<GenericContainerController>
				= test.angularFixture.controller<GenericContainerController>(controllerName, {
				selector: selector,
				templates: templates,
				default: { template: 'default' },
				swapTemplates: swapSpy,
			}, null, true);
	
			controller = controllerResult.controller;
			scope = controllerResult.scope;
		}
	
		it('should set the default template if no matching template is found', (): void => {
			var selector: string = 'type2';
			var templates: any = {
				'type1': { template: 'template1' },
			};
	
			buildController(selector, templates);
	
			controller.refresh();
	
			sinon.assert.calledOnce(swapSpy);
			var result: Sinon.SinonSpyCall = swapSpy.firstCall;
	
			var defaultTemplate: IGenericTemplate = controller.default;
			expect(result.args[0]).to.equal(defaultTemplate.template);
		});
	
		it('should set the designated template', (): void => {
			var selector: string = 'type1';
			var templates: any = {
				'type1': { template: 'template1' },
			};
	
			buildController(selector, templates);
	
			controller.refresh();
	
			sinon.assert.calledOnce(swapSpy);
			var result: Sinon.SinonSpyCall = swapSpy.firstCall;
	
			expect(result.args[0]).to.equal(templates.type1.template);
		});
	
		it('should swap the template when the selector changes', (): void => {
			var selector: string = 'type1';
			var templates: any = {
				'type1': { template: 'template1' },
				'type2': { template: 'template2' },
			};
	
			buildController(selector, templates);
	
			controller.refresh();
	
			scope.$digest();
	
			sinon.assert.calledOnce(swapSpy);
			var firstResult: Sinon.SinonSpyCall = swapSpy.firstCall;
	
			expect(firstResult.args[0]).to.equal(templates.type1.template);
	
			controller.selector = 'type2';
	
			scope.$digest();
	
			sinon.assert.calledTwice(swapSpy);
			var secondResult: Sinon.SinonSpyCall = swapSpy.secondCall;
	
			expect(secondResult.args[0]).to.equal(templates.type2.template);
		});
	});
}
