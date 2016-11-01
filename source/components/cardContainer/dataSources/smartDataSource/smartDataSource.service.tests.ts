import { Subject } from 'rxjs';
import { rlFakeAsync, rlTick } from 'rl-async-testing';

import { SmartDataSource, defaultDebounce } from './smartDataSource.service';

describe('SmartDataSource', () => {
	let source: SmartDataSource<any>;

	beforeEach(() => {
		source = new SmartDataSource(sinon.spy());
	});

	describe('init', () => {
		let toRequestStreamSpy: Sinon.SinonSpy;
		let initRequestStream: Subject<any>;
		let requestStream: Subject<any>;
		let getDataSetSpy: Sinon.SinonSpy;
		let getDataStream: Subject<any>;
		let resolveReloadSpy: Sinon.SinonSpy;
		let sortList$: any;

		beforeEach(() => {
			initRequestStream = new Subject();
			requestStream = new Subject();
			getDataStream = new Subject();
			toRequestStreamSpy = sinon.spy((...args) => args[3] ? initRequestStream : requestStream);
			getDataSetSpy = sinon.spy(() => getDataStream);
			resolveReloadSpy = sinon.spy();
			sortList$ = new Subject();

			source.toRequestStream = toRequestStreamSpy;
			source.getDataSet = getDataSetSpy;
			source.resolveReload = resolveReloadSpy;
			source.sorter = <any>{ sortList$: sortList$ };
		});

		it('should make an initial request on init', () => {
			const requestData = {};
			const data = {};
			source.init();

			sinon.assert.calledOnce(toRequestStreamSpy);
			sinon.assert.calledWith(toRequestStreamSpy, source.throttled$, (source as any).filters$, sortList$, true);

			initRequestStream.next(requestData);

			sinon.assert.calledOnce(getDataSetSpy);
			expect(getDataSetSpy.firstCall.args[0]).to.equal(requestData);

			getDataStream.next(data);

			sinon.assert.calledOnce(resolveReloadSpy);
			expect(resolveReloadSpy.firstCall.args[0]).to.equal(data);
		});

		it('should make a debounced request on subsequent request stream events', rlFakeAsync(() => {
			const requestData = {};
			const data = {};
			source.init();
			toRequestStreamSpy.reset();
			initRequestStream.next({});
			getDataStream.next({});
			getDataSetSpy.reset();
			resolveReloadSpy.reset();
			getDataStream = new Subject();

			sinon.assert.calledOnce(toRequestStreamSpy);
			sinon.assert.calledWith(toRequestStreamSpy, source.throttled$, (source as any).filters$, sortList$);

			requestStream.next(requestData);

			sinon.assert.notCalled(getDataSetSpy);

			rlTick(defaultDebounce);
			rlTick();

			sinon.assert.calledOnce(getDataSetSpy);
			expect(getDataSetSpy.firstCall.args[0]).to.equal(requestData);

			getDataStream.next(data);

			sinon.assert.calledOnce(resolveReloadSpy);
			expect(resolveReloadSpy.firstCall.args[0]).to.equal(data);
		}));
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

	describe('startLoading', () => {
		it('should clear the dataSet and rawDataSet and set loading to true', () => {
			const rawDataSetSpy = sinon.spy();
			const loadingDataSetSpy = sinon.spy();
			source.rawDataSet$.subscribe(rawDataSetSpy);
			source.loadingDataSet$.subscribe(rawDataSetSpy);

			source.startLoading();

			sinon.assert.calledOnce(rawDataSetSpy);
			sinon.assert.calledWith(rawDataSetSpy, null);
			sinon.assert.calledOnce(loadingDataSetSpy);
			sinon.assert.calledWith(loadingDataSetSpy, true);
		});
	});
});
