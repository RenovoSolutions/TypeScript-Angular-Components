import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import ITransform = services.transform.ITransform;

import { SelectFilter } from './selectFilter.service';
import { IDataSource } from '../../datasources/dataSource';

@Component({
	selector: 'rlSelectFilter',
	template: require('./selectFilter.html'),
})
export class SelectFilterComponent<T> {
	@Input() filter: SelectFilter<T, any>;
	@Input() label: string;
	@Input() options: T[];
	@Input() transform: ITransform<T, string>;
	@Input() nullOption: string;

	@ContentChild(TemplateRef) template: TemplateRef<any>;
}
