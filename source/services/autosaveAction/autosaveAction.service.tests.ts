import { Subject } from 'rxjs';
import { rlFakeAsync, rlTick, flushMicrotasks, mock, IMockedRequest } from 'rl-async-testing';
import { services } from 'typescript-angular-utilities';

import { AutosaveActionService, COMPLETE_MESSAGE_DURATION } from './autosaveAction.service';
import { AsyncHelper } from '../async/async.service';

describe('AutosaveActionService', () => {
	let autosaveAction: AutosaveActionService;
	let mockAction: IMockedRequest<void>;
	let saving: boolean;
	let complete: boolean;
	let successful: boolean;

	beforeEach(() => {
		const digestMock = {
			runDigestCycle: sinon.spy(),
		};

		autosaveAction = new AutosaveActionService(new services.timeout.TimeoutService(), new AsyncHelper());

		autosaveAction.saving$.subscribe(_saving => saving = _saving);
		autosaveAction.complete$.subscribe(_complete => complete = _complete);
		autosaveAction.successful$.subscribe(_successful => successful = _successful);

		mockAction = mock.request();
		autosaveAction.waitOn(mockAction()).subscribe();

		expect(saving).to.be.true;
	});

	it('should set successful to true if the request resolves successfully', rlFakeAsync((): void => {
		mockAction.flush();

		expect(saving).to.be.false;
		expect(complete).to.be.true;
		expect(successful).to.be.true;

		rlTick(COMPLETE_MESSAGE_DURATION);
		flushMicrotasks();
	}));

	it('should set successful to false if the promise fails', rlFakeAsync((): void => {
		mockAction = mock.rejectedRequest();
		autosaveAction.waitOn(mockAction()).subscribe({ error: () => null });
		mockAction.flush();

		expect(saving).to.be.false;
		expect(complete).to.be.true;
		expect(successful).to.be.false;

		rlTick(COMPLETE_MESSAGE_DURATION);
		flushMicrotasks();
	}));

	it('should set complete to false after the duration', rlFakeAsync((): void => {
		mockAction.flush();

		expect(complete).to.be.true;

		rlTick(COMPLETE_MESSAGE_DURATION);
		flushMicrotasks();

		expect(complete).to.be.false;
	}));
});
