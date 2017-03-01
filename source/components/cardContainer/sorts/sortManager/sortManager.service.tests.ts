import { Observable } from 'rxjs';
import { find } from 'lodash';

import { SortManagerService, ISort, SortDirection } from './sortManager.service';
import { IColumn } from '../../column';

describe('SortManagerService', () => {
	let sortManager: SortManagerService;
	let getColumn: sinon.SinonSpy;
	let sorts: ISort[];
	let sortSpy: sinon.SinonSpy;

	beforeEach(() => {
		sortSpy = sinon.spy();
		const sorter: any = { sort: sortSpy };
		sortManager = new SortManagerService(sorter);
		getColumn = sinon.spy();
		sortManager.setup([], getColumn, 3);
		sortManager.sortList$.subscribe(value => sorts = value);
	});

	describe('sort', () => {
		it('should sort the data against the current sorts', () => {
			const data = [1, 2, 3];
			sortManager.updateSorts(<any>{});

			sortManager.sort(Observable.of(data)).subscribe();

			sinon.assert.calledOnce(sortSpy);
			sinon.assert.calledWith(sortSpy, data, sorts);
		});
	});

	describe('updateSorts', () => {
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
		});

		it('should limit to the max column size', () => {
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

		it('should toggle the first sort if the new sort is on the same column', () => {
			const column: any = {};
			const sort: any = { column };
			(sortManager as any)._sortList.next([sort]);
			const toggleSpy = sinon.spy(() => []);
			sortManager.toggleFirstSort = toggleSpy;

			sortManager.updateSorts(column);

			sinon.assert.calledOnce(toggleSpy);
		});

		it('should set the first sort if the new sort is on a different column', () => {
			const column: any = {};
			const otherColumn: any = {};
			const sort: any = { column };
			(sortManager as any)._sortList.next([sort]);
			const setFirstSpy = sinon.spy(() => []);
			sortManager.setFirstSort = setFirstSpy;

			sortManager.updateSorts(otherColumn);

			sinon.assert.calledOnce(setFirstSpy);
		});
	});

	describe('toggleFirstSort', () => {
		it('should change sort to descending if currently making an ascending sort on that column', () => {
			const column: any = {};
			let sort = {
				direction: SortDirection.ascending,
				column: column,
			};

			const newSorts = sortManager.toggleFirstSort(sort, false, [sort]);

			expect(newSorts).to.have.length(1);
			expect(newSorts[0].column).to.equal(column);
			expect(newSorts[0].direction).to.equal(SortDirection.descending);
		});

		it('should drop the sort from the list if currently making a descending sort on that column', () => {
			let sort: any = {
				direction: SortDirection.descending,
				column: {},
			};
			const otherColumn = {};
			const otherSort: any = { column: otherColumn };

			const newSorts = sortManager.toggleFirstSort(sort, false, [sort, otherSort]);

			expect(newSorts).to.have.length(1);
			expect(newSorts[0].column).to.equal(otherColumn);
		});

		it('should clear the list if currently making a descending sort on a column with secondary sorts', () => {
			let sort: any = {
				direction: SortDirection.descending,
				column: {},
			};
			const otherSort: any = {};

			const newSorts = sortManager.toggleFirstSort(sort, true, [sort, otherSort]);

			expect(newSorts).to.be.empty;
		});
	});

	describe('setFirstSort', () => {
		it('should add new columns to the front', () => {
			const newSortColumn = {};
			let previousSorts = [{}];

			const newSorts = sortManager.setFirstSort(<any>newSortColumn, <any>previousSorts);

			expect(newSorts).to.have.length(2);
			expect(newSorts[0].column).to.equal(newSortColumn);
			expect(newSorts[0].direction).to.equal(SortDirection.ascending);
		});

		it('should move the column to the front if already present in the sort list', () => {
			const newSortColumn = {};
			let previousSorts = [{}, { column: newSortColumn }];

			const newSorts = sortManager.setFirstSort(<any>newSortColumn, <any>previousSorts);

			expect(newSorts).to.have.length(2);
			expect(newSorts[0].column).to.equal(newSortColumn);
			expect(newSorts[0].direction).to.equal(SortDirection.ascending);
		});
	});
});
