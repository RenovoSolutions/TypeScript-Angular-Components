/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	controllerName,
	CheckboxController,
} from './checkbox';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

describe('CheckboxController', () => {
	var checkbox: CheckboxController;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	it('should toggle the state if active', (): void => {
		buildController(true);

		expect(checkbox.checked).to.be.undefined;

		checkbox.toggle();

		expect(checkbox.checked).to.be.true;

		checkbox.toggle();

		expect(checkbox.checked).to.be.false;
	});

	it('should not toggle if not active', (): void => {
		buildController(false);

		checkbox.toggle();

		expect(checkbox.checked).to.be.undefined;
	});

	it('should default to active if unspecified', (): void => {
		buildController();
		expect(checkbox.active).to.be.true;
	});

	it('should not toggle if disabled', (): void => {
		buildController(true);
		checkbox.ngDisabled = true;

		checkbox.toggle();

		expect(checkbox.checked).to.be.undefined;
	});

	it('should fire an event when the checkbox toggles', (): void => {
		buildController(true);

		checkbox.toggle();

		sinon.assert.calledOnce(<Sinon.SinonSpy>checkbox.onToggle);
		let arg: any = (<Sinon.SinonSpy>checkbox.onToggle).firstCall.args[0];
		expect(arg.value).to.be.true;
	});

	function buildController(active?: boolean): void {
		var bindings: any = {
			active: active,
			onToggle: sinon.spy(),
		};

		var controllerResult: test.IControllerResult<CheckboxController>
			= test.angularFixture.controllerWithBindings<CheckboxController>(controllerName, bindings);

		checkbox = controllerResult.controller;
		checkbox.ngModel = <any>{
			$setViewValue: (value: boolean): void => {
				checkbox.ngModel.$viewValue = value;
			},
		};
		checkbox.$onInit();
	}
});
