import { Component, Input, Inject } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __logger = services.logger;

import { IDataSource } from '../../dataSources/dataSources.module';
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

	showChildren: boolean = true;
	logger: __logger.ILogger;

	constructor( @Inject(__logger.loggerToken) logger: __logger.ILogger) {
		this.logger = logger;
	}

	toggleChildren(): void {
		this.showChildren = !this.showChildren;
	}

	selectOption(option: IFilterOption): void {
		this.filterGroup.activeOption = option;
		this.showChildren = false;

		if (this.dataSource != null) {
			this.dataSource.refresh();
		} else {
			this.logger.log('No source specified');
		}
	}
}
