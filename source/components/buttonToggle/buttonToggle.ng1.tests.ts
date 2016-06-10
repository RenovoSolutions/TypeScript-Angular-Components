import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	controllerName,
	ButtonToggleController,
} from './buttonToggle.ng1';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface INgModelMock {
	$viewValue: boolean;
	$modelValue: boolean;
	$setViewValue: Sinon.SinonSpy;
}

describe('ButtonToggleController', () => {
	let buttonToggle: ButtonToggleController;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	it('should update isActive with the model value', (): void => {
		buildController();

		// convert initial null value to false
		expect(buttonToggle.checked).to.be.undefined;

		buttonToggle.clicked();

		expect(buttonToggle.checked).to.be.true;

		buttonToggle.clicked();

		expect(buttonToggle.checked).to.be.false;
	});

	it('should call toggle on the scope if a toggle function is specified', (): void => {
		buildController();

		let toggleSpy: Sinon.SinonSpy = sinon.spy();
		buttonToggle.onToggle = toggleSpy;

		buttonToggle.clicked();

		sinon.assert.calledOnce(toggleSpy);
		expect(toggleSpy.firstCall.args[0].value).to.be.true;
	});

	function buildController(): void {
		let bindings: any = {
			onToggle: sinon.spy(),
		};

		let controllerResult: test.IControllerResult<ButtonToggleController>
			= test.angularFixture.controllerWithBindings<ButtonToggleController>(controllerName, bindings);

		buttonToggle = controllerResult.controller;
		buttonToggle.ngModel = <any>{
			$setViewValue: (value: boolean): void => {
				buttonToggle.ngModel.$viewValue = value;
			},
		};
	}
});
