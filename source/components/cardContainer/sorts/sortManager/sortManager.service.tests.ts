import { find } from 'lodash';

import { SortManagerService, ISort, SortDirection } from './sortManager.service';
import { IColumn } from '../../column';

describe('SortManagerService', () => {
	let sortManager: SortManagerService;
	let getColumn: Sinon.SinonSpy;
	let sorts: ISort[];
	let sortSpy: Sinon.SinonSpy;

	beforeEach(() => {
		sortManager = new SortManagerService();
		getColumn = sinon.spy();
		sortManager.setup([], getColumn, 3);
		sortManager.sortList$.subscribe(value => sorts = value);
		sortSpy = sinon.spy();
		sortManager.sortChange$.subscribe(sortSpy);
	});

	it('should add new columns to the front and bump off sorts when greater tham max sorts', (): void => {
		let columns: IColumn<any>[] = <any>[
			{
				label: 'col1',
				size: {},
			},
			{
				label: 'col2',
				size: {},
			},
			{
				label: 'col3',
				size: {},
			},
		];
		sortManager.maxColumnSorts = 2;

		sortManager.updateSorts(columns[0]);

		expect(sorts).to.have.length(1);
		expect(sorts[0].direction).to.equal(SortDirection.ascending);
		expect(sorts[0].column).to.equal(columns[0]);
		expect(columns[0].sortDirection).to.equal(SortDirection.ascending);

		sortManager.updateSorts(columns[1]);

		expect(sorts).to.have.length(2);
		expect(sorts[0].direction).to.equal(SortDirection.ascending);
		expect(sorts[0].column).to.equal(columns[1]);
		expect(sorts[1].direction).to.equal(SortDirection.ascending);
		expect(sorts[1].column).to.equal(columns[0]);
		expect(columns[1].sortDirection).to.equal(SortDirection.ascending);
		expect(columns[0].sortDirection).to.be.null;

		sortManager.updateSorts(columns[2]);

		expect(sorts).to.have.length(2);
		expect(sorts[0].direction).to.equal(SortDirection.ascending);
		expect(sorts[0].column).to.equal(columns[2]);
		expect(sorts[1].direction).to.equal(SortDirection.ascending);
		expect(sorts[1].column).to.equal(columns[1]);
		expect(columns[2].sortDirection).to.equal(SortDirection.ascending);
		expect(columns[1].sortDirection).to.be.null;
		expect(columns[0].sortDirection).to.be.null;

		sinon.assert.calledThrice(sortSpy);
	});

	it('should change sort direction if specified column is already at the front of the sort', (): void => {
		let columns: IColumn<any>[] = <any>[
			{
				label: 'col1',
				size: {},
			},
			{
				label: 'col2',
				size: {},
			},
		];

		sortManager.updateSorts(columns[1]);
		sortManager.updateSorts(columns[0]);

		expect(sorts).to.have.length(2);
		expect(sorts[0].direction).to.equal(SortDirection.ascending);
		expect(sorts[0].column).to.equal(columns[0]);
		expect(columns[0].sortDirection).to.equal(SortDirection.ascending);

		sortManager.updateSorts(columns[0]);

		expect(sorts).to.have.length(2);
		expect(sorts[0].direction).to.equal(SortDirection.descending);
		expect(sorts[0].column).to.equal(columns[0]);
		expect(columns[0].sortDirection).to.equal(SortDirection.descending);

		sortManager.updateSorts(columns[0]);

		expect(sorts).to.have.length(1);
		expect(sorts[0].direction).to.equal(SortDirection.ascending);
		expect(sorts[0].column).to.equal(columns[1]);
		expect(columns[0].sortDirection).to.be.null;

		sinon.assert.callCount(sortSpy, 4);
	});

	it('should replace all sorts with columns secondary sorts if present', (): void => {
		let columnWithSecondarySorts: IColumn<any> = <any>{
			label: 'colWithSecondary',
			size: {},
			secondarySorts: {
				ascending: [
					{
						column: 'secondarySortCol',
						direction: SortDirection.descending,
					},
				],
				descending: [
					{
						column: 'secondarySortCol',
						direction: SortDirection.ascending,
					},
				],
			},
		};
		let secondarySortColumn: IColumn<any> = <any>{
			label: 'secondarySortCol',
			size: {},
		};
		let colWithoutSecondary1: IColumn<any> = <any>{
			label: 'colWithoutSecondary1',
			size: {},
		};
		let colWithoutSecondary2: IColumn<any> = <any>{
			label: 'colWithoutSecondary2',
			size: {},
		};
		sortManager.getColumn = name => {
			return find([columnWithSecondarySorts, secondarySortColumn, colWithoutSecondary1, colWithoutSecondary2]
						, column => column.label === name);
		};

		sortManager.updateSorts(colWithoutSecondary1);
		sortManager.updateSorts(colWithoutSecondary2);

		sortManager.updateSorts(columnWithSecondarySorts);

		expect(sorts).to.have.length(2);
		expect(sorts[0].column).to.equal(columnWithSecondarySorts);
		expect(sorts[0].direction).to.equal(SortDirection.ascending);
		expect(sorts[1].column).to.equal(secondarySortColumn);
		expect(sorts[1].direction).to.equal(SortDirection.descending);

		sortManager.updateSorts(columnWithSecondarySorts);

		expect(sorts).to.have.length(2);
		expect(sorts[0].column).to.equal(columnWithSecondarySorts);
		expect(sorts[0].direction).to.equal(SortDirection.descending);
		expect(sorts[1].column).to.equal(secondarySortColumn);
		expect(sorts[1].direction).to.equal(SortDirection.ascending);

		sortManager.updateSorts(columnWithSecondarySorts);

		expect(sorts).to.be.empty;

		sinon.assert.callCount(sortSpy, 5);
	});

	it('should override the default max column size', (): void => {
		sortManager.maxColumnSorts = 1;
		let columns: IColumn<any>[] = <any>[
			{
				label: 'col1',
				size: {},
			},
			{
				label: 'col2',
				size: {},
			},
		];

		sortManager.updateSorts(columns[0]);
		sortManager.updateSorts(columns[1]);

		expect(sorts).to.have.length(1);
		expect(sorts[0].column).to.equal(columns[1]);
		expect(sorts[0].direction).to.equal(SortDirection.ascending);
	});
});
