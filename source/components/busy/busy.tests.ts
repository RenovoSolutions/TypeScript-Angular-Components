import { Subject, Observable } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import IMockedPromise = services.test.IMockedPromise;
import mock = services.test.mock;
import rlFakeAsync = services.test.rlFakeAsync;

import { BusyComponent } from './busy';
import { AsyncHelper } from '../../services/async/async.service';

describe('busy', () => {
	let busy: BusyComponent;

	beforeEach(() => {
		busy = new BusyComponent(<any>{}, new AsyncHelper());
	});

	it('should not show the spinner after triggering if null', (): void => {
		busy.trigger(null);
		expect(busy.loading).to.not.exist;
	});

	it('should show the spinner after triggering if true', (): void => {
		busy.trigger(true);
		expect(busy.loading).to.be.true;
	});

	it('should hide the spinner after triggering if false', (): void => {
		busy.loading = true;
		busy.trigger(false);
		expect(busy.loading).to.be.false;
	});

	describe('with observable', (): void => {
		let stream: Subject<void>;

		beforeEach((): void => {
			stream = new Subject<void>();

			busy.trigger(stream);

			expect(busy.loading).to.be.true;
		});

		it('should not finish after an event is received', (): void => {
			stream.next(null);

			expect(busy.loading).to.be.true;
		});

		it('should finish after an event is complete', (): void => {
			stream.complete();

			expect(busy.loading).to.be.false;
		});

		it('should finish after an event errors', (): void => {
			stream.error(new Error('Error'));

			expect(busy.loading).to.be.false;
		});
	});
});
