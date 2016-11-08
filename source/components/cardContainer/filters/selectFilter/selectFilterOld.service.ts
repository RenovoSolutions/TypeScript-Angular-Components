import { filters, services } from 'typescript-angular-utilities';
import * as angular from 'angular';
import __object = services.object;
import __transform = services.transform;

export interface ISelectFilterSettingsOld<TDataType, TFilterType> {
	valueSelector: string | { (item: TDataType): any };
	comparer?: IEqualityFunctionOld<TFilterType>;

	// component settings
	options?: any[];
	getOptions?: { (): angular.IPromise<any[]> };
	label?: string;
	displayNameSelector?: string | { (item: any): string };
	nullOption?: string;
}

export interface ISelectFilterOld<T> extends filters.ISerializableFilter<any> {
	selectedValue: any;
}

export interface IEqualityFunctionOld<TFilterType> {
	(item1: TFilterType, item2: TFilterType): boolean;
}

export class SelectFilterOld<TDataType, TFilterType> extends filters.SerializableFilter<TFilterType> implements ISelectFilterOld<TDataType> {
	type: string = 'selectFilter';

	private _selectedValue: TFilterType;
	private valueSelector: string | { (item: TDataType): any };
	private comparer: IEqualityFunctionOld<TFilterType>;

	// component settings
	options: any[];
	getOptions: { (): angular.IPromise<any[]> };
	label: string;
	displayNameSelector: string | { (item: any): string };
	nullOption: string;
	template: string;

	object: __object.IObjectUtility;
	transformService: __transform.ITransformService;

	get selectedValue(): TFilterType {
		return this._selectedValue;
	}

	set selectedValue(value: TFilterType) {
		if (this._selectedValue !== value) {
			this._selectedValue = value;
			this.onChange();
		}
	}

	constructor(settings: ISelectFilterSettingsOld<TDataType, TFilterType>
			, object: __object.IObjectUtility
			, transformService: __transform.ITransformService) {
		super();

		this.object = object;
		this.transformService = transformService;

		this.valueSelector = settings.valueSelector;
		this.comparer = settings.comparer;
		this.options = settings.options;
		this.getOptions = settings.getOptions;
		this.label = settings.label;
		this.displayNameSelector = settings.displayNameSelector;
		this.nullOption = settings.nullOption;
		this.template = `<rl-select-filter filter="filter" source="dataSource" options="filter.options" get-options="filter.getOptions()"
										   label="{{filter.label}}" selector="filter.displayNameSelector" null-option="{{filter.nullOption}}"></rl-select-filter>`;
	}

	filter(item: TDataType): boolean {
		if (this.selectedValue == null) {
			return true;
		}

		if (this.comparer != null) {
			return this.comparer(this.getValue(item), this.selectedValue);
		}

		return this.object.areEqual(this.getValue(item), this.selectedValue);
	}

	serialize(): TFilterType {
		return this.selectedValue;
	}

	private getValue(item: TDataType): any {
		return this.transformService.getValue(item, this.valueSelector);
	}
}
