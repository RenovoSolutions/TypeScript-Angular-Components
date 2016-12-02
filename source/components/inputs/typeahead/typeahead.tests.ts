import { Observable } from 'rxjs';
import { rlFakeAsync, mock, IMockedRequest, rlTick, flushMicrotasks } from 'rl-async-testing';

import { services } from 'typescript-angular-utilities';
import __transform = services.transform;
import __array = services.array;
import __object = services.object;
import __guid = services.guid;
import __search = services.search;

import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';

import { TypeaheadComponent, DEFAULT_SERVER_SEARCH_DEBOUNCE } from './typeahead';

interface ITransformMock {
	getValue: Sinon.SinonSpy;
}

interface ITestOption {
	value: string;
}

interface IBusyMock {
	waitOn: Sinon.SinonSpy;
}

describe('TypeaheadComponent', () => {
	let typeahead: TypeaheadComponent<any>;
	let setValue: Sinon.SinonSpy;
	let busy: IBusyMock;

	beforeEach(() => {
		const validator: any = {
			initValidator: sinon.spy(),
			validate: sinon.spy(() => Observable.empty()),
		};

		typeahead = new TypeaheadComponent(__transform.transform, null, validator, __object.objectUtility, __array.arrayUtility, __guid.guid, __search.searchUtility);

		setValue = sinon.spy();
		typeahead.setValue = setValue;

		busy = { waitOn: sinon.spy(x => x) };
		typeahead.busy = <any>busy;
		typeahead.list = <any>{
			open: sinon.spy(),
			close: sinon.spy(),
		};
	});

	it('should focus the input', () => {
		const element = { focus: sinon.spy() };
		typeahead.input = { nativeElement: element };

		typeahead.focus();

		sinon.assert.calledOnce(element.focus);
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

		it('should return an empty list if no text is entered', rlFakeAsync((): void => {
			let getItemsMock: IMockedRequest<string> = mock.request(items);
			typeahead.getItems = getItemsMock;
			let visibleItems: string[];
			typeahead.visibleItems$.subscribe(result => visibleItems = result);

			typeahead.refresh('');

			sinon.assert.notCalled(getItemsMock);
			expect(visibleItems).to.be.empty;

			getItemsMock.flush();
		}));

		it('should return the result of the getItems function if useClientSearching is off', rlFakeAsync((): void => {
			// simulate a server-side search
			let getItemsMock: IMockedRequest<string[]> = mock.request([items[0], items[1]]);
			typeahead.getItems = getItemsMock;
			let visibleItems: string[];
			typeahead.visibleItems$.subscribe(result => visibleItems = result);

			typeahead.refresh('Item ');

			sinon.assert.calledOnce(getItemsMock);
			sinon.assert.calledWith(getItemsMock, 'Item ');

			getItemsMock.flush();

			expect(visibleItems.length).to.equal(2);
			expect(visibleItems[0]).to.equal(items[0]);
			expect(visibleItems[1]).to.equal(items[1]);
		}));

		it('should apply the search string if useClientSearching is on', rlFakeAsync((): void => {
			typeahead.clientSearch = true;

			let getItemsMock: IMockedRequest<string[]> = mock.request(items);
			typeahead.getItems = getItemsMock;
			let visibleItems: string[];
			typeahead.visibleItems$.subscribe(result => visibleItems = result);

			typeahead.refresh('A');

			sinon.assert.calledOnce(getItemsMock);
			expect(getItemsMock.firstCall.args).to.be.empty;

			getItemsMock.flush();

			expect(visibleItems.length).to.equal(2);
			expect(visibleItems[0]).to.equal(items[2]);
			expect(visibleItems[1]).to.equal(items[3]);
		}));

		it('should cache the results of the parent getItems function and apply searches aganst the cached data if useClientSearching is on'
			, rlFakeAsync((): void => {
				typeahead.clientSearch = true;

				let getItemsMock: IMockedRequest<string> = mock.request(items);
				typeahead.getItems = getItemsMock;
				let visibleItems: string[];
				typeahead.visibleItems$.subscribe(result => visibleItems = result);
				typeahead.refresh('A');
				getItemsMock.flush();

				getItemsMock.reset();

				typeahead.refresh('2');

				flushMicrotasks();

				sinon.assert.notCalled(getItemsMock);

				expect(visibleItems.length).to.equal(1);
				expect(visibleItems[0]).to.equal(items[1]);
			}));

		it('should set the search value', (): void => {
			let getItemsMock: IMockedRequest<string> = mock.request(items);
			typeahead.getItems = getItemsMock;

			typeahead.refresh('A');

			expect(typeahead.search).to.equal('A');
		});
	});

	describe('external API', (): void => {
		it('should add the specified item to the cached item list', rlFakeAsync((): void => {
			typeahead.clientSearch = true;

			let items: string[] = [];
			let getItemsMock: IMockedRequest<string> = mock.request(items);
			typeahead.getItems = getItemsMock;
			typeahead.refresh('A');
			getItemsMock.flush();

			let newItem: string = 'New item';

			typeahead.add(newItem);

			expect(items.length).to.equal(1);
			expect(items[0]).to.equal(newItem);
		}));

		it('should remove the specified item from the cached items list', rlFakeAsync((): void => {
			typeahead.clientSearch = true;

			let items: string[] = ['Item 1'];
			let getItemsMock: IMockedRequest<string> = mock.request(items);
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

		it('should collapse if allowCollapse is turned on', rlFakeAsync((): void => {
			let selectSpy: Sinon.SinonSpy = sinon.spy();
			typeahead.select = <any>{ emit: selectSpy };
			typeahead.clientSearch = true;
			typeahead.allowCollapse = true;
			initialLoad();

			typeahead.selectItem(items[0]);

			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, items[0]);
			sinon.assert.calledOnce(selectSpy);
			sinon.assert.calledWith(selectSpy, items[0]);
			expect(typeahead.collapsed).to.be.true;
		}));

		it('should call the select function without collapsing', rlFakeAsync((): void => {
			let selectSpy: Sinon.SinonSpy = sinon.spy();
			typeahead.clientSearch = true;
			typeahead.select = <any>{ emit: selectSpy };
			initialLoad();

			typeahead.selectItem(items[0]);

			sinon.assert.notCalled(setValue);
			expect(typeahead.collapsed).to.be.false;
			sinon.assert.calledOnce(selectSpy);
			sinon.assert.calledWith(selectSpy, items[0]);
		}));

		it('should call create with the search text if the search option is selected', rlFakeAsync((): void => {
			let createSpy: Sinon.SinonSpy = sinon.spy(search => { return { value: search }; });
			typeahead.clientSearch = true;
			typeahead.allowCollapse = true;
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

		it('should clear the current selection', (): void => {
			typeahead.collapsed = true;
			const searchSpy = sinon.spy();
			typeahead.searchStream.subscribe(searchSpy);

			typeahead.clear();

			sinon.assert.calledOnce(setValue);
			sinon.assert.calledWith(setValue, null);
			expect(typeahead.collapsed).to.be.false;
			sinon.assert.calledOnce(searchSpy);
			sinon.assert.calledWith(searchSpy, '');
		});

		it('should clear the search value', (): void => {
			typeahead.search = 'search';

			typeahead.selectItem('item');

			expect(typeahead.search).to.be.empty;
		});

		function initialLoad() {
			let getItemsMock: IMockedRequest<string> = mock.request(items);
			typeahead.getItems = getItemsMock;

			typeahead.refresh('A');
			getItemsMock.flush();
		}
	});

	describe('canShowOptions', (): void => {
		it('should return false if loading', (): void => {
			typeahead.busy.loading = true;
			expect(typeahead.canShowOptions).to.be.false;
		});

		it('should return false if search is empty', (): void => {
			typeahead.search = '';
			expect(typeahead.canShowOptions).to.be.false;
		});

		it('should return true if not loading and a search is present', (): void => {
			typeahead.search = 'search';
			typeahead.busy.loading = false;
			expect(typeahead.canShowOptions).to.be.true;
		});
	});

	describe('ngOnChanges', (): void => {
		it('should collapse the typeahead on a value change if a value is specified and collapse is enabled', (): void => {
			typeahead.allowCollapse = true;
			typeahead.ngOnChanges({
				value: <any>{ currentValue: 'search' },
			});

			expect(typeahead.collapsed).to.be.true;
		});

		it('should uncollapse if the value changes to null', (): void => {
			typeahead.allowCollapse = true;
			typeahead.collapsed = true;
			typeahead.ngOnChanges({
				value: <any>{ currentValue: null },
			});

			expect(typeahead.collapsed).to.be.false;
		});
	});

	describe('searchStream', () => {
		let loadItems: IMockedRequest<string>;

		beforeEach(rlFakeAsync(() => {
			typeahead.ngOnInit();
			const items = ['item1', 'item2', 'item3'];
			loadItems = mock.request(items);
			let visibleItems;
			typeahead.getItems = loadItems;

			typeahead.searchStream.next('search');
			rlTick(DEFAULT_SERVER_SEARCH_DEBOUNCE);
			flushMicrotasks();
			typeahead.visibleItems$.subscribe(data => visibleItems = data);
			loadItems.flush();
			loadItems.reset();
			busy.waitOn.reset();

			expect(visibleItems).to.equal(items);
		}));

		it('should show a busy spinner while the debounce is pending', rlFakeAsync(() => {
			typeahead.searchStream.next('search2');

			sinon.assert.calledOnce(busy.waitOn);
			sinon.assert.calledWith(busy.waitOn, true);
			expect(typeahead.search).to.equal('search2');

			typeahead.searchStream.next('search');

			sinon.assert.calledTwice(busy.waitOn);
			sinon.assert.calledWith(busy.waitOn, true);
			expect(typeahead.search).to.equal('search');
			busy.waitOn.reset();

			rlTick(DEFAULT_SERVER_SEARCH_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.calledOnce(busy.waitOn);
			sinon.assert.calledWith(busy.waitOn, false);
			sinon.assert.notCalled(loadItems)
		}));

		it('should make a request to refresh the visible items', rlFakeAsync(() => {
			typeahead.searchStream.next('search2');

			busy.waitOn.reset();
			rlTick(DEFAULT_SERVER_SEARCH_DEBOUNCE);
			flushMicrotasks();

			sinon.assert.calledTwice(busy.waitOn);
			sinon.assert.calledOnce(loadItems);
			sinon.assert.calledWith(loadItems, 'search2');

			loadItems.flush();
		}));
	});
});
