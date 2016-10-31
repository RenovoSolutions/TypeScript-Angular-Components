import { Observable } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import ObjectUtility = services.object.ObjectUtility;
import TransformService = services.transform.TransformService;

import { IFilter, Filter } from '../filter';

export interface ISelectFilterSettings<TDataType, TFilterType> {
	valueSelector: string | { (item: TDataType): any };
	comparer?: IEqualityFunction<TFilterType>;

	// // component settings
	// options?: any[];
	// getOptions?: { (): angular.IPromise<any[]> };
	// label?: string;
	// displayNameSelector?: string | { (item: any): string };
	// nullOption?: string;
}

export interface IEqualityFunction<TFilterType> {
	(item1: TFilterType, item2: TFilterType): boolean;
}

export class SelectFilter<TDataType, TFilterType> extends Filter<TDataType, TFilterType> implements IFilter<TDataType, TFilterType> {
	type: string = 'selectFilter';

	// private _selectedValue: TFilterType;
	private valueSelector: string | { (item: TDataType): any };
	private comparer: IEqualityFunction<TFilterType>;

	// // component settings
	// options: Observable<any[]>;
	// getOptions: { (): angular.IPromise<any[]> };
	// label: string;
	// displayNameSelector: string | { (item: any): string };
	// nullOption: string;
	// template: string;

	objectUtility: ObjectUtility;
	transformService: TransformService;

	get selectedValue$(): Observable<TFilterType> {
		return this.value$.asObservable();
	}

	constructor(settings: ISelectFilterSettings<TDataType, TFilterType>
			, objectUtility: ObjectUtility
			, transformService: TransformService) {
		super();

		this.objectUtility = objectUtility;
		this.transformService = transformService;

		this.valueSelector = settings.valueSelector;
		this.comparer = settings.comparer;
		// this.options = settings.options;
		// this.getOptions = settings.getOptions;
		// this.label = settings.label;
		// this.displayNameSelector = settings.displayNameSelector;
		// this.nullOption = settings.nullOption;
		// this.template = `<rl-select-filter filter="filter" source="dataSource" options="filter.options" get-options="filter.getOptions()"
		// 								   label="{{filter.label}}" selector="filter.displayNameSelector" null-option="{{filter.nullOption}}"></rl-select-filter>`;
	}

	select(value: TFilterType): void {
		this.value$.next(value);
	}

	predicate = (item: TDataType, selectedValue: TFilterType): boolean => {
		if (!selectedValue) {
			return true;
		}

		if (this.comparer) {
			return this.comparer(this.getValue(item), selectedValue);
		}

		return this.objectUtility.areEqual(this.getValue(item), selectedValue);
	}

	serialize(): Observable<TFilterType> {
		return this.value$.asObservable();
	}

	private getValue(item: TDataType): any {
		return this.transformService.getValue(item, this.valueSelector);
	}
}
