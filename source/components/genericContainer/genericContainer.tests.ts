/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

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
	var controller: GenericContainerController;
	var scope: angular.IScope;
	var swapSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	function buildController(selector: any, templates: any): void {
		swapSpy = sinon.spy();
		var controllerResult: test.IControllerResult<GenericContainerController>
			= test.angularFixture.controllerWithBindings<GenericContainerController>(controllerName, {
			selector: selector,
			templates: templates,
			default: 'default',
			swapTemplates: swapSpy,
		});

		controller = controllerResult.controller;
		scope = controllerResult.scope;
	}

	it('should set the default template if no matching template is found', (): void => {
		var selector: string = 'type2';
		var templates: any = {
			'type1': 'template1',
		};

		buildController(selector, templates);

		controller.refresh();

		sinon.assert.calledOnce(swapSpy);
		var result: Sinon.SinonSpyCall = swapSpy.firstCall;

		var defaultTemplate: IGenericTemplate = controller.default;
		expect(result.args[0]).to.equal(defaultTemplate);
	});

	it('should set the designated template', (): void => {
		var selector: string = 'type1';
		var templates: any = {
			'type1': 'template1',
		};

		buildController(selector, templates);

		controller.refresh();

		sinon.assert.calledOnce(swapSpy);
		var result: Sinon.SinonSpyCall = swapSpy.firstCall;

		expect(result.args[0]).to.equal(templates.type1);
	});

	it('should swap the template when the selector changes', (): void => {
		var selector: string = 'type1';
		var templates: any = {
			'type1': 'template1',
			'type2': 'template2',
		};

		buildController(selector, templates);

		controller.refresh();

		scope.$digest();

		sinon.assert.calledOnce(swapSpy);
		var firstResult: Sinon.SinonSpyCall = swapSpy.firstCall;

		expect(firstResult.args[0]).to.equal(templates.type1);

		controller.selector = 'type2';

		scope.$digest();

		sinon.assert.calledTwice(swapSpy);
		var secondResult: Sinon.SinonSpyCall = swapSpy.secondCall;

		expect(secondResult.args[0]).to.equal(templates.type2);
	});
});
