import { Subject } from 'rxjs';
import { rlFakeAsync, rlTick } from 'rl-async-testing';

import { SmartDataSource, defaultDebounce } from './smartDataSource.service';

describe('SmartDataSource', () => {
	let source: SmartDataSource<any>;

	beforeEach(() => {
		source = new SmartDataSource(sinon.spy());
	});

	describe('init', () => {
		let initialRequestSpy: sinon.SinonSpy;
		let initRequestStream: Subject<any>;
		let toRequestStreamSpy: sinon.SinonSpy;
		let requestStream: Subject<any>;
		let getDataSetSpy: sinon.SinonSpy;
		let getDataStream: Subject<any>;
		let resolveReloadSpy: sinon.SinonSpy;
		let sortList$: any;

		beforeEach(() => {
			initRequestStream = new Subject();
			requestStream = new Subject();
			getDataStream = new Subject();
			initialRequestSpy = sinon.spy(() => initRequestStream);
			toRequestStreamSpy = sinon.spy(() => requestStream);
			getDataSetSpy = sinon.spy(() => getDataStream);
			resolveReloadSpy = sinon.spy();
			sortList$ = new Subject();

			source.initialRequest = initialRequestSpy;
			source.toRequestStream = toRequestStreamSpy;
			source.getDataSet = getDataSetSpy;
			source.resolveReload = resolveReloadSpy;
			source.sorter = <any>{ sortList$: sortList$ };
		});

		it('should make an initial request on init', () => {
			const requestData = {};
			const data = {};
			source.init();

			sinon.assert.calledOnce(initialRequestSpy);
			sinon.assert.calledWith(initialRequestSpy, (source as any).filters$, sortList$);

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
			source.loadingDataSet$.subscribe(loadingDataSetSpy);
			rawDataSetSpy.reset();
			loadingDataSetSpy.reset();

			source.startLoading();

			sinon.assert.calledOnce(rawDataSetSpy);
			sinon.assert.calledWith(rawDataSetSpy, null);
			sinon.assert.calledOnce(loadingDataSetSpy);
			sinon.assert.calledWith(loadingDataSetSpy, true);
		});
	});

	describe('resolveReload', () => {
		let throttledSpy;
		let loadingDataSetSpy;
		let rawDataSetSpy;
		let processSpy;
		let countSpy;
		let isEmptySpy;

		beforeEach(() => {
			throttledSpy = sinon.spy();
			loadingDataSetSpy = sinon.spy();
			rawDataSetSpy = sinon.spy();
			processSpy = sinon.spy();
			countSpy = sinon.spy();
			isEmptySpy = sinon.spy();

			source.throttled$.subscribe(throttledSpy);
			source.loadingDataSet$.subscribe(loadingDataSetSpy);
			source.rawDataSet$.subscribe(rawDataSetSpy);
			source.processData = processSpy;
			source.count$.subscribe(countSpy);
			(source as any)._isEmpty.subscribe(isEmptySpy);

			throttledSpy.reset();
			loadingDataSetSpy.reset();
			rawDataSetSpy.reset();
			countSpy.reset();
			isEmptySpy.reset();
		});

		it('should set the raw data set, loading, and isEmpty with the properties from the request', () => {
			const dataSet = [{}];
			const count = 5;
			const isEmpty = false;
			source.resolveReload({ dataSet, count, isEmpty });

			sinon.assert.calledOnce(rawDataSetSpy);
			sinon.assert.calledWith(rawDataSetSpy, dataSet);
			sinon.assert.calledOnce(countSpy);
			sinon.assert.calledWith(countSpy, count);
			sinon.assert.calledOnce(isEmptySpy);
			sinon.assert.calledWith(isEmptySpy, isEmpty);
		});

		it('should set loading to false of the data set is present', () => {
			source.resolveReload(<any>{ dataSet: [] });

			sinon.assert.calledOnce(loadingDataSetSpy);
			sinon.assert.calledWith(loadingDataSetSpy, false);
		});

		it('should set loading to true if the data set is null', () => {
			source.resolveReload(<any>{ dataSet: null });

			sinon.assert.calledOnce(loadingDataSetSpy);
			sinon.assert.calledWith(loadingDataSetSpy, true);
		});

		it('should process the data', () => {
			source.resolveReload(<any>{});
			sinon.assert.calledOnce(processSpy);
		});

		it('should set throttled to true if the count is greater than the data set length', () => {
			source.resolveReload(<any>{
				dataSet: [1, 2, 3],
				count: 5,
			});

			sinon.assert.calledOnce(throttledSpy);
			sinon.assert.calledWith(throttledSpy, true);
		});

		it('should set throttled to false if the count is equal to the data set length', () => {
			source.resolveReload(<any>{
				dataSet: [1, 2, 3],
				count: 3,
			});

			sinon.assert.calledOnce(throttledSpy);
			sinon.assert.calledWith(throttledSpy, false);
		});

		it('should set throttled to true data set is null', () => {
			source.resolveReload(<any>{ dataSet: null });

			sinon.assert.calledOnce(throttledSpy);
			sinon.assert.calledWith(throttledSpy, true);
		});
	});
});
