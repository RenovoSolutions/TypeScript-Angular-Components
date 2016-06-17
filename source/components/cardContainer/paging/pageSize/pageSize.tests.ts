import { PageSizeComponent, availablePageSizes } from './pageSize';

interface IPagerMock {
	pageSize: number;
}

describe('PageSizeComponent', (): void => {
	let pageSize: PageSizeComponent;

	it('should get the pager from the card container and set the defaults', (): void => {
		const pager: IPagerMock = { pageSize: null };
		const cardContainer: any = {
			dataSource: { pager	},
		};

		pageSize = new PageSizeComponent(cardContainer);

		expect(pageSize.pager).to.equal(pager);
		expect(pageSize.pageSizes).to.equal(availablePageSizes);
	});
});