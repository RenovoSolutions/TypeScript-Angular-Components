import { } from 'rxjs';

import { SmartDataSource } from './smartDataSource.service';

describe('SmartDataSource', () => {
	let source: SmartDataSource<any>;

	beforeEach(() => {
		source = new SmartDataSource(sinon.spy());
	});

	describe('filters', () => {
		it('should get the current value of the filters subject', () => {
			const filters = [{}];
			(source as any).filters$.next(filters);
			expect(source.filters).to.equal(filters);
		});

		it('should push the filters to the subject', () => {
			const filters: any[] = [{ type: 'type1' }];
			const nextSpy = sinon.spy();
			(source as any).filters$.next = nextSpy;

			source.filters = filters;

			sinon.assert.calledOnce(nextSpy);
			sinon.assert.calledWith(nextSpy, filters);
		});
	});
});
