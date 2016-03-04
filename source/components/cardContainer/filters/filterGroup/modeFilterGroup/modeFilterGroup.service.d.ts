import { services } from 'typescript-angular-utilities';
import __object = services.object;
import { IFilterOption, IFilterGroup, FilterGroup } from '../filterGroup.service';
export declare var moduleName: string;
export declare var factoryName: string;
export interface IModeFilterGroupSettings {
    label: string;
    type: string;
    getValue<TItemType>(item: TItemType): string | number | boolean;
    options: IModeFilterOptionSettings[];
}
export interface IModeFilterOptionSettings {
    label: string;
    displayAll?: boolean;
    value?: number | string | boolean;
}
export interface IModeFilterOption extends IFilterOption {
    displayAll?: boolean;
    value?: number | string | boolean;
}
export interface IModeFilterGroup extends IFilterGroup {
    options: IModeFilterOption[];
    serialize(): number | string | boolean;
}
export declare class ModeFilterGroup extends FilterGroup implements IModeFilterGroup {
    private getValue;
    constructor(settings: IModeFilterGroupSettings, object: __object.IObjectUtility);
    serialize(): number | string | boolean;
    private buildModeOption(option);
}
export interface IModeFilterGroupFactory {
    getInstance(settings: IModeFilterGroupSettings): IModeFilterGroup;
}
export declare function modeFilterGroupFactory(object: __object.IObjectUtility): IModeFilterGroupFactory;
