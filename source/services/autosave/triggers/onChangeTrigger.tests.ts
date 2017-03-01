import { rlFakeAsync, rlTick, flushMicrotasks } from 'rl-async-testing';
import { services } from 'typescript-angular-utilities';
import test = services.test;

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
	$setPristine: sinon.SinonSpy;
}

describe('onChangeTrigger', () => {
	let trigger: ITrigger<OnChangeSettings>;
	let saveSpy: sinon.SinonSpy;
	let triggerSpy: sinon.SinonSpy;
	let setPristineSpy: sinon.SinonSpy;
	let baseContentForm: IMockFormController;
	let $rootScope: ng.IRootScopeService;
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

		trigger = new OnChangeTrigger($rootScope);
	});

	it('should trigger autosave when the form becomes dirty and valid after the debounce duration', rlFakeAsync((): void => {
		trigger.configure({
			form: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: emptyChangeListener,
		});
		trigger.setTrigger(saveSpy);

		baseContentForm.$dirty = true;
		baseContentForm.$valid = true;

		$rootScope.$digest();

		rlTick(1000);
		flushMicrotasks();

		sinon.assert.calledOnce(saveSpy);
	}));

	it('should not save if the form is dirty but invalid', rlFakeAsync((): void => {
		trigger.configure({
			form: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: emptyChangeListener,
		});
		trigger.setTrigger(saveSpy);

		baseContentForm.$dirty = true;

		$rootScope.$digest();

		rlTick(1000);
		flushMicrotasks();

		sinon.assert.notCalled(saveSpy);
	}));

	it('should not save if the form is valid but not dirty', rlFakeAsync((): void => {
		trigger.configure({
			form: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: emptyChangeListener,
		});
		trigger.setTrigger(saveSpy);

		baseContentForm.$valid = true;

		$rootScope.$digest();

		rlTick(1000);
		flushMicrotasks();

		sinon.assert.notCalled(saveSpy);
	}));

	it('should not save if the form is dirty and invalid if saveWhenInvalid was specified', rlFakeAsync((): void => {
		trigger.configure({
			form: <any>baseContentForm,
			debounceDuration: 1000,
			setChangeListener: emptyChangeListener,
			saveWhenInvalid: true,
		});
		trigger.setTrigger(saveSpy);

		baseContentForm.$dirty = true;

		$rootScope.$digest();

		rlTick(1000);
		flushMicrotasks();

		sinon.assert.calledOnce(saveSpy);
	}));

	it('should reset the debounce timer on form changes', rlFakeAsync((): void => {
		let triggerChange: { (): void };
		let changeListener: any = (callback: { (): void }): sinon.SinonSpy => {
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

		rlTick(500);
		flushMicrotasks();

		triggerChange();

		rlTick(500);
		flushMicrotasks();

		sinon.assert.notCalled(saveSpy);

		rlTick(500);
		flushMicrotasks();

		sinon.assert.calledOnce(saveSpy);
	}));
});
