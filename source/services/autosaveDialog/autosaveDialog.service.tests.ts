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
	let autosaveDialog: IAutosaveDialogService;
	let dialog: IDialogMock;
	let autosaveFactory: IAutosaveFactoryMock;
	let autosave: IAutosaveMock;
	let $rootScope: angular.IRootScopeService;
	let mock: test.mock.IMock;

	beforeEach(() => {
		angular.mock.module(moduleName);
		angular.mock.module(test.mock.moduleName);

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

		let services: any = test.angularFixture.inject(serviceName, '$rootScope', test.mock.serviceName);
		autosaveDialog = services[serviceName];
		$rootScope = services.$rootScope;
		mock = services[test.mock.serviceName];
	});

	it('should open a modal dialog with the specified settings', (): void => {
		let scope: IAutosaveDialogScope = <any>{ prop: 1 };
		let data: any = { prop: 4 };
		let formGetter: Sinon.SinonSpy = sinon.spy();
		let save: Sinon.SinonSpy = sinon.spy();
		let validate: Sinon.SinonSpy = sinon.spy();

		let options: IAutosaveDialogSettings = {
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
		let params: any = autosaveFactory.getInstance.firstCall.args[0];
		expect(params.save).to.equal(save);
		expect(params.validate).to.equal(validate);

		expect(scope.formGetter).to.equal(formGetter);
		expect(scope.dialog).to.equal(data);

		sinon.assert.calledOnce(<Sinon.SinonSpy>dialog.open);
		let dialogOptions: IAutosaveDialogSettings = dialog.open.firstCall.args[0];
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

	describe('resolve', (): void => {
		it('should resolve promises and apply the result to the dialog data object', (): void => {
			let dataService: any = mock.service();
			let data: any = { prop: 5 };
			mock.promise(dataService, 'get', data);

			let scope: any = {};

			let options: any = {
				resolve: {
					data: dataService.get,
				},
				scope: scope,
			};

			autosaveDialog.open(options);

			sinon.assert.notCalled(dialog.open);
			expect(scope.dialog).to.not.exist;

			mock.flush(dataService);

			sinon.assert.calledOnce(dialog.open);
			expect(scope.dialog.data).to.equal(data);
		});

		it('should not open the dialog if resolve fails', (): void => {
			let dataService: any = mock.service();
			mock.promise(dataService, 'get', {}, false);

			let options: any = {
				resolve: {
					data: dataService.get,
				},
			};

			autosaveDialog.open(options);

			mock.flush(dataService);

			sinon.assert.notCalled(dialog.open);
		});
	});
});
