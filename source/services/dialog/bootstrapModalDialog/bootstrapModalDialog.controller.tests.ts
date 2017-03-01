import { services } from 'typescript-angular-utilities';
import test = services.test;

import { moduleName, controllerName, serviceName } from './bootstrapModalDialog.module';

import * as angular from 'angular';
import 'angular-mocks';

interface IBootstrapModalDialogMock {
	modalClosing: sinon.SinonSpy;
}

describe('BootsrapModalDialogController', () => {
	let scope: angular.IScope;
	let dialog: any;
	let $controller: sinon.SinonSpy;
	let bootstrapModalDialog: IBootstrapModalDialogMock;

	beforeEach(() => {
		angular.mock.module(moduleName);

		bootstrapModalDialog = {
			modalClosing: sinon.spy(),
		};

		let mocks: any = {};
		mocks[serviceName] = bootstrapModalDialog;
		test.angularFixture.mock(mocks);
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

		sinon.assert.calledOnce(bootstrapModalDialog.modalClosing);
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
