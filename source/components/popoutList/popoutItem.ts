import { Component, Input, Output, EventEmitter, forwardRef, Inject } from '@angular/core';

import { PopoutListComponent } from './popoutList';
import { PopoutListService } from './popoutList.service';

@Component({
	selector: 'rlPopoutItem',
	template: require('./popoutItem.html'),
})
export class PopoutItemComponent<T> {
	@Output() trigger: EventEmitter<any> = new EventEmitter();

	list: PopoutListService<T>;

	constructor(@Inject(forwardRef(() => PopoutListService)) list: PopoutListService<T>) {
		this.list = list;
	}

	get focused(): boolean {
		return this.list.isFocused(this);
	}
}
