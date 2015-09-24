/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/angularMocks.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='baseDialog.module.ts' />
/// <reference path='baseDialog.controller.ts' />

module rl.ui.services.dialog.baseDialog {
	import test = rl.utilities.services.test;

	interface IBaseDialogMock {
		modalClosing: Sinon.SinonSpy;
	}

	describe('BaseDialogController', () => {
		let scope: ng.IScope;
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
}
