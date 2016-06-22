import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	moduleName,
	serviceName,
	IDialogService,
	IDialogServiceProvider,
	bootstrapModalDialog,
	IDialogCloseHandler,
	IAutosaveDialogSettings,
} from './dialog.service.ng1';
import { factoryName as autosaveFactoryName } from '../autosave/autosave.service';

import * as angular from 'angular';
import 'angular-mocks';

interface IDialogMock {
	open: Sinon.SinonSpy;
}

interface IAutosaveFactoryMock {
	getInstance: Sinon.SinonSpy;
}

interface IAutosaveMock {
	autosave: Sinon.SinonSpy;
}

describe('dialog', () => {
	var dialog: IDialogService<any>;
	var testImplementation: IDialogMock;
	let autosaveFactory: IAutosaveFactoryMock;
	let autosave: IAutosaveMock;
	let $rootScope: angular.IRootScopeService;

	beforeEach(() => {
		testImplementation = {
			open: sinon.spy((): any => { return {}; }),
		};

		angular.mock.module(moduleName, (dialogProvider: IDialogServiceProvider<any>): void => {
			dialogProvider.setImplementation(<any>testImplementation);
		});

		autosave = {
			autosave: sinon.spy(),
		};

		autosaveFactory = {
			getInstance: sinon.spy((): IAutosaveMock => { return autosave; }),
		};

		let mocks: any = {};
		mocks[bootstrapModalDialog.serviceName] = {};
		mocks[autosaveFactoryName] = autosaveFactory;
		test.angularFixture.mock(mocks);

		var services: any = test.angularFixture.inject(serviceName, '$rootScope');
		dialog = services[serviceName];
		$rootScope = services.$rootScope;
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

	describe('autosaveCloseHandler', (): void => {
		let closeHandler: IDialogCloseHandler;
		let options: IAutosaveDialogSettings;

		beforeEach((): void => {
			dialog.open = sinon.spy((settings: any, handler: IDialogCloseHandler): any => {
				closeHandler = handler;
				return {};
			});

			options = <any>{};
		});

		it('should return true if explicitly closed', (): void => {
			dialog.openForm(options);
			$rootScope.$digest();

			let canClose: boolean = closeHandler(true);

			expect(canClose).to.be.true;
		});

		it('should autosave if the dialog wasnt closed explicitly', (): void => {
			dialog.openForm(options);
			$rootScope.$digest();

			closeHandler(false);

			sinon.assert.calledOnce(autosave.autosave);
		});
	});
});
