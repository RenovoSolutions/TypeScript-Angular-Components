import { services } from 'typescript-angular-utilities';
import __test = services.test;

import { AutosaveActionService, COMPLETE_MESSAGE_DURATION } from './autosaveAction.service';
import { AsyncHelper } from '../async/async.service';

describe('AutosaveActionService', () => {
	let autosaveAction: AutosaveActionService;
	let mockAction: __test.IMockedRequest<void>;

	beforeEach(() => {
		const digestMock = {
			runDigestCycle: sinon.spy(),
		};

		autosaveAction = new AutosaveActionService(new services.timeout.TimeoutService(), new AsyncHelper(), <any>digestMock);

		mockAction = __test.mock.request();
		autosaveAction.trigger(mockAction());

		expect(autosaveAction.saving).to.be.true;
	});

	it('should set successful to true if the request resolves successfully', __test.rlFakeAsync((): void => {
		mockAction.flush();

		expect(autosaveAction.saving).to.be.false;
		expect(autosaveAction.complete).to.be.true;
		expect(autosaveAction.successful).to.be.true;

		__test.rlTick(COMPLETE_MESSAGE_DURATION);
		__test.flushMicrotasks();
	}));

	it('should set successful to false if the promise fails', __test.rlFakeAsync((): void => {
		mockAction = __test.mock.rejectedRequest();
		autosaveAction.trigger(mockAction());
		mockAction.flush();

		expect(autosaveAction.saving).to.be.false;
		expect(autosaveAction.complete).to.be.true;
		expect(autosaveAction.successful).to.be.false;

		__test.rlTick(COMPLETE_MESSAGE_DURATION);
		__test.flushMicrotasks();
	}));

	it('should set complete to false after the duration', __test.rlFakeAsync((): void => {
		mockAction.flush();

		expect(autosaveAction.complete).to.be.true;

		__test.rlTick(COMPLETE_MESSAGE_DURATION);
		__test.flushMicrotasks();

		expect(autosaveAction.complete).to.be.false;
	}));
});
