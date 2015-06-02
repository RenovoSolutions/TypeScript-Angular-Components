/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

import __autosaveDialogModule = require('./autosaveDialog.module');
import __autosaveDialog = require('./autosaveDialog');
import __parentChildBehavior = require('../../services/parentChildBehavior/parentChildBehavior.service');
import __autosaveComponent = require('../autosaveComponent/autosaveComponent');
import __angularFixture = require('../../test/angularFixture');

interface IAutosaveServiceMock {
	trigger(promise: ng.IPromise<void>): ng.IPromise<void>;
}

describe('AutosaveDialogController', () => {
	var scope: __autosaveDialog.IAutosaveDialogScope;
	var dialog: __autosaveDialog.IAutosaveDialogController;
	var saveSpy: Sinon.SinonSpy;
	var parentChildBehavior: __parentChildBehavior.IParentChildBehaviorService;

	beforeEach(() => {
		angular.mock.module(__autosaveDialogModule.name);

		saveSpy = sinon.spy();

		var services: any = __angularFixture.angularFixture.inject(__parentChildBehavior.name);
		parentChildBehavior = services[__parentChildBehavior.name];

	});

	it('should update isOpen on the controller when the scope variable changes', (): void => {
		buildController();
		scope.$digest();

		expect(dialog.isOpen).to.be.true;

		scope.isOpen = false;
		scope.$digest();

		expect(dialog.isOpen).to.be.false;

		dialog.isOpen = true;
		scope.$digest();

		expect(scope.isOpen).to.be.true;
	});

	describe('triggerClose', (): void => {
		it('should set saveOnClose and explicit to true and trigger a close on saveAndClose', (): void => {
			buildController();

			dialog.saveOnClose = false;

			dialog.saveAndClose();

			expect(dialog.saveOnClose).to.be.true;
			expect(dialog.explicit).to.be.true;
			expect(dialog.isOpen).to.be.false;
		});

		it('should set saveOnClose to false and trigger a close on cancel', (): void => {
			buildController();

			dialog.cancel();

			expect(dialog.saveOnClose).to.be.false;
			expect(dialog.isOpen).to.be.false;
		});
	});

	describe('autosave', (): void => {
		var autosaveSpy: Sinon.SinonSpy;
		var behavior: __autosaveComponent.IAutosaveBehavior;

		beforeEach((): void => {
			autosaveSpy = sinon.spy((): boolean => { return true; });
			behavior = { autosave: autosaveSpy };

			buildController();

			parentChildBehavior.registerChildBehavior(dialog.autosaveLink, behavior);
		});


		it('should call the autosave behavior on the autosave component', (): void => {
			var close: boolean = dialog.autosave();

			expect(close).to.be.true;

			sinon.assert.calledOnce(autosaveSpy);
		});

		it('should not save if saveOnClose is false', (): void => {
			dialog.saveOnClose = false;

			var close: boolean = dialog.autosave();

			expect(close).to.be.true;

			sinon.assert.notCalled(autosaveSpy);
		});
	});

	describe('save', (): void => {
		it('should call save on the parent and pass in the explicit flag', (): void => {
			buildController();

			dialog.explicit = true;

			dialog.saveAction();

			sinon.assert.calledOnce(saveSpy);
			var arg: __autosaveDialog.ISaveParams = saveSpy.firstCall.args[0];
			expect(arg.explicit).to.be.true;
		});
	});

	function buildController(): void {
		var controllerResult: __angularFixture.IControllerResult<__autosaveDialog.IAutosaveDialogController>
			= __angularFixture.angularFixture.controller<__autosaveDialog.IAutosaveDialogController>(__autosaveDialog.controllerName
			, {
				save: saveSpy,
				dialogForm: {
					$pristine: false,
				},
		});

		scope = <__autosaveDialog.IAutosaveDialogScope>controllerResult.scope;
		dialog = controllerResult.controller;
		dialog.saveOnClose = true;
		scope.isOpen = true;
	}
});
