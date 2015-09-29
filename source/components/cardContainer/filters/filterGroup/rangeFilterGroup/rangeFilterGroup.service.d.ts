import { services } from 'typescript-angular-utilities';
import __object = services.object;
import { IFilterOption, IFilterGroup } from '../filterGroup.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IRangeFilterGroupSettings {
    label: string;
    type: string;
    getValue<TItemType>(item: TItemType): number;
    options: IRangeFilterOptionSettings[];
}
export interface IRangeFilterOptionSettings {
    label: string;
    highInclusive?: number;
    highExclusive?: number;
    lowInclusive?: number;
    lowExclusive?: number;
}
export interface IRangeFilterOption extends IFilterOption {
    highInclusive?: number;
    highExclusive?: number;
    lowInclusive?: number;
    lowExclusive?: number;
}
export interface IRangeFilterGroup extends IFilterGroup {
    options: IRangeFilterOption[];
}
export interface IRangeFilterGroupFactory {
    getInstance(settings: IRangeFilterGroupSettings): IRangeFilterGroup;
}
export declare function rangeFilterGroupFactory(object: __object.IObjectUtility): IRangeFilterGroupFactory;
