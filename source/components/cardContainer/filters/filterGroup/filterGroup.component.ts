import { Component, Input } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __logger = services.logger;

import { IDataSource } from '../../dataSources/index';
import { IFilterGroup, IFilterOption } from './filterGroup.service';
import { FilterOptionComponent } from './filterOption/filterOption';

@Component({
	selector: 'rlFilterGroup',
	template: require('./filterGroup.component.html'),
	directives: [FilterOptionComponent],
})
export class FilterGroupComponent<T> {
	@Input() filterGroup: IFilterGroup;
	@Input() dataSource: IDataSource<T>;
	@Input() icon: string;
	@Input() disabled: boolean;

	expanded: boolean = true;
	logger: __logger.ILogger;

	constructor(logger: __logger.Logger) {
		this.logger = logger;
	}

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

	selectOption(option: IFilterOption): void {
		this.filterGroup.activeOption = option;
		this.expanded = false;

		if (this.dataSource != null) {
			this.dataSource.refresh();
		} else {
			this.logger.log('No source specified');
		}
	}
}
