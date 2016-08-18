import * as _ from 'lodash';
import { Subject } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import __array = services.array;

import { DataPager } from './paging/index';
import { SortManagerService } from './sorts/index';

import { SelectableCardContainerComponent	} from './selectableCardContainer';
import {
	IBreakpointSize,
	IColumn,
	CardComponent,
	sorts,
	builder as __builder,
} from './index';

interface IDataSourceMock {
	refresh: Sinon.SinonSpy;
	onSortChange?: Sinon.SinonSpy;
	pager?: IDataPagerMock;
	filters?: IFilterMock[];
	rawDataSet?: any[];
	dataSet?: any[];
	filteredDataSet?: any[];
	initPager: Sinon.SinonSpy;
	changed: Subject<void>;
	redrawing: Subject<void>;
}

interface IDataPagerMock {
	pageSize: number;
	pageNumber: number;
	filter: Sinon.SinonSpy;
}

interface IFilterMock {
	type: string;
	filter: Sinon.SinonSpy;
}

describe('SelectableCardContainerComponent', () => {
	let cardContainer: SelectableCardContainerComponent<any>;
	let builder: __builder.CardContainerBuilder;
	let mockedDataSource: IDataSourceMock;

	beforeEach(() => {
		cardContainer = new SelectableCardContainerComponent(__array.arrayUtility, new DataPager(), new SortManagerService());

		builder = new __builder.CardContainerBuilder(<any>{}, <any>{ init: sinon.spy() }, <any>{ init: sinon.spy() });
		cardContainer.builder = builder;

		mockedDataSource = buildMockedDataSource();
		cardContainer.dataSource = <any>mockedDataSource;
		builder._dataSource = <any>mockedDataSource;
	});

	let dataSource: IDataSourceMock;
	beforeEach((): void => {
		dataSource = buildMockedDataSource();
		dataSource.rawDataSet = [
			{ id: 0 },
			{ id: 1 },
		];

		builder._dataSource = <any>dataSource;
		builder.useSelection();
	});

	it('should add view data to all data items', (): void => {
		dataSource.redrawing.subscribe = sinon.spy();
		dataSource.changed.subscribe = sinon.spy();
		cardContainer.ngOnInit()

		expect(dataSource.rawDataSet).to.have.length(2);
		expect(dataSource.rawDataSet[0].viewData).to.exist;
		expect(dataSource.rawDataSet[1].viewData).to.exist;

		sinon.assert.calledOnce(<Sinon.SinonSpy>dataSource.redrawing.subscribe);
		sinon.assert.calledOnce(<Sinon.SinonSpy>dataSource.changed.subscribe);
	});

	it('should add view data to new items when changed is fire', (): void => {
		cardContainer.ngOnInit()

		dataSource.rawDataSet.push({ id: 3 });

		expect(dataSource.rawDataSet).to.have.length(3);
		expect(dataSource.rawDataSet[0].viewData).to.exist;
		expect(dataSource.rawDataSet[1].viewData).to.exist;
		expect(dataSource.rawDataSet[2].viewData).to.not.exist;

		dataSource.changed.next(null);

		expect(dataSource.rawDataSet[2].viewData).to.exist;
	});

	it('should update count of selected items when selection changes', (): void => {
		dataSource.rawDataSet = [
			{ id: 0 },
			{ id: 1 },
		];
		dataSource.dataSet = dataSource.rawDataSet;
		dataSource.filteredDataSet = dataSource.rawDataSet;
		cardContainer.ngOnInit()
		const numberSelectedSpy: Sinon.SinonSpy = sinon.spy();
		cardContainer.numberSelectedChanges.subscribe(numberSelectedSpy);

		_.each(dataSource.dataSet, (item: any): void => {
			item.viewData.selected = true;
		});

		expect(cardContainer.numberSelected).to.equal(0);

		cardContainer.selectionChanged.next(null);

		sinon.assert.calledOnce(numberSelectedSpy);
		expect(cardContainer.numberSelected).to.equal(2);

		_.each(dataSource.dataSet, (item: any): void => {
			item.viewData.selected = false;
		});

		expect(cardContainer.numberSelected).to.equal(2);

		cardContainer.selectionChanged.next(null);

		sinon.assert.calledTwice(numberSelectedSpy);
		expect(cardContainer.numberSelected).to.equal(0);
	});

	it('should clear selected items that are not in the filtered data set when collection is redrawn', (): void => {
		dataSource.rawDataSet = [
			{ id: 0 },
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		];
		dataSource.dataSet = _.clone(dataSource.rawDataSet);
		dataSource.filteredDataSet = dataSource.dataSet;
		cardContainer.ngOnInit()

		_.each(dataSource.dataSet, (item: any): void => {
			item.viewData.selected = true;
		});

		dataSource.redrawing.next(null);

		expect(cardContainer.numberSelected).to.equal(4);

		dataSource.dataSet.pop();
		dataSource.dataSet.pop();
		dataSource.filteredDataSet = dataSource.dataSet;

		dataSource.redrawing.next(null);

		expect(cardContainer.numberSelected).to.equal(2);
	});

	it('should apply a sort in the select column', (): void => {
		cardContainer.ngOnInit()

		cardContainer.sortSelected();

		expect(cardContainer.dataSource.sorts).to.have.length(1);
		expect(cardContainer.dataSource.sorts[0].column).to.equal(cardContainer.selectionColumn);
		expect(cardContainer.dataSource.sorts[0].direction).to.equal(sorts.SortDirection.ascending);
	});

	it('should allow individual items to disable selection if a disable selection function is provided', (): void => {
		builder.disableSelection = (): string => {
			return 'disabled';
		};
		dataSource.rawDataSet = [
			{ id: 0 },
			{ id: 1 },
		];
		dataSource.dataSet = _.clone(dataSource.rawDataSet);
		dataSource.filteredDataSet = dataSource.dataSet;
		cardContainer.ngOnInit()

		expect(dataSource.rawDataSet[0].viewData.disabledSelection).to.be.true;
		expect(dataSource.rawDataSet[0].viewData.selectionTitle).to.equal('disabled');
		expect(dataSource.rawDataSet[1].viewData.disabledSelection).to.be.true;
		expect(dataSource.rawDataSet[1].viewData.selectionTitle).to.equal('disabled');
	});

	it('should allow items to enable selection via a disable selection function if disable reason is null', (): void => {
		builder.disableSelection = (): string => {
			return null;
		};
		dataSource.rawDataSet = [
			{ id: 0 },
			{ id: 1 },
		];
		dataSource.dataSet = _.clone(dataSource.rawDataSet);
		dataSource.filteredDataSet = dataSource.dataSet;
		cardContainer.ngOnInit()

		expect(dataSource.rawDataSet[0].viewData.disabledSelection).to.be.false;
		expect(dataSource.rawDataSet[1].viewData.disabledSelection).to.be.false;
	});

	function buildMockedDataSource(): IDataSourceMock {
		return <any>{
			refresh: sinon.spy(),
			onSortChange: sinon.spy(),
			initPager: sinon.spy(),
			changed: new Subject<void>(),
			redrawing: new Subject<void>(),
		};
	}
});
