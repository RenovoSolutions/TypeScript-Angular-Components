/// <reference path='../../typings/chai/chai.d.ts' />
/// <reference path='../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

// import dialogModule = require('./dialog.module');
// import __dialog = require('./dialog');
// import angularFixture = require('../../test/angularFixture');

describe('DialogController', () => {
	var scope: rl.components.dialog.IDialogScope;
	var dialog: rl.components.dialog.IDialogController;

	beforeEach(() => {
		angular.mock.module(rl.components.dialog.moduleName);

		dialog = buildController();
	});

	it('should broadcast a message when the dialog opens or closes and update controller.isOpen', (): void => {
		var openSpy: Sinon.SinonSpy = sinon.spy();
		var closeSpy: Sinon.SinonSpy = sinon.spy();
		scope.$on('renovo.dialog.open', openSpy);
		scope.$on('renovo.dialog.close', closeSpy);

		var modalSpy: Sinon.SinonSpy = sinon.spy();
		var jqueryMock: any = {
			modal: modalSpy,
		};
		scope.modal = jqueryMock;

		scope.isOpen = true;
		scope.$digest();

		expect(dialog.isOpen).to.be.true;

		sinon.assert.calledOnce(openSpy);
		sinon.assert.calledOnce(modalSpy);

		modalSpy.reset();

		scope.isOpen = false;
		scope.$digest();

		expect(dialog.isOpen).to.be.false;

		sinon.assert.calledOnce(closeSpy);
		sinon.assert.calledOnce(modalSpy);
		sinon.assert.calledWith(modalSpy, 'hide');
	});

	it('should set isOpen to true', (): void => {
		dialog.open();
		expect(scope.isOpen).to.be.true;
	});

	it('should set isOpen to false', (): void => {
		scope.isOpen = true;

		dialog.close();

		expect(scope.isOpen).to.be.false;
	});

	function buildController(): rl.components.dialog.IDialogController {
		var controllerResult: rl.utilities.test.IControllerResult<rl.components.dialog.IDialogController>
			= rl.utilities.test.angularFixture.controller<rl.components.dialog.IDialogController>(rl.components.dialog.controllerName);

		scope = <rl.components.dialog.IDialogScope>controllerResult.scope;
		return controllerResult.controller;
	}
});
