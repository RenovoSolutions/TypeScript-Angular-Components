import { BehaviorSubject } from 'rxjs';

import { DataPager } from './paging/index';
import { SortManagerService } from './sorts/index';

import { SelectableCardContainerComponent	} from './selectableCardContainer';

interface IDataSourceMock {
	dataSet$: BehaviorSubject<any>;
	filteredDataSet$: BehaviorSubject<any>;
	init: sinon.SinonSpy;
}

describe('SelectableCardContainerComponent', () => {
	let cardContainer: SelectableCardContainerComponent<any>;
	let dataSource: IDataSourceMock;

	beforeEach(() => {
		cardContainer = new SelectableCardContainerComponent(new DataPager(), <any>{}, new SortManagerService(<any>{}));

		cardContainer.builder = <any>{};

		dataSource = buildMockedDataSource();
		cardContainer.dataSource = <any>dataSource;
		cardContainer.builder.dataSource = <any>dataSource;
	});

	function buildMockedDataSource(): IDataSourceMock {
		return <any>{
			init: sinon.spy(),
			filteredDataSet$: new BehaviorSubject<void>(null),
			dataSet$: new BehaviorSubject<void>(null),
		};
	}

	it('should update count of selected items when selection changes', (): void => {
		cardContainer.ngOnInit()
		let numberSelected;
		cardContainer.numberSelected$.subscribe(result => numberSelected = result);

		(cardContainer as any)._selectionFilteredData.next([{}, {}]);

		expect(numberSelected).to.equal(0);

		(cardContainer as any)._selectionFilteredData.next([{ selected: true }, { selected: true }]);

		expect(numberSelected).to.equal(2);
	});

	describe('selectionFilteredData$', () => {
		it('should wrap each item in the filtered data set in a selection object', () => {
			cardContainer.ngOnInit()
			let selectionData;
			const data = [1, 2];
			cardContainer.selectionFilteredData$.subscribe(result => selectionData = result);
			dataSource.filteredDataSet$.next(data);

			expect(selectionData[0].item).to.equal(data[0]);
			expect(selectionData[0].selected).to.be.false;
			expect(selectionData[1].item).to.equal(data[1]);
			expect(selectionData[1].selected).to.be.false;
		});

		it('should keep existing selection data if the id matches', () => {
			cardContainer.ngOnInit();
			const item = { id: 11 };
			const existingSelection = { item, selected: true };
			(cardContainer as any)._selectionFilteredData.next([existingSelection]);
			let selectionData;
			const data = [item, {}];
			cardContainer.selectionFilteredData$.subscribe(result => selectionData = result);
			dataSource.filteredDataSet$.next(data);

			expect(selectionData[0].item).to.equal(data[0]);
			expect(selectionData[0].selected).to.be.true;
			expect(selectionData[1].item).to.equal(data[1]);
			expect(selectionData[1].selected).to.be.false;
		});
	});

	describe('selectionData$', () => {
		it('should filter to only the selections that have items in the data set', () => {
			cardContainer.ngOnInit();
			const item = { id: 11 };
			const selectionInDataSet = { item: item };
			const otherSelection = { item: {} };
			(cardContainer as any)._selectionFilteredData.next([selectionInDataSet, otherSelection]);
			let selectionData;
			const data = [item];
			cardContainer.selectionData$.subscribe(result => selectionData = result);
			dataSource.dataSet$.next(data);

			expect(selectionData).to.have.length(1);
			expect(selectionData[0]).to.equal(selectionInDataSet);
		});
	});

	describe('selectionColumn', () => {
		it('should get the selected property of the selection for the specified item', () => {
			cardContainer.ngOnInit();
			const item = { id: 11 };
			const selection = { item: item, selected: true };
			(cardContainer as any)._selectionFilteredData.next([selection]);

			const value = (cardContainer.selectionColumn.getValue as any)(item);

			expect(value).to.be.true;
		});
	});

	describe('sortSelected', () => {
		it('should apply a sort in the select column', (): void => {
			const sortSpy = sinon.spy();
			cardContainer.selectionColumn = <any>{};
			cardContainer.sort = sortSpy;

			cardContainer.sortSelected();

			sinon.assert.calledOnce(sortSpy);
			expect(sortSpy.firstCall.args[0]).to.equal(cardContainer.selectionColumn);
		});
	});

	describe('setSelected', () => {
		it('should set selection to true for the specified items', () => {
			cardContainer.ngOnInit()
			let selectionData;
			const data = [{ id: 1 }, { id: 2 }];
			cardContainer.selectionFilteredData$.subscribe(result => selectionData = result);
			dataSource.filteredDataSet$.next(data);

			cardContainer.setSelected([selectionData[0]], true);

			expect(selectionData[0].selected).to.be.true;
			expect(selectionData[1].selected).to.be.false;
		});

		it('should set selection to false for the specified items', () => {
			cardContainer.ngOnInit()
			let selectionData;
			const data = [{ id: 1 }, { id: 2 }];
			cardContainer.selectionFilteredData$.subscribe(result => selectionData = result);
			dataSource.filteredDataSet$.next(data);
			selectionData[0].selected = true;
			selectionData[1].selected = true;

			cardContainer.setSelected([selectionData[0]], false);

			expect(selectionData[0].selected).to.be.false;
			expect(selectionData[1].selected).to.be.true;
		});
	});

	describe('disabledSelection', () => {
		it('should allow individual items to disable selection if a disable selection function is provided', (): void => {
			cardContainer.ngOnInit()
			cardContainer.disableSelection = () => 'disabled';
			let selectionData;
			const data = [1, 2];
			cardContainer.selectionFilteredData$.subscribe(result => selectionData = result);
			dataSource.filteredDataSet$.next(data);

			expect(selectionData[0].item).to.equal(data[0]);
			expect(selectionData[0].disabledSelection).to.be.true;
			expect(selectionData[0].selectionTitle).to.equal('disabled');
			expect(selectionData[1].item).to.equal(data[1]);
			expect(selectionData[1].disabledSelection).to.be.true;
			expect(selectionData[1].selectionTitle).to.equal('disabled');
		});

		it('should allow items to enable selection via a disable selection function if disable reason is null', (): void => {
			cardContainer.ngOnInit()
			cardContainer.disableSelection = () => null;
			let selectionData;
			const data = [1, 2];
			cardContainer.selectionFilteredData$.subscribe(result => selectionData = result);
			dataSource.filteredDataSet$.next(data);

			expect(selectionData[0].item).to.equal(data[0]);
			expect(selectionData[0].disabledSelection).to.be.false;
			expect(selectionData[1].item).to.equal(data[1]);
			expect(selectionData[1].disabledSelection).to.be.false;
		});
	});
});
