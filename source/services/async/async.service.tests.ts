import { Subject } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import IMockedPromise = services.test.IMockedPromise;
import mock = services.test.mock;
import rlFakeAsync = services.test.rlFakeAsync;

import { AsyncHelper } from './async.service';

describe('AsyncHelper', () => {
	let async: AsyncHelper;

	beforeEach(() => {
		async = new AsyncHelper();
	});

	it('should fire immediately after the action completes on a primitive', rlFakeAsync((): void => {
		let nullValue;
		let falseValue;
		let trueValue;

		async.waitAsObservable(null).subscribe((value) => nullValue = value);
		async.waitAsObservable(false).subscribe((value) => falseValue = value);
		async.waitAsObservable(true).subscribe((value) => trueValue = value);

		expect(nullValue).to.be.null;
		expect(falseValue).to.be.false;
		expect(trueValue).to.be.true;
	}));

	describe('with observable', (): void => {
		let nextValue: boolean;
		let stream: Subject<boolean>;

		beforeEach((): void => {
			stream = new Subject<boolean>();
			async.waitAsObservable(stream).subscribe(result => nextValue = result);
		});

		it('should finish after an event is received', (): void => {
			stream.next(true);
			expect(nextValue).to.be.true;
		});
	});
});
