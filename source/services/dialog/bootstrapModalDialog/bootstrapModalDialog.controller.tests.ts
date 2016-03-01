/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import { moduleName, controllerName } from './bootstrapModalDialog.module';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface IBaseDialogMock {
	modalClosing: Sinon.SinonSpy;
}

describe('BootsrapModalDialogController', () => {
	let scope: angular.IScope;
	let dialog: any;
	let $controller: Sinon.SinonSpy;
	let baseDialog: IBaseDialogMock;

	beforeEach(() => {
		angular.mock.module(moduleName);

		baseDialog = {
			modalClosing: sinon.spy(),
		};

		test.angularFixture.mock({
			baseDialog: baseDialog,
		});
	});

	it('should return the dialog controller as the controller instance', (): void => {
		let dialogController: any = { data: 1 };
		buildController(dialogController, 'test');

		sinon.assert.calledOnce($controller);
		let args: any = $controller.firstCall.args;
		expect(args[0]).to.equal('test');
		expect(args[1].$scope).to.equal(scope);

		expect(dialog).to.equal(dialogController);
	});

	it('should call modalClosing on the baseDialog service when the modal closes', (): void => {
		buildController();

		scope.$broadcast('modal.closing');

		sinon.assert.calledOnce(baseDialog.modalClosing);
	});

	function buildController(dialogController?: any, dialogControllerName?: string): void {
		let newScope: any = {
			modalController: dialogControllerName,
		};

		$controller = sinon.spy((): any => { return dialogController; });

		let controllerResult: test.IControllerResult<any>
			= test.angularFixture.controllerWithBindings<any>(controllerName, null, { $controller: $controller }, newScope);

		scope = controllerResult.scope;
		dialog = controllerResult.controller;
	}
});
