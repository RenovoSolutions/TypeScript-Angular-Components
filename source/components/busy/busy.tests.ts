import { Subject } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import IMockedPromise = services.test.IMockedPromise;
import mock = services.test.mock;
import fakeAsync = services.test.fakeAsync;

import { BusyComponent } from './busy';

describe('busy', () => {
	let busy: BusyComponent;

	beforeEach(() => {
		busy = new BusyComponent(true);
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

		it('should finish after an event is received', (): void => {
			stream.next(null);

			expect(busy.loading).to.be.false;
		});
	});
});
