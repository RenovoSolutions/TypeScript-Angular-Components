import { provide } from '@angular/core';
import { addProviders, inject } from '@angular/core/testing';

import { services } from 'typescript-angular-utilities';
import __test = services.test;
import fakeAsync = __test.fakeAsync;

import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';

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

		addProviders([
			TypeaheadListComponent,
			provide(ComponentValidator, { useValue: validator }),
			services.UTILITY_PROVIDERS,
		]);

		inject([TypeaheadListComponent], (_typeaheadList) => {
			typeaheadList = _typeaheadList;
		})();

		getItemsMock = __test.mock.request(items);
		typeaheadList.getItems = getItemsMock;
		typeaheadList.clientSearch = true;

		setValue = sinon.spy(value => typeaheadList.value = value);
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
			typeaheadList.searchItems('2').subscribe(() => null);
			getItemsMock.flush();
			getItemsMock.reset();

			typeaheadList.searchItems('2').subscribe(() => null);

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

			expect(typeaheadList.cachedItemsArray).to.not.be.empty;
		}));

		it('should load the items on init if searching is disabled', fakeAsync((): void => {
			getItemsMock = __test.mock.request(items);
			typeaheadList.getItems = getItemsMock;
			typeaheadList.disableSearching = true;
			typeaheadList.ngOnInit();

			sinon.assert.calledOnce(getItemsMock);

			getItemsMock.flush();

			expect(typeaheadList.cachedItemsArray).to.not.be.empty;
		}));
	});

	describe('add', (): void => {
		it('should remove the item from the typeahead and add it to the list', fakeAsync((): void => {
			const list: ITestObject[] = [];
			typeaheadList.value = list;
			typeaheadList.searchItems('2').subscribe(() => null);
			getItemsMock.flush();
			const onAddSpy: Sinon.SinonSpy = sinon.spy();
			typeaheadList.onAdd = onAddSpy;

			typeaheadList.add(items[0]);

			expect(typeaheadList.value).to.have.length(1);
			expect(typeaheadList.value[0].id).to.equal(1);
			expect(typeaheadList.cachedItemsArray).to.have.length(4);
			sinon.assert.calledOnce(onAddSpy);
			expect(onAddSpy.firstCall.args[0].id).to.equal(1);
			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, typeaheadList.value);
		}));

		it('should wait on the result if the onAdd handler returns a value', fakeAsync((): void => {
			const list: ITestObject[] = [];
			typeaheadList.value = list;
			typeaheadList.searchItems('2').subscribe(() => null);
			getItemsMock.flush();
			const newItem = {};
			const onAddMock: __test.IMockedRequest<ITestObject> = __test.mock.request(newItem);
			typeaheadList.onAdd = onAddMock;

			typeaheadList.add(items[0]);

			sinon.assert.notCalled(setValue);
			expect(typeaheadList.value).to.be.empty;

			onAddMock.flush();

			expect(typeaheadList.value).to.have.length(1);
			expect(typeaheadList.value[0]).to.equal(newItem);
			expect(typeaheadList.cachedItemsArray).to.have.length(4);
			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, typeaheadList.value);
		}));
	});

	describe('remove', (): void => {
		it('should add the item back to the cached items and remove it from the list', fakeAsync((): void => {
			const list: ITestObject[] = [items[0]];
			typeaheadList.value = list;
			typeaheadList.searchItems('2').subscribe(() => null);
			getItemsMock.flush();
			const onRemoveSpy: Sinon.SinonSpy = sinon.spy();
			typeaheadList.onRemove = onRemoveSpy;

			typeaheadList.remove(list[0]);

			expect(typeaheadList.value).to.be.empty;
			expect(typeaheadList.cachedItemsArray[4]).to.equal(items[0]);
			sinon.assert.calledOnce(onRemoveSpy);
			expect(onRemoveSpy.firstCall.args[0].id).to.equal(1);
			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, typeaheadList.value);
		}));

		it('should wait on the result if the onRemove handler returns a value', fakeAsync((): void => {
			const list: ITestObject[] = [items[0]];
			typeaheadList.value = list;
			typeaheadList.searchItems('2').subscribe(() => null);
			getItemsMock.flush();
			const onRemoveMock: __test.IMockedRequest<void> = __test.mock.request();
			typeaheadList.onRemove = onRemoveMock;

			typeaheadList.remove(list[0]);

			sinon.assert.notCalled(setValue);
			expect(typeaheadList.value).to.not.be.empty;

			onRemoveMock.flush();

			expect(typeaheadList.value).to.be.empty;
			expect(typeaheadList.cachedItemsArray[4]).to.equal(items[0]);
			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, typeaheadList.value);
		}));
	});
});
