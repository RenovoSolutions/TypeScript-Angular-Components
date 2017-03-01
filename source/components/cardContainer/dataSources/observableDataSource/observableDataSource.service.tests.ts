import { Subject } from 'rxjs';

import { ObservableDataSource } from './observableDataSource.service';

describe('ObservableDataSource', () => {
	let dataSource: ObservableDataSource<any>;
	let stream: Subject<any>;
	let processSpy: sinon.SinonSpy;
	let loading: boolean;
	let rawDataSet: any[];
	let dataSet: any[];

	beforeEach(() => {
		stream = new Subject();
		dataSource = new ObservableDataSource<any>(stream);

		processSpy = sinon.spy();
		dataSource.processData = processSpy;
		dataSource.init();
		dataSource.loadingDataSet$.subscribe(result => loading = result);
		dataSource.rawDataSet$.subscribe(data => rawDataSet = data);
		dataSource.dataSet$.subscribe(data => dataSet = data);
	});

	describe('loading', (): void => {
		it('should call data processor to process the data when the data is received', (): void => {
			const data = [1, 2, 3];
			stream.next(data);

			sinon.assert.calledOnce(processSpy);
			expect(loading).to.be.false;
			expect(rawDataSet).to.deep.equal(data);
		});

		it('should be loading on init', (): void => {
			expect(loading).to.be.true;
			expect(rawDataSet).to.be.null;
			expect(dataSet).to.be.null;
		});

		it('should be loading if a null event is received on the stream', () => {
			stream.next([]);
			expect(loading).to.be.false;
			expect(rawDataSet).to.exist;

			stream.next(null);

			expect(loading).to.be.true;
			expect(rawDataSet).to.be.null;
		});
	});
});
