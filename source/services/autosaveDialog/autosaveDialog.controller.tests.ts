/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='autosaveDialog.module.ts' />
/// <reference path='autosaveDialog.controller.ts' />
/// <reference path='autosaveDialog.service.ts' />

module rl.ui.services.autosaveDialog {
	import test = rl.utilities.services.test;

	interface IAutosaveMock {
		autosave: Sinon.SinonSpy;
		contentForm?: any;
	}

	describe('AutosaveDialogController', () => {
		var scope: IAutosaveDialogScope;
		var dialog: AutosaveDialogController;
		var setForm: Sinon.SinonSpy;

		beforeEach(() => {
			angular.mock.module(moduleName);

			setForm = sinon.spy();
		});

		it('should set the form if a form name is specified', (): void => {
			var form: any = {};
			var formName: string = 'myForm';
			buildController(null, form, formName);

			scope.$digest();

			sinon.assert.calledOnce(setForm);
			sinon.assert.calledWith(setForm, form);
		});

		it('should set the form if a formGetter is specified', (): void => {
			var form: any = {};
			var formGetter: Sinon.SinonSpy = sinon.spy((): any => { return form; });
			buildController(formGetter);

			scope.$digest();

			sinon.assert.calledOnce(formGetter);
			sinon.assert.calledOnce(setForm);
			sinon.assert.calledWith(setForm, form);
		});

		function buildController(formGetter?: Sinon.SinonSpy, form?: any, formName?: string): void {
			var bindings: any = {
				form: formName,
				formGetter: formGetter,
				setForm: setForm,
			};

			var newScope: any = {};

			if (formName != null) {
				newScope[formName] = form;
			}

			var controllerResult: test.IControllerResult<AutosaveDialogController>
				= test.angularFixture.controllerWithBindings<AutosaveDialogController>(controllerName, bindings, null, newScope);

			scope = <IAutosaveDialogScope>controllerResult.scope;
			dialog = controllerResult.controller;
		}
	});
}
