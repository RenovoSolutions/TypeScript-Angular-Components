import { Observable, Subject } from 'rxjs';
import { rlFakeAsync, mock, rlTick, flushMicrotasks } from 'rl-async-testing';

import { AutosaveDirective, DEFAULT_AUTOSAVE_DEBOUNCE } from './autosave';

interface IFormMock {
	dirty: boolean;
	form: {	statusChanges: Subject<void> };
	validate: sinon.SinonSpy;
	submitAndWait: sinon.SinonSpy;
	saveForm: sinon.SinonSpy;
}

interface IAutosaveActionMock {
	waitOn: sinon.SinonSpy;
}

describe('AutosaveDirective', () => {
	let autosave: AutosaveDirective;
	let form: IFormMock;
	let autosaveAction: IAutosaveActionMock;

	beforeEach(() => {
		form = {
			dirty: true,
			form: {
				statusChanges: new Subject<void>(),
			},
			validate: sinon.spy(() => true),
			submitAndWait: sinon.spy(),
			saveForm: sinon.spy(),
		};

		autosaveAction = { waitOn: sinon.spy(() => Observable.empty()) };

		autosave = new AutosaveDirective(<any>form, <any>autosaveAction);
	});

	describe('ngAfterViewInit', (): void => {
		it('should start an autosave check on form status changes', (): void => {
			const setDebounceSpy = sinon.spy();
			autosave.setDebounce = setDebounceSpy;
			autosave.ngAfterViewInit();

			form.form.statusChanges.next(null);

			sinon.assert.calledOnce(setDebounceSpy);
		});
	});

	describe('ngOnDestroy', () => {
		it('should cancel the current autosave on destroy', rlFakeAsync((): void => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;
			autosave.setDebounce();

			autosave.ngOnDestroy();

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.notCalled(autosaveSpy);
		}));
	});

	describe('setDebounce', () => {
		it('should set a timer to autosave after the specified duration', rlFakeAsync((): void => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;

			autosave.setDebounce();

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.calledOnce(autosaveSpy);
		}));

		it('should only autosave once if called again while the timer is in progress', rlFakeAsync(() => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;

			autosave.setDebounce();

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE / 2);
			flushMicrotasks();

			autosave.setDebounce();

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.calledOnce(autosaveSpy);
		}));

		it('should not trigger an autosave if the form is invalid', rlFakeAsync(() => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;
			form.validate = sinon.spy(() => false);

			autosave.setDebounce();

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.notCalled(autosaveSpy);
		}));

		it('should not trigger an autosave if the form is pristine', rlFakeAsync(() => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;
			form.dirty = false;

			autosave.setDebounce();

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.notCalled(autosaveSpy);
		}));

		it('should still trigger an autosave if the form is invalid but saveWhenInvalid is enabled', rlFakeAsync(() => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;
			autosave.saveWhenInvalid = true;
			form.validate = sinon.spy(() => false);

			autosave.setDebounce();

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.calledOnce(autosaveSpy);
		}));
	});

	describe('resetDebounce', () => {
		it('should reset the timer for autosaving', rlFakeAsync(() => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;

			autosave.setDebounce();

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE / 2);
			flushMicrotasks();

			autosave.resetDebounce();

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE / 2);
			flushMicrotasks();

			sinon.assert.notCalled(autosaveSpy);

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE / 2);
			flushMicrotasks();

			sinon.assert.calledOnce(autosaveSpy);
		}));

		it('should do nothing if no timer is in progress', rlFakeAsync(() => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;

			autosave.resetDebounce();

			rlTick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.notCalled(autosaveSpy);
		}));
	});

	describe('autosave', () => {
		it('should submit the form and pass the wait value to the autosave action', () => {
			const waitValue = mock.request()();
			form.submitAndWait = sinon.spy(() => waitValue);

			autosave.autosave();

			sinon.assert.calledOnce(autosaveAction.waitOn);
			sinon.assert.calledWith(autosaveAction.waitOn, waitValue);
		});

		it('should save the form directly if saveWhenInvalid is true', () => {
			autosave.saveWhenInvalid = true;
			const waitValue = mock.request()();
			form.saveForm = sinon.spy(() => waitValue);

			autosave.autosave();

			sinon.assert.calledOnce(autosaveAction.waitOn);
			sinon.assert.calledWith(autosaveAction.waitOn, waitValue);
		});

		it('should not save if the form becomes pristine immediately before saving', () => {
			const waitValue = mock.request()();
			form.submitAndWait = sinon.spy(() => waitValue);
			form.dirty = false;

			autosave.autosave();

			sinon.assert.notCalled(autosaveAction.waitOn);
		});
	});
});
