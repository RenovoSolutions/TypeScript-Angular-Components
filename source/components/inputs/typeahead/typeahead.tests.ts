import { services } from 'typescript-angular-utilities';
import __test = services.test;
import mock = __test.mock;
import fakeAsync = __test.fakeAsync;
import flushMicrotasks = __test.flushMicrotasks;
import __object = services.object;
import __guid = services.guid;
import __search = services.search;

import { TypeaheadComponent } from './typeahead';

interface ITransformMock {
	getValue: Sinon.SinonSpy;
}

interface ITestOption {
	value: string;
}

interface IBusyMock {
	trigger: Sinon.SinonSpy;
}

describe('TypeaheadComponent', () => {
	let typeahead: TypeaheadComponent<any>;
	let setValue: Sinon.SinonSpy;
	let busy: IBusyMock;

	beforeEach(() => {
		const validator: any = {
			setValidators: sinon.spy(),
			validate: sinon.spy(),
			afterInit: sinon.spy(),
		};

		typeahead = new TypeaheadComponent<any>(null, null, validator, __object.objectUtility, null, __guid.guid, __search.searchUtility);

		setValue = sinon.spy();
		typeahead.setValue = setValue;

		busy = { trigger: sinon.spy() };
		typeahead.busy = <any>busy;
	});

	it('should collapse on init if allowCollapse is specified and a model value is present', (): void => {
		typeahead.allowCollapse = true;
		typeahead.value = 'Item';
		typeahead.ngOnInit();

		expect(typeahead.collapsed).to.be.true;
	});

	describe('loadItems', (): void => {
		let items: string[];

		beforeEach((): void => {
			items = ['Item 1', 'Item 2', 'Another item', 'A fourth item'];
		});

		it('should return an empty list if no text is entered', fakeAsync((): void => {
			let getItemsMock: __test.IMockedRequest<string> = mock.request(items);
			typeahead.getItems = getItemsMock;

			typeahead.refresh('');

			sinon.assert.notCalled(getItemsMock);
			expect(typeahead.visibleItems).to.be.empty;

			getItemsMock.flush();
		}));

		it('should return the result of the getItems function if useClientSearching is off', fakeAsync((): void => {
			// simulate a server-side search
			let getItemsMock: __test.IMockedRequest<string[]> = mock.request([[items[0], items[1]]]);
			typeahead.getItems = getItemsMock;

			typeahead.refresh('Item ');

			sinon.assert.calledOnce(getItemsMock);
			let searchArg: string = getItemsMock.firstCall.args[0];
			expect(searchArg).to.equal('Item ');

			getItemsMock.flush();

			expect(typeahead.visibleItems.length).to.equal(2);
			expect(typeahead.visibleItems[0]).to.equal(items[0]);
			expect(typeahead.visibleItems[1]).to.equal(items[1]);
		}));

		it('should apply the search string if useClientSearching is on', fakeAsync((): void => {
			typeahead.useClientSearching = true;

			let getItemsMock: __test.IMockedRequest<string[]> = mock.request(items);
			typeahead.getItems = getItemsMock;

			typeahead.refresh('A');

			sinon.assert.calledOnce(getItemsMock);
			expect(getItemsMock.firstCall.args).to.be.empty;

			getItemsMock.flush();

			expect(typeahead.visibleItems.length).to.equal(2);
			expect(typeahead.visibleItems[0]).to.equal(items[2]);
			expect(typeahead.visibleItems[1]).to.equal(items[3]);
		}));

		it('should cache the results of the parent getItems function and apply searches aganst the cached data if useClientSearching is on'
			, fakeAsync((): void => {
				typeahead.useClientSearching = true;

				let getItemsMock: __test.IMockedRequest<string> = mock.request(items);
				typeahead.getItems = getItemsMock;
				typeahead.refresh('A');
				getItemsMock.flush();

				getItemsMock.reset();

				typeahead.refresh('2');

				flushMicrotasks();

				sinon.assert.notCalled(getItemsMock);

				expect(typeahead.visibleItems.length).to.equal(1);
				expect(typeahead.visibleItems[0]).to.equal(items[1]);
			}));

		it('should add a special search option to the list if a create handler is provided and no match is found', fakeAsync((): void => {
			let createSpy: Sinon.SinonSpy = sinon.spy();
			typeahead.useClientSearching = true;
			typeahead.create = createSpy;

			let getItemsMock: __test.IMockedRequest<string> = mock.request(items);
			typeahead.getItems = getItemsMock;

			typeahead.refresh('A');

			getItemsMock.flush();

			expect(typeahead.visibleItems.length).to.equal(3);
			expect(typeahead.visibleItems[0].__isSearchOption).to.be.true;
			expect(typeahead.visibleItems[1]).to.equal(items[2]);
			expect(typeahead.visibleItems[2]).to.equal(items[3]);
		}));
	});

	describe('external API', (): void => {
		it('should add the specified item to the cached item list', fakeAsync((): void => {
			typeahead.useClientSearching = true;

			let items: string[] = [];
			let getItemsMock: __test.IMockedRequest<string> = mock.request(items);
			typeahead.getItems = getItemsMock;
			typeahead.refresh('A');
			getItemsMock.flush();

			let newItem: string = 'New item';

			typeahead.add(newItem);

			expect(items.length).to.equal(1);
			expect(items[0]).to.equal(newItem);
		}));

		it('should remove the specified item from the cached items list', fakeAsync((): void => {
			typeahead.useClientSearching = true;

			let items: string[] = ['Item 1'];
			let getItemsMock: __test.IMockedRequest<string> = mock.request(items);
			typeahead.getItems = getItemsMock;
			typeahead.refresh('I');
			getItemsMock.flush();

			typeahead.remove(items[0]);

			expect(items).to.be.empty;
		}));
	});

	describe('select', (): void => {
		let items: string[];

		beforeEach((): void => {
			items = ['Item 1', 'Item 2', 'Another item', 'A fourth item'];
		});

		it('should collapse if allowCollapse is turned on', fakeAsync((): void => {
			let selectSpy: Sinon.SinonSpy = sinon.spy();
			typeahead.select = <any>{ emit: selectSpy };
			typeahead.useClientSearching = true;
			typeahead.allowCollapse = true;
			initialLoad();

			typeahead.selectItem(items[0]);

			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, items[0]);
			sinon.assert.calledOnce(selectSpy);
			sinon.assert.calledWith(selectSpy, items[0]);
			expect(typeahead.collapsed).to.be.true;
		}));

		it('should call the select function without collapsing', fakeAsync((): void => {
			let selectSpy: Sinon.SinonSpy = sinon.spy();
			typeahead.useClientSearching = true;
			typeahead.select = <any>{ emit: selectSpy };
			initialLoad();

			typeahead.selectItem(items[0]);

			sinon.assert.notCalled(setValue);
			expect(typeahead.collapsed).to.be.false;
			sinon.assert.calledOnce(selectSpy);
			sinon.assert.calledWith(selectSpy, items[0]);
		}));

		it('should call create with the search text if the search option is selected', fakeAsync((): void => {
			let createSpy: Sinon.SinonSpy = sinon.spy(search => { return { value: search }; });
			typeahead.useClientSearching = true;
			typeahead.create = createSpy;
			initialLoad();

			typeahead.search = 'search';
			typeahead.selectCustom();

			sinon.assert.calledOnce(createSpy);
			sinon.assert.calledWith(createSpy, 'search');
			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, { value: 'search' });
			expect(typeahead.collapsed).to.be.true;
		}));

		function initialLoad() {
			let getItemsMock: __test.IMockedRequest<string> = mock.request(items);
			typeahead.getItems = getItemsMock;

			typeahead.refresh('A');
			getItemsMock.flush();
		}
	});
});
