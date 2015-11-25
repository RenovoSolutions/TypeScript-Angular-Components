/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import { OnChangeTrigger, OnChangeSettings } from './onChangeTrigger';
import { ITrigger } from './trigger';
import { moduleName } from './triggers.service';

import * as ng from 'angular';
import 'angular-mocks';

interface IAutosaveActionMock {
	trigger(promise: ng.IPromise<void>): ng.IPromise<void>;
}

interface IMockFormController {
	$pristine: boolean;
	$dirty: boolean;
	$setPristine: Sinon.SinonSpy;
}

describe('onChangeTrigger', () => {
	let trigger: ITrigger<OnChangeSettings>;
	let saveSpy: Sinon.SinonSpy;
	let triggerSpy: Sinon.SinonSpy;
	let setPristineSpy: Sinon.SinonSpy;
	let baseContentForm: IMockFormController;
	let $rootScope: ng.IRootScopeService;
	let $timeout: ng.ITimeoutService;

	beforeEach(() => {
		ng.mock.module(moduleName);

		triggerSpy = sinon.spy((promise: ng.IPromise<void>): ng.IPromise<void> => { return promise; });
		let autosaveActionService: IAutosaveActionMock = { trigger: triggerSpy };

		setPristineSpy = sinon.spy();

		baseContentForm = {
			$pristine: false,
			$dirty: true,
			$setPristine: setPristineSpy,
		};

		let services: any = test.angularFixture.inject('$q', '$rootScope', '$timeout');
		let $q: ng.IQService = services.$q;
		$rootScope = services.$rootScope;
		$timeout = services.$timeout;

		saveSpy = sinon.spy((): ng.IPromise<void> => { return $q.when(); });

		trigger = new OnChangeTrigger($rootScope, $timeout);
	});

	it('should trigger autosave when the form becomes dirty after the debounce duration', (): void => {
		trigger.configure({
			form: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: null,
		});
		trigger.setTrigger(saveSpy);

		expect(baseContentForm.$dirty).to.be.true;

		$rootScope.$digest();

		$timeout.flush(1000);

		sinon.assert.calledOnce(saveSpy);
	});

	it('should reset the debounce timer on form changes', (): void => {
		let triggerChange: { (): void };
		let changeListener: any = (callback: { (): void }): Sinon.SinonSpy => {
			triggerChange = callback;
			return sinon.spy();
		};

		trigger.configure({
			form: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: changeListener,
		});
		trigger.setTrigger(saveSpy);

		expect(baseContentForm.$dirty).to.be.true;

		$rootScope.$digest();

		$timeout.flush(500);

		triggerChange();

		$timeout.flush(500);

		sinon.assert.notCalled(saveSpy);

		$timeout.flush(500);

		sinon.assert.calledOnce(saveSpy);
	});
});
