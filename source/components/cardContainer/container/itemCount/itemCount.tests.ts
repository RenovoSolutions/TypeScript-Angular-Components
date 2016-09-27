import { ItemCountComponent } from './itemCount';

interface ICardContainerMock {
	dataSource: {
		loadingDataSet?: boolean;
		dataSet?: { length: number };
		count?: number;
	};
}

describe('ItemCountComponent', () => {
	let itemCount: ItemCountComponent<number>;
	let cardContainer: ICardContainerMock;

	beforeEach(() => {
		cardContainer = {
			dataSource: {},
		};
		itemCount = new ItemCountComponent<number>(<any>cardContainer);
	});

	it('should get the data source loading property', () => {
		cardContainer.dataSource.loadingDataSet = true;
		expect(itemCount.loadingDataSet).to.be.true;
	});

	it('should get the count of visible items', () => {
		cardContainer.dataSource.dataSet = [1, 2, 3];
		expect(itemCount.visibleCount).to.equal(3);
	});

	it('should get the total count from the data source', () => {
		cardContainer.dataSource.count = 5;
		expect(itemCount.totalCount).to.equal(5);
	});
});
