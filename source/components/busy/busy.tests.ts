import { Subject, Observable } from 'rxjs';

import { BusyComponent } from './busy';

describe('busy', () => {
	let busy: BusyComponent;

	beforeEach(() => {
		busy = new BusyComponent(<any>{});
	});

	it('should not show the spinner after triggering if null', (): void => {
		busy.waitOn(null);
		expect(busy.loading).to.not.exist;
	});

	it('should show the spinner after triggering if true', (): void => {
		busy.waitOn(true);
		expect(busy.loading).to.be.true;
	});

	it('should hide the spinner after triggering if false', (): void => {
		busy.loading = true;
		busy.waitOn(false);
		expect(busy.loading).to.be.false;
	});

	describe('with observable', (): void => {
		let stream: Subject<void>;

		beforeEach((): void => {
			stream = new Subject<void>();

			busy.waitOn(stream).subscribe({ error: () => null });

			expect(busy.loading).to.be.true;
		});

		it('should finish after an event is received', (): void => {
			stream.next(null);

			expect(busy.loading).to.be.false;
		});

		it('should finish after an event errors', (): void => {
			stream.error(new Error('Error'));

			expect(busy.loading).to.be.false;
		});
	});

	describe('with observable on next', (): void => {
		let stream: Subject<void>;
		beforeEach(() => {
			stream = new Subject<void>();

			busy.waitOnObservableNext(stream).subscribe({ error: () => null });

			expect(busy.loading).to.be.true;
		});

		it('should finish after an event is received', (): void => {
			stream.next(null);

			expect(busy.loading).to.be.false;
		});

		it('should finish after an event errors', (): void => {
			stream.error(new Error('Error'));

			expect(busy.loading).to.be.false;
		});
	});

	describe('with observable on complete', (): void => {
		let stream: Subject<void>;
		beforeEach(() => {
			stream = new Subject<void>();

			busy.waitOnObservableCompletion(stream).subscribe({ error: () => null });

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
