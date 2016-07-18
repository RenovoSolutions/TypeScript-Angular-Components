import { services } from 'typescript-angular-utilities';
import __test = services.test;
import fakeAsync = __test.fakeAsync;

import { TypeaheadListComponent } from './typeaheadList';

interface ITestObject {
	id: number;
	prop?: number;
}

describe('TypeaheadListComponent', () => {
	let typeaheadList: TypeaheadListComponent<ITestObject>;
	let items: ITestObject[];
	let setValue: Sinon.SinonSpy;
	let getItemsMock: __test.IMockedRequest<ITestObject[]>;

	beforeEach(() => {
		const validator: any = {
			setValidators: sinon.spy(),
			validate: sinon.spy(),
			afterInit: sinon.spy(),
		};

		items = [
			{ id: 1, prop: 2 },
			{ id: 2, prop: 5 },
			{ id: 3, prop: 3 },
			{ id: 4, prop: 7 },
			{ id: 5, prop: 4 },
		];

		typeaheadList = new TypeaheadListComponent<ITestObject>(null, null, validator, null, null, null, null);

		getItemsMock = __test.mock.request(items);
		typeaheadList.getItems = getItemsMock;
		typeaheadList.clientSearch = true;

		setValue = sinon.spy();
		typeaheadList.setValue = setValue;
	});

	describe('loadItems', (): void => {
		it('should filter out items that are already selected', fakeAsync((): void => {
			const selections: ITestObject[] = [items[0], items[2]];
			typeaheadList.value = selections;

			typeaheadList.searchItems().subscribe((data: ITestObject[]): void => {
				expect(data).to.have.length(3);
				expect(data[0].id).to.equal(2);
				expect(data[1].id).to.equal(4);
				expect(data[2].id).to.equal(5);
			});

			getItemsMock.flush();
		}));

		it('should cache the results of the parent getItems function and apply searches aganst the cached data if useClientSearching is on', fakeAsync((): void => {
			getItemsMock = __test.mock.request(items);
			typeaheadList.getItems = getItemsMock;
			typeaheadList.searchItems('2');
			getItemsMock.flush();
			getItemsMock.reset();

			typeaheadList.searchItems('2');

			sinon.assert.notCalled(getItemsMock);
		}));

		it('should load the items when searching is disabled', fakeAsync((): void => {
			getItemsMock = __test.mock.request(items);
			typeaheadList.getItems = getItemsMock;
			typeaheadList.ngOnChanges(<any>{
				disableSearching: { currentValue: true },
			});

			sinon.assert.calledOnce(getItemsMock);

			getItemsMock.flush();

			expect(typeaheadList.cachedItems).to.not.be.empty;
		}));

		it('should load the items on init if searching is disabled', fakeAsync((): void => {
			getItemsMock = __test.mock.request(items);
			typeaheadList.getItems = getItemsMock;
			typeaheadList.disableSearching = true;
			typeaheadList.ngOnInit();

			sinon.assert.calledOnce(getItemsMock);

			getItemsMock.flush();

			expect(typeaheadList.cachedItems).to.not.be.empty;
		}));
	});

	describe('add', (): void => {
		it('should remove the item from the typeahead and add it to the list', fakeAsync((): void => {
			const list: ITestObject[] = [];
			typeaheadList.value = list;
			typeaheadList.searchItems('2');
			getItemsMock.flush();
			const addEventSpy: Sinon.SinonSpy = sinon.spy();
			typeaheadList.onAdd = addEventSpy;

			typeaheadList.add(items[0]);

			expect(list).to.have.length(1);
			expect(list[0].id).to.equal(1);
			expect(typeaheadList.cachedItems).to.have.length(4);
			sinon.assert.calledOnce(addEventSpy);
			expect(addEventSpy.firstCall.args[0].item.id).to.equal(1);
			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, list);
		}));
	});

	describe('remove', (): void => {
		it('should add the item back to the cached items and remove it from the list', fakeAsync((): void => {
			const list: ITestObject[] = [items[0]];
			typeaheadList.value = list;
			typeaheadList.searchItems('2');
			getItemsMock.flush();
			const removeEventSpy: Sinon.SinonSpy = sinon.spy();
			typeaheadList.onRemove = removeEventSpy;

			typeaheadList.remove(list[0]);

			expect(list).to.be.empty;
			expect(typeaheadList.cachedItems[4]).to.equal(items[0]);
			sinon.assert.calledOnce(removeEventSpy);
			expect(removeEventSpy.firstCall.args[0].item.id).to.equal(1);
			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, list);
		}));
	});
});
