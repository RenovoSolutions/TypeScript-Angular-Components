import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import __transform = services.transform;
import __logger = services.logger;

import { ISelectFilter } from './selectFilter.service';
import { IDataSourceOld } from '../../datasources/dataSource';

@Component({
	selector: 'rlSelectFilter',
	template: require('./selectFilter.html'),
})
export class SelectFilterComponent<T> {
	@Input() filter: ISelectFilter<T>;
	@Input() dataSource: IDataSourceOld<T>;
	@Input() label: string;
	@Input() options: T[] | Observable<T[]>;
	@Input() transform: __transform.ITransform<T, string>;
	@Input() nullOption: string;

	@ContentChild(TemplateRef) template: TemplateRef<any>;

	logger: __logger.ILogger;

	constructor(logger: __logger.Logger) {
		this.logger = logger;
	}

	setValue(value: T): void {
		this.filter.selectedValue = value;

		if (this.dataSource != null) {
			this.dataSource.refresh();
		} else {
			this.logger.log('No source specified');
		}
	}
}
