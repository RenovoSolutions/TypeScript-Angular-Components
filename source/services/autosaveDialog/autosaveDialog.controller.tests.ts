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

		beforeEach(() => {
			angular.mock.module(moduleName);
		});

		it('should set the content form if a formGetter is specified', (): void => {
			var form: any = {};
			var autosave: IAutosaveMock = <any>{};
			var formGetter: Sinon.SinonSpy = sinon.spy((): any => { return form; });
			buildController(autosave, formGetter);

			scope.$digest();

			sinon.assert.calledOnce(formGetter);
			expect(autosave.contentForm).to.equal(form);
		});

		describe('dialogClosing', (): void => {
			var autosave: IAutosaveMock;

			beforeEach((): void => {
				autosave = {
					autosave: sinon.spy((): boolean => { return true; }),
				};
			});

			it('should autosave if the dialog closes passively', (): void => {
				var data: any = {
					prop: 1,
				};

				buildController(autosave, null, data);

				dialog.dialogClosing(null, null, false);

				sinon.assert.calledOnce(autosave.autosave);
				expect(autosave.autosave.firstCall.args[0].prop).to.equal(data.prop);
			});

			it('should prevent the dialog from closing if the autosave fails', (): void => {
				autosave.autosave = sinon.spy((): boolean => { return false; });
				buildController(autosave);

				var event: any = {
					preventDefault: sinon.spy(),
				};

				dialog.dialogClosing(event, null, false);

				sinon.assert.calledOnce(autosave.autosave);
				sinon.assert.calledOnce(event.preventDefault);
			});

			it('should not autosave if the dialog closes explicitly', (): void => {
				buildController(autosave);

				dialog.dialogClosing(null, null, true);

				sinon.assert.notCalled(autosave.autosave);
			});
		});

		function buildController(autosave?: any, formGetter?: Sinon.SinonSpy, data?: any): void {
			var newScope: any = {
				autosave: autosave,
				formGetter: formGetter,
				data: data,
			};

			var controllerResult: test.IControllerResult<AutosaveDialogController>
				= test.angularFixture.controllerWithBindings<AutosaveDialogController>(controllerName, null, null, newScope);

			scope = <IAutosaveDialogScope>controllerResult.scope;
			dialog = controllerResult.controller;
		}
	});
}
