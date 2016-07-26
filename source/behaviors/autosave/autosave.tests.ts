import { Subject } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import __test = services.test;
import fakeAsync = __test.fakeAsync;
import tick = __test.tick;
import flushMicrotasks = __test.flushMicrotasks;

import { AutosaveDirective, DEFAULT_AUTOSAVE_DEBOUNCE } from './autosave';

interface IFormMock {
	form: { statusChanges: Subject<void> };
	validate: Sinon.SinonSpy;
	submitAndWait: Sinon.SinonSpy;
}

interface IAutosaveActionMock {
	trigger: Sinon.SinonSpy;
}

describe('AutosaveDirective', () => {
	let autosave: AutosaveDirective;
	let form: IFormMock;
	let autosaveAction: IAutosaveActionMock;

	beforeEach(() => {
		form = {
			form: { statusChanges: new Subject<void>() },
			validate: sinon.spy(() => true),
			submitAndWait: sinon.spy(),
		};

		autosaveAction = { trigger: sinon.spy() };

		autosave = new AutosaveDirective(<any>form, new services.timeout.TimeoutService(), <any>autosaveAction);
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

	describe('setDebounce', () => {
		it('should set a timer to autosave after the specified duration', fakeAsync((): void => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;

			autosave.setDebounce();

			tick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.calledOnce(autosaveSpy);
		}));

		it('should only autosave once if called again while the timer is in progress', fakeAsync(() => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;

			autosave.setDebounce();

			tick(DEFAULT_AUTOSAVE_DEBOUNCE / 2);
			flushMicrotasks();

			autosave.setDebounce();

			tick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.calledOnce(autosaveSpy);
		}));

		it('should not trigger an autosave if the form is invalid', fakeAsync(() => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;
			form.validate = sinon.spy(() => false);

			autosave.setDebounce();

			tick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.notCalled(autosaveSpy);
		}));
	});

	describe('resetDebounce', () => {
		it('should reset the timer for autosaving', fakeAsync(() => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;

			autosave.setDebounce();

			tick(DEFAULT_AUTOSAVE_DEBOUNCE / 2);
			flushMicrotasks();

			autosave.resetDebounce();

			tick(DEFAULT_AUTOSAVE_DEBOUNCE / 2);
			flushMicrotasks();

			sinon.assert.notCalled(autosaveSpy);

			tick(DEFAULT_AUTOSAVE_DEBOUNCE / 2);
			flushMicrotasks();

			sinon.assert.calledOnce(autosaveSpy);
		}));

		it('should do nothing if no timer is in progress', fakeAsync(() => {
			const autosaveSpy = sinon.spy();
			autosave.autosave = autosaveSpy;

			autosave.resetDebounce();

			tick(DEFAULT_AUTOSAVE_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.notCalled(autosaveSpy);
		}));
	});

	describe('autosave', () => {
		it('should submit the form and pass the wait value to the autosave action', () => {
			const waitValue = __test.mock.request()();
			form.submitAndWait = sinon.spy(() => waitValue);

			autosave.autosave();

			sinon.assert.calledOnce(autosaveAction.trigger);
			sinon.assert.calledWith(autosaveAction.trigger, waitValue);
		});
	});
});
