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
export interface IFilterGroup extends filters.IFilterWithCounts, filters.ISerializableFilter<any> {
    label: string;
    type: string;
    options: IFilterOption[];
    activeOption: IFilterOption;
    setActiveOption(index: number): void;
    setOptionCounts(counts: number[]): void;
}
export declare class FilterGroup extends filters.SerializableFilter<any> implements IFilterGroup {
    private settings;
    private object;
    label: string;
    type: string;
    options: IFilterOption[];
    private _activeOption;
    constructor(settings: IFilterGroupSettings, object: __object.IObjectUtility);
    initOptions(): void;
    activeOption: IFilterOption;
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
