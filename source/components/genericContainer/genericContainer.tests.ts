import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	GenericContainerController,
	moduleName,
	controllerName,
} from './genericContainer';

import * as angular from 'angular';
import 'angular-mocks';

describe('GenericContainerController', () => {
	let controller: GenericContainerController;
	let scope: angular.IScope;
	let swapSpy: sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	function buildController(selector: any, templates: any): void {
		swapSpy = sinon.spy();
		let controllerResult: test.IControllerResult<GenericContainerController>
			= test.angularFixture.controllerWithBindings<GenericContainerController>(controllerName, {
			selector: selector,
			templates: templates,
			default: 'default',
			swapTemplates: swapSpy,
		}, {
			$element: {},
			$transclude: {},
		});

		controller = controllerResult.controller;
		scope = controllerResult.scope;
		controller.container = <any>{};
	}

	it('should set the default template if no matching template is found', (): void => {
		let selector: string = 'type2';
		let templates: any = {
			'type1': 'template1',
		};

		buildController(selector, templates);

		controller.refresh();

		sinon.assert.calledOnce(swapSpy);
		let result: sinon.SinonSpyCall = swapSpy.firstCall;

		let defaultTemplate: string = controller.default;
		expect(result.args[0]).to.equal(defaultTemplate);
	});

	it('should set the designated template', (): void => {
		let selector: string = 'type1';
		let templates: any = {
			'type1': 'template1',
		};

		buildController(selector, templates);

		controller.refresh();

		sinon.assert.calledOnce(swapSpy);
		let result: sinon.SinonSpyCall = swapSpy.firstCall;

		expect(result.args[0]).to.equal(templates.type1);
	});

	it('should swap the template when the selector changes', (): void => {
		let selector: string = 'type1';
		let templates: any = {
			'type1': 'template1',
			'type2': 'template2',
		};

		buildController(selector, templates);

		controller.refresh();

		sinon.assert.calledOnce(swapSpy);
		let firstResult: sinon.SinonSpyCall = swapSpy.firstCall;

		expect(firstResult.args[0]).to.equal(templates.type1);

		controller.$onChanges({
			selector: <any>{ currentValue: 'type2' },
		});

		sinon.assert.calledTwice(swapSpy);
		let secondResult: sinon.SinonSpyCall = swapSpy.secondCall;

		expect(secondResult.args[0]).to.equal(templates.type2);
	});
});
