import { Component, Input, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';

import { TypeaheadListComponent } from './typeaheadList';

@Component({
	selector: '[rlTypeaheadDataItem]',
	template: '<ng-content></ng-content>'
})
export class TypeaheadDataItemComponent<T> {
	@Input('rlTypeaheadDataItem') item: T;

	get context(): any {
		return {
			$implicit: this.item,
			remove: this.remove.bind(this),
		};
	}

	typeaheadList: TypeaheadListComponent<T>;

	constructor(@Inject(forwardRef(() => TypeaheadListComponent)) typeaheadList: TypeaheadListComponent<T>) {
		this.typeaheadList = typeaheadList;
	}

	remove = (): Observable<void> => {
		return this.typeaheadList.remove(this.item);
	}
}