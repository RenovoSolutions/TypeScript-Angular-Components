import { Component, Input } from '@angular/core';

import { IDataSource } from '../../dataSources/index';
import { IFilterGroup, IFilterOption } from './filterGroup.service';

@Component({
	selector: 'rlFilterGroup',
	template: require('./filterGroup.component.html'),
})
export class FilterGroupComponent<T> {
	@Input() filterGroup: IFilterGroup<T>;
	@Input() dataSource: IDataSource<T>;
	@Input() icon: string;
	@Input() disabled: boolean;

	expanded: boolean = true;

	get headerTitle(): string {
		if (!this.disabled) {
			return this.filterGroup.label + ': ' + this.filterGroup.activeOption.label
		}

		return this.filterGroup.label;
	}

	toggleExpanded(): void {
		this.expanded = !this.expanded;
	}

	get childrenVisible(): boolean {
		return this.expanded && !this.disabled;
	}

	selectOption(option: IFilterOption<T>): void {
		this.filterGroup.activeOption = option;
		this.expanded = false;
	}
}
