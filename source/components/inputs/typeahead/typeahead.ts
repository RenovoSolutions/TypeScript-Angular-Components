import { Component, Input, Output, EventEmitter, Inject, Optional, OnInit, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { find, filter } from 'lodash';

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
import { OffClickDirective } from '../../../behaviors/offClick/offClick';

export interface ITypeaheadChanges {
	value: SimpleChange;
	[key: string]: SimpleChange;
}

@Component({
	selector: 'rlTypeahead',
	template: require('./typeahead.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator],
	directives: [BusyComponent, OffClickDirective]
})
export class TypeaheadComponent<T> extends ValidatedInputComponent<T> implements OnInit, OnChanges {
	@Input() transform: __transform.ITransform<T, string>;
	@Input() getItems: { (search?: string): Promise<T[]> | Observable<T[]> };
	@Input() prefix: string;
	@Input() useClientSearching: boolean;
	@Input() allowCollapse: boolean;
	@Input() create: { (value: string): T };
	@Output() select: EventEmitter<T> = new EventEmitter<T>();

	@ViewChild(BusyComponent) busy: BusyComponent;

	search: string;
	cachedItems: any[];
	getItemsRequest: Observable<T[]>;
	visibleItems: any[];
	loading: boolean = false;
	loadDelay: number;
	placeholder: string;
	allowCustomOption: boolean;
	collapsed: boolean = false;
	showOptions: boolean = false;

	transformService: __transform.ITransformService;
	searchUtility: __search.ISearchUtility;

	constructor(@Inject(__transform.transformToken) transformService: __transform.ITransformService
			, @Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__array.arrayToken) array: __array.IArrayUtility
			, @Inject(__guid.guidToken) guid: __guid.IGuidService
			, @Inject(__search.searchToken) searchService: __search.ISearchUtility) {
		super(rlForm, componentValidator, object, array, guid);
		this.transformService = transformService;
		this.searchUtility = searchService;
		this.inputType = 'typeahead';
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
	}

	selectItem(item: T): void {
		this.showOptions = false;

		if (item != null) {
			this.select.emit(item);

			if (this.allowCollapse) {
				this.collapsed = true;
				this.setValue(item);
			}
		}
	}

	selectCustom(): void {
		const newItem: T = this.create(this.search);
		this.selectItem(newItem);
	}

	refresh(search: string): Observable<T[]> {
		this.search = search;
		if (this.object.isNullOrEmpty(search)) {
			this.visibleItems = [];
			return null;
		}
		const loadRequest: Observable<T[]> = this.loadItems(search);
		this.busy.trigger(loadRequest);
		return loadRequest;
	}

	toggle(): void {
		this.showOptions = !this.showOptions;
	}

	close(): void {
		this.showOptions = false;
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.loadDelay = this.useClientSearching ? 100 : 500;
		this.prefix = this.prefix || 'Search for';
		this.placeholder = this.label != null ? this.prefix + ' ' + this.label.toLowerCase() : 'Search';

		this.allowCustomOption = !this.object.isNullOrEmpty(this.create);

		if (this.allowCollapse && !this.object.isNullOrEmpty(this.value)) {
			this.collapsed = true;
		}
	}

	ngOnChanges(changes: ITypeaheadChanges): void {
		super.ngOnChanges(changes);
		if (changes.value) {
			if (changes.value.currentValue && this.allowCollapse) {
				this.collapsed = true;
			}
		}
	}

	getDisplayName(item: T): string {
		return this.transformService.getValue(item, this.transform);
	}

	loadItems(search: string): Observable<T[]> {
		let itemsStream: Observable<T[]>;
		if (!this.useClientSearching) {
			itemsStream = Observable.from(this.getItems(search));
		} else {
			itemsStream = this.getItemsClient()
				.map((items: T[]): T[] => {
					return this.filter(items, search);
				});
		}
		itemsStream.subscribe(items => this.visibleItems = items);
		return itemsStream;
	}

	private getItemsClient(): Observable<T[]> {
		if (this.cachedItems != null) {
			return new BehaviorSubject(this.cachedItems);
		}
		//when useClientSearching is enabled, the entire list is loaded and then filtered in-memory
		//caching the promise prevents multiple API calls from being made to load the entire list
		else if (this.getItemsRequest == null) {
			this.getItemsRequest = Observable.from(this.getItems())

			this.getItemsRequest.subscribe((items: T[]): T[] => {
					return this.cachedItems = items;
				});
		}

		return this.getItemsRequest;
	}

	private showCustomSearch(search: string): boolean {
		return this.allowCustomOption
			&& !find(this.visibleItems, (item: any): boolean => {
			return this.getDisplayName(item) === search;
		});
	}

	private filter(list: T[], search: string): T[] {
		return filter(list, (item: T): boolean => { return this.searchUtility.tokenizedSearch(item, search); });
	}
}