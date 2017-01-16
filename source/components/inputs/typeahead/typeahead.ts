import { Component, Input, Output, EventEmitter, Optional, OnInit, OnChanges, SimpleChange, ViewChild, ContentChild, TemplateRef, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { find, filter, isEqual, cloneDeep } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;
import __transform = services.transform;
import __search = services.search;

import { ValidatedInputComponent, validationInputs, baseOutputs } from '../validationInput';
import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';
import { FormComponent } from '../../form/form';
import { BusyComponent } from '../../busy/busy';
import { POPOUT_LIST_PROVIDERS, PopoutListComponent } from '../../popoutList/index';

import { baseAnimations } from '../input';

export const DEFAULT_SERVER_SEARCH_DEBOUNCE: number = 500;
export const DEFAULT_CLIENT_SEARCH_DEBOUNCE: number = 100;

export interface ITypeaheadChanges {
	value: SimpleChange;
	[key: string]: SimpleChange;
}

@Component({
	selector: 'rlTypeahead',
	template: require('./typeahead.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator, POPOUT_LIST_PROVIDERS],
	animations: baseAnimations,
})
export class TypeaheadComponent<T> extends ValidatedInputComponent<T> implements OnInit, OnChanges {
	@Input() transform: __transform.ITransform<T, string>;
	@Input() getItems: { (search?: string): Promise<T[]> | Observable<T[]> };
	@Input() prefix: string;
	@Input() clientSearch: boolean;
	@Input() allowCollapse: boolean;
	@Input() create: { (value: string): T };
	@Input() caseSensitiveSearching: boolean;
	@Output() selector: EventEmitter<T> = new EventEmitter<T>();


	@ViewChild('input') input: ElementRef;
	@ViewChild(BusyComponent) busy: BusyComponent;
	@ViewChild(PopoutListComponent) list: PopoutListComponent<T>;
	@ContentChild(TemplateRef) template: TemplateRef<any>;

	search: string;
	searchStream: Subject<string> = new Subject<string>();
	cachedItems: any[];
	getItemsRequest: Observable<T[]>;
	loading: boolean = false;
	loadDelay: number;
	placeholder: string;
	allowCustomOption: boolean;
	collapsed: boolean = false;
	cacheDisplayList = [];

	private _visibleItems: BehaviorSubject<T[]>;

	transformService: __transform.ITransformService;
	searchUtility: __search.ISearchUtility;

	get visibleItems$(): Observable<T[]> {
		return this._visibleItems.asObservable();
	}

	get canShowOptions(): boolean {
		return !(this.busy.loading || !this.search);
	}

	get hideFlowerup(): boolean {
		return !((this.search || this.value) && this.label);
	}

	constructor(transformService: __transform.TransformService
			, @Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, object: __object.ObjectUtility
			, array: __array.ArrayUtility
			, guid: __guid.GuidService
			, searchService: __search.SearchUtility) {
		super(rlForm, componentValidator, object, array, guid);
		this.transformService = transformService;
		this.searchUtility = searchService;
		this.inputType = 'typeahead';
		this.search = '';
		this._visibleItems = new BehaviorSubject(null);
		this.caseSensitiveSearching = false;
	}

	focus(): void {
		this.input.nativeElement.focus();
	}

	add(item: T): void {
		if (this.cachedItems != null) {
			this.cachedItems.push(item);
		}
	}

	remove(item: T): void {
		if (this.cachedItems != null) {
			this.array.remove(this.cachedItems, item);
		}
	}

	clear(): void {
		this.setValue(null);
		this.collapsed = false;
		this.searchStream.next('');
	}

	selectItem(item: T): void {
		this.list.close();
		this.search = '';

		this.selector.emit(item);

		if (this.allowCollapse) {
			this.collapsed = true;
			this.setValue(item);
		}
	}

	selectCustom(): void {
		const newItem: T = this.create(this.search);
		this.selectItem(newItem);
	}

	refresh(search: string): void {
		this.search = search;
		if (this.object.isNullOrEmpty(search)) {
			this.cacheDisplayList = [];
			return this._visibleItems.next(this.cacheDisplayList);
		}
		else {
			const loadRequest: Observable<T[]> = this.loadItems(search);
			// triggers the subscription
			this.busy.waitOnObservableNext(loadRequest).subscribe(data => {
				if (!isEqual(data, this.cacheDisplayList)) {
					this.list.open();
					this.cacheDisplayList = cloneDeep(data);
					return this._visibleItems.next(this.cacheDisplayList);
				}
			});
		}

	}

	ngOnInit(): void {
		super.ngOnInit();

		this.loadDelay = this.clientSearch ? DEFAULT_CLIENT_SEARCH_DEBOUNCE : DEFAULT_SERVER_SEARCH_DEBOUNCE;
		this.prefix = this.prefix || 'Search for';
		this.placeholder = this.label != null ? this.prefix + ' ' + this.label.toLowerCase() : 'Search';

		this.allowCustomOption = !!this.create;

		if (this.allowCollapse && !!this.value) {
			this.collapsed = true;
		}

		this.searchStream
			.do(search => {
				this.busy.setBusy(!!search);
				this.search = search;
			})
			.debounceTime(this.loadDelay)
			.do(() => this.busy.setBusy(false))
			.distinctUntilChanged()
			.subscribe(search => this.refresh(search));
	}

	ngOnChanges(changes: ITypeaheadChanges): void {
		super.ngOnChanges(changes);
		if (changes.value) {
			if (changes.value.currentValue && this.allowCollapse) {
				this.collapsed = true;
			} else {
				this.collapsed = false;
			}
		}
	}

	getDisplayName(item: T): string {
		return this.transformService.getValue(item, this.transform);
	}

	loadItems(search: string): Observable<T[]> {
		let itemsStream: Observable<T[]>;
		if (!this.clientSearch) {
			itemsStream = Observable.from(this.getItems(search));
		} else {
			itemsStream = this.getItemsClient()
				.map((items: T[]): T[] => {
					return this.filter(items, search);
				});
		}
		return itemsStream;
	}

	private getItemsClient(): Observable<T[]> {
		if (this.cachedItems != null) {
			return new BehaviorSubject(this.cachedItems);
		}
		//when useClientSearching is enabled, the entire list is loaded and then filtered in-memory
		//caching the promise prevents multiple API calls from being made to load the entire list
		else if (this.getItemsRequest == null) {
			this.getItemsRequest = Observable.from(this.getItems());

			this.getItemsRequest.subscribe((items: T[]): T[] => {
				return this.cachedItems = items;
			});
		}

		return this.getItemsRequest;
	}

	private showCustomSearch(search: string): boolean {
		return this.allowCustomOption
			&& !find(this._visibleItems.getValue(), (item: any): boolean => {
			return this.getDisplayName(item) === search;
		});
	}

	private filter(list: T[], search: string): T[] {
		return filter(list, (item: T): boolean => { return this.searchUtility.tokenizedSearch(item, search, this.caseSensitiveSearching); });
	}
}
