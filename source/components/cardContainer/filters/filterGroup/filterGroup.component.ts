import { Component, Input } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __logger = services.logger;

import { IDataSourceOld } from '../../dataSources/index';
import { IFilterGroupOld, IFilterOptionOld } from './filterGroupOld.service';

@Component({
	selector: 'rlFilterGroup',
	template: require('./filterGroup.component.html'),
})
export class FilterGroupComponent<T> {
	@Input() filterGroup: IFilterGroupOld;
	@Input() dataSource: IDataSourceOld<T>;
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

	selectOption(option: IFilterOptionOld): void {
		this.filterGroup.activeOption = option;
		this.expanded = false;

		if (this.dataSource != null) {
			this.dataSource.refresh();
		} else {
			this.logger.log('No source specified');
		}
	}
}
