/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	moduleName,
	controllerName,
	StringWithWatermarkController
} from './stringWithWatermark';

import * as angular from 'angular';
import 'angular-mocks';

describe('StringWithWatermarkController', () => {
	var scope: angular.IScope;
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
