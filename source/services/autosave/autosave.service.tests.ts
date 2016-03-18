/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;
import __notification = services.notification;

import { IAutosaveService, IAutosaveServiceFactory, moduleName, factoryName } from './autosave.service';
import { Trigger, ITrigger } from './triggers/trigger';

import * as ng from 'angular';
import 'angular-mocks';

interface IAutosaveActionMock {
	trigger(promise: ng.IPromise<void>): ng.IPromise<void>;
}

interface IMockFormController {
	$pristine: boolean;
	$dirty: boolean;
	$setPristine: Sinon.SinonSpy;
	$valid: boolean;
}

interface INotificationMock {
	warning: Sinon.SinonSpy;
}

describe('autosave', () => {
	let autosave: IAutosaveService;
	let autosaveFactory: IAutosaveServiceFactory;
	let saveSpy: Sinon.SinonSpy;
	let triggerSpy: Sinon.SinonSpy;
	let setPristineSpy: Sinon.SinonSpy;
	let baseContentForm: IMockFormController;
	let $rootScope: ng.IRootScopeService;
	let notification: INotificationMock;

	beforeEach(() => {
		ng.mock.module(moduleName);

		triggerSpy = sinon.spy((promise: ng.IPromise<void>): ng.IPromise<void> => { return promise; });
		let autosaveActionService: IAutosaveActionMock = { trigger: triggerSpy };

		notification = {
			warning: sinon.spy(),
		};

		let mocks: any = {};
		mocks.autosaveAction = autosaveActionService;
		mocks[__notification.serviceName] = notification;
		test.angularFixture.mock(mocks);

		setPristineSpy = sinon.spy();

		baseContentForm = {
			$pristine: false,
			$dirty: true,
			$setPristine: setPristineSpy,
			$valid: true,
		};

		let services: any = test.angularFixture.inject(factoryName, '$q', '$rootScope', '$timeout');
		autosaveFactory = services[factoryName];
		let $q: ng.IQService = services.$q;
		$rootScope = services.$rootScope;

		saveSpy = sinon.spy((): ng.IPromise<void> => { return $q.when(); });
	});

	it('should call save on the parent and set the form to pristine', (): void => {
		autosave = autosaveFactory.getInstance({
			save: saveSpy,
			contentForm: <any>baseContentForm,
		});

		let close: boolean = autosave.autosave();

		expect(close).to.be.true;

		sinon.assert.calledOnce(saveSpy);

		$rootScope.$digest();

		sinon.assert.calledOnce(setPristineSpy);
	});

	it('should not save if the form is pristine', (): void => {
		autosave = autosaveFactory.getInstance({
			save: saveSpy,
			contentForm: <any > baseContentForm,
		});

		baseContentForm.$pristine = true;

		let close: boolean = autosave.autosave();

		expect(close).to.be.true;

		sinon.assert.notCalled(saveSpy);
	});

	it('should return false without saving if the form is invalid', (): void => {
		baseContentForm.$valid = false;

		autosave = autosaveFactory.getInstance({
			save: saveSpy,
			contentForm: <any>baseContentForm,
		});

		let close: boolean = autosave.autosave();

		expect(close).to.be.false;

		sinon.assert.calledOnce(notification.warning);
		sinon.assert.notCalled(saveSpy);
	});

	it('should ignore validation state if saveWhenInvalid is set', (): void => {
		baseContentForm.$valid = false;

		autosave = autosaveFactory.getInstance({
			save: saveSpy,
			contentForm: <any>baseContentForm,
			saveWhenInvalid: true,
		});

		let close: boolean = autosave.autosave();

		expect(close).to.be.true;

		sinon.assert.notCalled(notification.warning);
		sinon.assert.calledOnce(saveSpy);
	});

	it('should always save if no form is specified', (): void => {
		autosave = autosaveFactory.getInstance({
			save: saveSpy,
		});

		let close: boolean = autosave.autosave();

		expect(close).to.be.true;

		sinon.assert.calledOnce(saveSpy);
	});
});
