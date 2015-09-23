/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='autosaveDialog.module.ts' />
/// <reference path='autosaveDialog.service.ts' />

module rl.ui.services.autosaveDialog {
	import test = rl.utilities.services.test;

	interface IDialogMock {
		open: Sinon.SinonSpy;
	}

	interface IAutosaveFactoryMock {
		getInstance: Sinon.SinonSpy;
	}

	interface IAutosaveMock {
		autosave: Sinon.SinonSpy;
	}

	describe('autosaveDialog', () => {
		var autosaveDialog: IAutosaveDialogService;
		var dialog: IDialogMock;
		var autosaveFactory: IAutosaveFactoryMock;
		var autosave: IAutosaveMock;

		beforeEach(() => {
			angular.mock.module(moduleName);

			dialog = {
				open: sinon.spy(),
			};

			autosave = {
				autosave: sinon.spy(),
			};

			autosaveFactory = {
				getInstance: sinon.spy((): IAutosaveMock => { return autosave; }),
			};

			test.angularFixture.mock({
				dialog: dialog,
				autosaveFactory: autosaveFactory,
			});

			var services: any = test.angularFixture.inject(serviceName);
			autosaveDialog = services[serviceName];
		});

		it('should open a modal dialog and build an autosave service to put on the scope', (): void => {
			var scope: IAutosaveDialogScope = <any>{ prop: 1 };
			var resolve: any = { prop: 4 };
			var formGetter: Sinon.SinonSpy = sinon.spy();
			var save: Sinon.SinonSpy = sinon.spy();
			var validate: Sinon.SinonSpy = sinon.spy();

			var options: IAutosaveDialogSettings = {
				scope: scope,
				size: 'sm',
				template: '<div></div>',
				data: resolve,

				formGetter: formGetter,
				save: save,
				validate: validate,
			};

			autosaveDialog.open(options);

			sinon.assert.calledOnce(autosaveFactory.getInstance);
			sinon.assert.calledWith(autosaveFactory.getInstance, save, null, validate);

			expect(scope.autosave).to.equal(autosave);
			expect(scope.formGetter).to.equal(formGetter);

			sinon.assert.calledOnce(<Sinon.SinonSpy>dialog.open);
			var dialogOptions: IAutosaveDialogSettings = dialog.open.firstCall.args[0];
			expect(dialogOptions.scope).to.equal(scope);
			expect(dialogOptions.size).to.equal('sm');
			expect(dialogOptions.template).to.equal('<div></div>');
		});
	});
}
