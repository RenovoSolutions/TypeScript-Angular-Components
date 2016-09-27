import { rlFakeAsync, rlTick, flushMicrotasks, mock, IMockedRequest } from 'rl-async-testing';
import { services } from 'typescript-angular-utilities';

import { AutosaveActionService, COMPLETE_MESSAGE_DURATION } from './autosaveAction.service';
import { AsyncHelper } from '../async/async.service';

describe('AutosaveActionService', () => {
	let autosaveAction: AutosaveActionService;
	let mockAction: IMockedRequest<void>;

	beforeEach(() => {
		const digestMock = {
			runDigestCycle: sinon.spy(),
		};

		autosaveAction = new AutosaveActionService(new services.timeout.TimeoutService(), new AsyncHelper(), <any>digestMock);

		mockAction = mock.request();
		autosaveAction.trigger(mockAction());

		expect(autosaveAction.saving).to.be.true;
	});

	it('should set successful to true if the request resolves successfully', rlFakeAsync((): void => {
		mockAction.flush();

		expect(autosaveAction.saving).to.be.false;
		expect(autosaveAction.complete).to.be.true;
		expect(autosaveAction.successful).to.be.true;

		rlTick(COMPLETE_MESSAGE_DURATION);
		flushMicrotasks();
	}));

	it('should set successful to false if the promise fails', rlFakeAsync((): void => {
		mockAction = mock.rejectedRequest();
		autosaveAction.trigger(mockAction());
		mockAction.flush();

		expect(autosaveAction.saving).to.be.false;
		expect(autosaveAction.complete).to.be.true;
		expect(autosaveAction.successful).to.be.false;

		rlTick(COMPLETE_MESSAGE_DURATION);
		flushMicrotasks();
	}));

	it('should set complete to false after the duration', rlFakeAsync((): void => {
		mockAction.flush();

		expect(autosaveAction.complete).to.be.true;

		rlTick(COMPLETE_MESSAGE_DURATION);
		flushMicrotasks();

		expect(autosaveAction.complete).to.be.false;
	}));
});
