import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
export declare var factoryName: string;
export interface IFilterGroupSettings {
    label: string;
    type: string;
    options: IFilterOption[];
}
export interface IFilterOption {
    active?: boolean;
    label: string;
    type?: string;
    filter<TItemType>(item: TItemType): boolean;
}
export interface IFilterGroup extends filters.IFilterWithCounts {
    label: string;
    type: string;
    options: IFilterOption[];
    activeOption: IFilterOption;
    setActiveOption(index: number): void;
    setOptionCounts(counts: number[]): void;
}
export declare class FilterGroup implements IFilterGroup {
    label: string;
    type: string;
    options: IFilterOption[];
    activeOption: IFilterOption;
    constructor(settings: IFilterGroupSettings, object: __object.IObjectUtility);
    private setDefaultOption();
    filter<TItemType>(item: TItemType): boolean;
    setActiveOption(index: number): void;
    setOptionCounts(counts: number[]): void;
    updateOptionCounts<TDataType>(filteredDataSet: TDataType[]): void;
}
export interface IFilterGroupFactory {
    getInstance(settings: IFilterGroupSettings): IFilterGroup;
}
export declare function filterGroupFactory(object: __object.IObjectUtility): IFilterGroupFactory;
