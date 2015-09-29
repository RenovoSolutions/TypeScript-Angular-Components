/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	controllerName,
	IButtonToggleScope,
	IButtonToggleController,
} from './buttonToggle';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface INgModelMock {
	$viewValue: boolean;
	$modelValue: boolean;
	$setViewValue: Sinon.SinonSpy;
}

describe('ButtonToggleController', () => {
	var scope: IButtonToggleScope;
	var buttonToggle: IButtonToggleController;
	var ngModel: INgModelMock;

	beforeEach(() => {
		angular.mock.module(moduleName);

		ngModel = {
			$viewValue: null,
			$modelValue: null,
			$setViewValue: sinon.spy(),
		};
	});

	it('should update isActive with the model value', (): void => {
		buildController();
		scope.$digest();

		// convert initial null value to false
		expect(buttonToggle.isActive).to.be.false;

		ngModel.$modelValue = true;
		scope.$digest();

		expect(buttonToggle.isActive).to.be.true;

		ngModel.$modelValue = false;
		scope.$digest();

		expect(buttonToggle.isActive).to.be.false;
	});

	it('should call toggle on the scope if a toggle function is specified', (): void => {
		buildController();
		scope.$digest();

		var toggleSpy: Sinon.SinonSpy = sinon.spy();
		scope.onToggle = toggleSpy;

		ngModel.$modelValue = true;
		scope.$digest();

		sinon.assert.calledOnce(toggleSpy);
		expect(toggleSpy.firstCall.args[0].value).to.be.true;
	});

	describe('clicked', (): void => {
		it('should call set view value with the inverse of the view value', (): void => {
			buildController();

			buttonToggle.clicked();

			sinon.assert.calledOnce(ngModel.$setViewValue);
			sinon.assert.calledWith(ngModel.$setViewValue, true);

			scope.ngModel.$viewValue = true;

			buttonToggle.clicked();

			sinon.assert.calledTwice(ngModel.$setViewValue);
			sinon.assert.calledWith(ngModel.$setViewValue, false);
		});
	});

	function buildController(): void {
		var newScope: any = {
			ngModel: ngModel,
		};

		var controllerResult: test.IControllerResult<IButtonToggleController>
			= test.angularFixture.controllerWithBindings<IButtonToggleController>(controllerName, null, null, newScope);

		scope = <IButtonToggleScope>controllerResult.scope;
		buttonToggle = controllerResult.controller;
	}
});
