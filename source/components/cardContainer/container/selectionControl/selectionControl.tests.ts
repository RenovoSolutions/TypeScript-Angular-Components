import { BehaviorSubject } from 'rxjs';

import { SelectionComponent } from './selectionControl';

interface ICardContainerMock {
	numberSelected$: any;
	selectionData$: BehaviorSubject<any>;
	selectionFilteredData$: BehaviorSubject<any>;
	dataSource: { pager?: any };
	setSelected: Sinon.SinonSpy;
}

describe('SelectionComponent', () => {
	let selection: SelectionComponent<any>;
	let cardContainer: ICardContainerMock;

	beforeEach(() => {
		cardContainer = {
			numberSelected$: {},
			selectionData$: new BehaviorSubject(null),
			selectionFilteredData$: new BehaviorSubject(null),
			dataSource: {},
			setSelected: sinon.spy(),
		};

		selection = new SelectionComponent<any>(<any>cardContainer);
	});

	describe('pagingEnabled', (): void => {
		it('should set pagingEnabled to true if a pager exists on the card container', (): void => {
			cardContainer.dataSource.pager = {};
			selection.ngOnInit();
			expect(cardContainer.dataSource.pager).to.exist;
			expect(selection.pagingEnabled).to.be.true;
		});

		it('should set pagingEnabled to false if a pager does not exist on the card container', (): void => {
			selection.ngOnInit();
			expect(cardContainer.dataSource.pager).to.not.exist;
			expect(selection.pagingEnabled).to.be.false;
		});
	});

	it('should return the card container numberSelected stream', (): void => {
		selection.ngOnInit();
		expect(selection.selectedItems$).to.equal(cardContainer.numberSelected$);
	});

	describe('selection', (): void => {
		it('should select all items on the page', () => {
			const items = [1, 2, 3, 4];
			cardContainer.selectionData$.next(items);

			selection.selectPage();

			sinon.assert.calledOnce(cardContainer.setSelected);
			sinon.assert.calledWith(cardContainer.setSelected, items, true);
		});

		it('should select all items on all pages', () => {
			const items = [1, 2, 3, 4];
			cardContainer.selectionFilteredData$.next(items);

			selection.selectAll();

			sinon.assert.calledOnce(cardContainer.setSelected);
			sinon.assert.calledWith(cardContainer.setSelected, items, true);
		});

		it('should clear selection of all items on the page', () => {
			const items = [1, 2, 3, 4];
			cardContainer.selectionData$.next(items);

			selection.clearPage();

			sinon.assert.calledOnce(cardContainer.setSelected);
			sinon.assert.calledWith(cardContainer.setSelected, items, false);
		});

		it('should clear selection of all items on all pages', () => {
			const items = [1, 2, 3, 4];
			cardContainer.selectionFilteredData$.next(items);

			selection.clearAll();

			sinon.assert.calledOnce(cardContainer.setSelected);
			sinon.assert.calledWith(cardContainer.setSelected, items, false);
		});
	});
});
