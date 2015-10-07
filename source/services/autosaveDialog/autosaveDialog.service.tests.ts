/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

/// <reference path='autosaveDialog.module.ts' />
/// <reference path='autosaveDialog.service.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	serviceName,
	IAutosaveDialogSettings,
	IAutosaveDialogService,
	IAutosaveDialogScope,
} from './autosaveDialog.module';

import { IDialogCloseHandler } from '../dialog/dialog.service';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

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
	var $rootScope: angular.IRootScopeService;

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

		var services: any = test.angularFixture.inject(serviceName, '$rootScope');
		autosaveDialog = services[serviceName];
		$rootScope = services.$rootScope;
	});

	it('should open a modal dialog with the specified settings', (): void => {
		var scope: IAutosaveDialogScope = <any>{ prop: 1 };
		var data: any = { prop: 4 };
		var formGetter: Sinon.SinonSpy = sinon.spy();
		var save: Sinon.SinonSpy = sinon.spy();
		var validate: Sinon.SinonSpy = sinon.spy();

		var options: IAutosaveDialogSettings = {
			scope: scope,
			size: 'sm',
			template: '<div></div>',
			data: data,

			formGetter: formGetter,
			save: save,
			validate: validate,
		};

		autosaveDialog.open(options);
		$rootScope.$digest();

		sinon.assert.calledOnce(autosaveFactory.getInstance);
		sinon.assert.calledWith(autosaveFactory.getInstance, save, null, validate);

		expect(scope.formGetter).to.equal(formGetter);
		expect(scope.dialog).to.equal(data);

		sinon.assert.calledOnce(<Sinon.SinonSpy>dialog.open);
		var dialogOptions: IAutosaveDialogSettings = dialog.open.firstCall.args[0];
		expect(dialogOptions.scope).to.equal(scope);
		expect(dialogOptions.size).to.equal('sm');
		expect(dialogOptions.template).to.equal('<div></div>');
	});

	describe('autosaveCloseHandler', (): void => {
		let closeHandler: IDialogCloseHandler;
		let options: IAutosaveDialogSettings;

		beforeEach((): void => {
			dialog.open = sinon.spy((settings: any, handler: IDialogCloseHandler): void => {
				closeHandler = handler;
			});

			options = <any>{};
		});

		it('should return true if explicitly closed', (): void => {
			autosaveDialog.open(options);
			$rootScope.$digest();

			let canClose: boolean = closeHandler(true);

			expect(canClose).to.be.true;
		});

		it('should autosave if the dialog wasnt closed explicitly', (): void => {
			autosaveDialog.open(options);
			$rootScope.$digest();

			closeHandler(false);

			sinon.assert.calledOnce(autosave.autosave);
		});
	});
});
