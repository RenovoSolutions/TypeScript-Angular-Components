import { services } from 'typescript-angular-utilities';
import test = services.test;
import __timeout = services.timeout;

import { OnChangeTrigger, OnChangeSettings } from './onChangeTrigger';
import { ITrigger } from './trigger';
import { moduleName, IListener } from './triggers.service';

import * as ng from 'angular';
import 'angular-mocks';

interface IAutosaveActionMock {
	trigger(promise: ng.IPromise<void>): ng.IPromise<void>;
}

interface IMockFormController {
	$pristine: boolean;
	$dirty: boolean;
	$valid: boolean;
	$setPristine: Sinon.SinonSpy;
}

describe('onChangeTrigger', () => {
	let trigger: ITrigger<OnChangeSettings>;
	let saveSpy: Sinon.SinonSpy;
	let triggerSpy: Sinon.SinonSpy;
	let setPristineSpy: Sinon.SinonSpy;
	let baseContentForm: IMockFormController;
	let $rootScope: ng.IRootScopeService;
	let timeoutService: __timeout.TimeoutService;
	let emptyChangeListener: { (): IListener };

	beforeEach(() => {
		ng.mock.module(moduleName);

		triggerSpy = sinon.spy((promise: ng.IPromise<void>): ng.IPromise<void> => { return promise; });
		let autosaveActionService: IAutosaveActionMock = { trigger: triggerSpy };

		setPristineSpy = sinon.spy();

		baseContentForm = {
			$pristine: false,
			$dirty: false,
			$valid: false,
			$setPristine: setPristineSpy,
		};

		emptyChangeListener = (): IListener => { return (): void => { return; }; };

		let services: any = test.angularFixture.inject('$q', '$rootScope');
		let $q: ng.IQService = services.$q;
		$rootScope = services.$rootScope;

		saveSpy = sinon.spy((): ng.IPromise<void> => { return $q.when(); });

		trigger = new OnChangeTrigger($rootScope, new __timeout.TimeoutService());
	});

	it('should trigger autosave when the form becomes dirty and valid after the debounce duration', test.fakeAsync((): void => {
		trigger.configure({
			form: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: emptyChangeListener,
		});
		trigger.setTrigger(saveSpy);

		baseContentForm.$dirty = true;
		baseContentForm.$valid = true;

		$rootScope.$digest();

		test.tick(1000);
		test.flushMicrotasks();

		sinon.assert.calledOnce(saveSpy);
	}));

	it('should not save if the form is dirty but invalid', test.fakeAsync((): void => {
		trigger.configure({
			form: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: emptyChangeListener,
		});
		trigger.setTrigger(saveSpy);

		baseContentForm.$dirty = true;

		$rootScope.$digest();

		test.tick(1000);
		test.flushMicrotasks();

		sinon.assert.notCalled(saveSpy);
	}));

	it('should not save if the form is valid but not dirty', test.fakeAsync((): void => {
		trigger.configure({
			form: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: emptyChangeListener,
		});
		trigger.setTrigger(saveSpy);

		baseContentForm.$valid = true;

		$rootScope.$digest();

		test.tick(1000);
		test.flushMicrotasks();

		sinon.assert.notCalled(saveSpy);
	}));

	it('should not save if the form is dirty and invalid if saveWhenInvalid was specified', test.fakeAsync((): void => {
		trigger.configure({
			form: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: emptyChangeListener,
			saveWhenInvalid: true,
		});
		trigger.setTrigger(saveSpy);

		baseContentForm.$dirty = true;

		$rootScope.$digest();

		test.tick(1000);
		test.flushMicrotasks();

		sinon.assert.calledOnce(saveSpy);
	}));

	it.only('should reset the debounce timer on form changes', test.fakeAsync((): void => {
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

		baseContentForm.$dirty = true;
		baseContentForm.$valid = true;

		$rootScope.$digest();

		test.tick(500);
		test.flushMicrotasks();

		triggerChange();

		test.tick(500);
		test.flushMicrotasks();

		sinon.assert.notCalled(saveSpy);

		test.tick(500);
		test.flushMicrotasks();

		sinon.assert.calledOnce(saveSpy);
	}));
});
