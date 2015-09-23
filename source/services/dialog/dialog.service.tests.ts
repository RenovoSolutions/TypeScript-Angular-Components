/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='dialog.service.ts' />

module rl.ui.services.dialog {
	import test = rl.utilities.services.test;

	interface IDialogMock {
		open: Sinon.SinonSpy;
	}

	describe('dialog', () => {
		var dialog: IDialogService<any>;
		var testImplementation: IDialogMock;

		beforeEach(() => {
			testImplementation = {
				open: sinon.spy(),
			};

			angular.mock.module(moduleName, (dialogProvider: IDialogServiceProvider<any>): void => {
				dialogProvider.setImplementation(testImplementation);
			});

			test.angularFixture.mock({
				baseDialog: {},
			});

			var services: any = test.angularFixture.inject(serviceName);
			dialog = services[serviceName];
		});

		it('should open a dialog using the configured implementation', (): void => {
			var options: any = {
				scope: {},
				controller: 'controller',
				resolve: {},
				size: 'sm',
				template: '<div></div>'
			};
			dialog.open(options);
			sinon.assert.calledOnce(testImplementation.open);
			sinon.assert.calledWith(testImplementation.open, options);
		});
	});
}
