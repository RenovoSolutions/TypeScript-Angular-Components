import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
export declare var factoryName: string;
export interface IFilterGroupSettings {
    label: string;
    type: string;
    options: IFilterOption[];
    serialize?: {
        (): any;
    };
}
export interface IFilterOption {
    active?: boolean;
    label: string;
    type?: string;
    value?: any;
    filter<TItemType>(item: TItemType): boolean;
    serialize?: {
        (): any;
    };
}
export interface IFilterGroup extends filters.IFilterWithCounts, filters.ISerializableFilter {
    label: string;
    type: string;
    options: IFilterOption[];
    activeOption: IFilterOption;
    setActiveOption(index: number): void;
    setOptionCounts(counts: number[]): void;
    serialize(): any;
}
export declare class FilterGroup implements IFilterGroup {
    private settings;
    label: string;
    type: string;
    options: IFilterOption[];
    activeOption: IFilterOption;
    constructor(settings: IFilterGroupSettings, object: __object.IObjectUtility);
    private setDefaultOption();
    filter<TItemType>(item: TItemType): boolean;
    serialize(): any;
    setActiveOption(index: number): void;
    setOptionCounts(counts: number[]): void;
    updateOptionCounts<TDataType>(filteredDataSet: TDataType[]): void;
}
export interface IFilterGroupFactory {
    getInstance(settings: IFilterGroupSettings): IFilterGroup;
}
export declare function filterGroupFactory(object: __object.IObjectUtility): IFilterGroupFactory;
