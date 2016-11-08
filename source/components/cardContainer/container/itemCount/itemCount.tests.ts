import { BehaviorSubject } from 'rxjs';

import { ItemCountComponent } from './itemCount';

interface ICardContainerMock {
	dataSource: {
		loadingDataSet$: BehaviorSubject<boolean>;
		dataSet$: BehaviorSubject<{ length: number }>;
		count$: BehaviorSubject<number>;
	};
}

describe('ItemCountComponent', () => {
	let itemCount: ItemCountComponent<number>;
	let cardContainer: ICardContainerMock;

	beforeEach(() => {
		cardContainer = {
			dataSource: {
				loadingDataSet$: new BehaviorSubject(false),
				dataSet$: new BehaviorSubject({ length: 0 }),
				count$: new BehaviorSubject(0),
			},
		};
		itemCount = new ItemCountComponent<number>(<any>cardContainer);
	});

	it('should get the data source loading property', () => {
		let loadingDataSet;
		itemCount.loadingDataSet$.subscribe(result => loadingDataSet = result);
		cardContainer.dataSource.loadingDataSet$.next(true);
		expect(loadingDataSet).to.be.true;
	});

	it('should get the count of visible items', () => {
		let visibleCount;
		itemCount.visibleCount$.subscribe(result => visibleCount = result);
		cardContainer.dataSource.dataSet$.next([1, 2, 3]);
		expect(visibleCount).to.equal(3);
	});

	it('should get the total count from the data source', () => {
		let totalCount;
		itemCount.totalCount$.subscribe(result => totalCount = result);
		cardContainer.dataSource.count$.next(5);
		expect(totalCount).to.equal(5);
	});
});
