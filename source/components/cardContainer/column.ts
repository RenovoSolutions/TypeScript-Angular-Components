import { IPartialSort } from './sorts/sort';
import { SortDirection } from './sorts/sortDirection';

export interface IBreakpointSize {
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
}

export interface ISecondarySorts {
	ascending?: IPartialSort[];
	descending?: IPartialSort[];
}

export interface IColumn<TItemType> {
	label: string;
	description?: string;
	displayColumnHeader?: boolean;
	size: IBreakpointSize | number;
	getValue: { (item: TItemType): number | string | boolean } | string;
	headerTemplateUrl?: string;
	headerTemplate?: string;
	templateUrl?: string;
	template?: string;
	secondarySorts?: ISecondarySorts;
	flipSort?: boolean;
	sortDirection?: SortDirection;
	styling?: string;
	fieldName?: string;
}
