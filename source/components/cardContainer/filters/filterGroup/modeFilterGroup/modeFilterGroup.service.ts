import { Observable } from 'rxjs';
import { map } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { IFilterOption, IFilterGroup, FilterGroup } from '../filterGroup.service';

export interface IModeFilterGroupSettings<TItemType> {
	label: string;
	type: string;
	getValue: { (item: TItemType): string | number | boolean } | string;
	options: IModeFilterOptionSettings[];
}

export interface IModeFilterOptionSettings {
	label: string;
	displayAll?: boolean;
	value?: number | string | boolean;
}

export interface IModeFilterOption<TItemType> extends IFilterOption<TItemType> {
	displayAll?: boolean;
	value?: number | string | boolean;
}

export interface IModeFilterGroup<TItemType> extends IFilterGroup<TItemType> {
	options: IModeFilterOption<TItemType>[];
	serialize(): Observable<number | string | boolean>;
}

export class ModeFilterGroup<TItemType> extends FilterGroup<TItemType> implements IModeFilterGroup<TItemType> {
	private getValue: { (item: any): string | number | boolean } | string;

	transformService: __transform.ITransformService;

	constructor(settings: IModeFilterGroupSettings<any>
			, transformService: __transform.ITransformService) {
		super(<any>settings);
		this.transformService = transformService;

		this.getValue = settings.getValue;
		settings.options = map<IModeFilterOptionSettings, IModeFilterOption<TItemType>>(settings.options, this.buildModeOption.bind(this));
		this.initOptions();
	}

	serialize(): Observable<number | string | boolean> {
		return this.value$.asObservable().map((activeOption: IModeFilterOption<TItemType>) => {
			if (activeOption.displayAll) {
				return null;
			}
			return activeOption.value;
		});
	}

	private buildModeOption(option: IModeFilterOptionSettings): IModeFilterOption<TItemType> {
		const modeOption: IModeFilterOption<TItemType> = <any>option;
		modeOption.predicate = (item: TItemType): boolean => {
			if (modeOption.displayAll) {
				return true;
			}

			return this.transformService.getValue(item, this.getValue) === modeOption.value;
		};

		return modeOption;
	}
}
