/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	serviceName,
	IDialogService,
	IDialogServiceProvider,
	bootstrapModalDialog,
	IDialogCloseHandler,
	IAutosaveDialogSettings,
} from './dialog.service';
import { factoryName as autosaveFactoryName } from '../autosave/autosave.service';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface IDialogMock {
	open: Sinon.SinonSpy;
	openAutosaveForm: Sinon.SinonSpy;
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
			dialogProvider.setImplementation(testImplementation);
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
			dialog.openAutosaveForm(options);
			$rootScope.$digest();

			let canClose: boolean = closeHandler(true);

			expect(canClose).to.be.true;
		});

		it('should autosave if the dialog wasnt closed explicitly', (): void => {
			dialog.openAutosaveForm(options);
			$rootScope.$digest();

			closeHandler(false);

			sinon.assert.calledOnce(autosave.autosave);
		});
	});
});
