import { Subject } from 'rxjs';
import { each, take } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;

import { SelectionComponent } from './selectionControl';

interface IItemMock {
	viewData: ISelectionViewData;
}

interface ISelectionViewData {
	selected: boolean;
}

interface ICardContainerMock {
	numberSelected: number;
	numberSelectedChanges: Subject<number>;
	dataSource: any;
	selectionChanged: IEventEmitterMock;
}

interface IEventEmitterMock {
	emit: Sinon.SinonSpy;
}

describe('SelectionComponent', () => {
	let selection: SelectionComponent<IItemMock>;
	let cardContainer: ICardContainerMock;
	let items: IItemMock[];

	beforeEach(() => {
		cardContainer = {
			numberSelected: 0,
			numberSelectedChanges: new Subject<number>(),
			dataSource: {
				pager: null,
			},
			selectionChanged: { emit: sinon.spy() },
		};

		selection = new SelectionComponent<IItemMock>(<any>cardContainer, new __boolean.BooleanUtility());
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

	it('should update the selectedItems when the cardContainer numberSelected changes', (): void => {
		selection.ngOnInit();

		cardContainer.numberSelectedChanges.next(2);

		expect(selection.selectedItems).to.equal(2);

		cardContainer.numberSelectedChanges.next(4);

		expect(selection.selectedItems).to.equal(4);
	});

	describe('selection', (): void => {
		beforeEach(() => {
			items = [
				{
					viewData: {
						selected: false,
					},
				},
				{
					viewData: {
						selected: false,
					},
				},
				{
					viewData: {
						selected: false,
					},
				},
				{
					viewData: {
						selected: false,
					},
				},
			];

			cardContainer.dataSource = {
				dataSet: take(items, 2),
				filteredDataSet: items,
			};

			selection.ngOnInit();
		});

		it('should select all items on the page', (): void => {
			selection.selectPage();

			expect(items[0].viewData.selected).to.be.true;
			expect(items[1].viewData.selected).to.be.true;
			expect(items[2].viewData.selected).to.be.false;
			expect(items[3].viewData.selected).to.be.false;
		});

		it('should select all items on all pages', (): void => {
			selection.selectAll();

			expect(items[0].viewData.selected).to.be.true;
			expect(items[1].viewData.selected).to.be.true;
			expect(items[2].viewData.selected).to.be.true;
			expect(items[3].viewData.selected).to.be.true;
		});

		it('should clear selection of all items on the page', (): void => {
			setAllSelected(items);

			selection.clearPage();

			expect(items[0].viewData.selected).to.be.false;
			expect(items[1].viewData.selected).to.be.false;
			expect(items[2].viewData.selected).to.be.true;
			expect(items[3].viewData.selected).to.be.true;
		});

		it('should clear selection of all items on all pages', (): void => {
			setAllSelected(items);

			selection.clearAll();

			expect(items[0].viewData.selected).to.be.false;
			expect(items[1].viewData.selected).to.be.false;
			expect(items[2].viewData.selected).to.be.false;
			expect(items[3].viewData.selected).to.be.false;
		});
	});

	function setAllSelected(items: IItemMock[]): void {
		each(items, (item: IItemMock): void => { item.viewData.selected = true; });
	}
});
