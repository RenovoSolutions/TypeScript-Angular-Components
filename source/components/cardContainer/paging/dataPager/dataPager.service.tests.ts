import { Observable } from 'rxjs';

import { DataPager } from './dataPager.service';

describe('DataPager', () => {
	let dataPager: DataPager;

	beforeEach(() => {
		dataPager = new DataPager();
	});

	it('should restrict data set to page size', (): void => {
		let result: number[];
		(dataPager as any)._pageSize.next(2);

		dataPager.filter(Observable.of([1, 2, 3, 4])).subscribe(data => result = data);

		expect(result).to.have.length(2);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal(2);
	});

	it('should skip to indicated page', (): void => {
		let result: number[];
		(dataPager as any)._pageNumber.next(3);
		(dataPager as any)._pageSize.next(1);

		dataPager.filter(Observable.of([1, 2, 3, 4])).subscribe(data => result = data);

		expect(result).to.have.length(1);
		expect(result[0]).to.equal(3);
	});

	it('should be empty if page goes past the end', (): void => {
		let result: number[];
		(dataPager as any)._pageNumber.next(2);
		(dataPager as any)._pageSize.next(8);

		dataPager.filter(Observable.of([1, 2, 3, 4])).subscribe(data => result = data);

		expect(result).to.be.empty;
	});
});
