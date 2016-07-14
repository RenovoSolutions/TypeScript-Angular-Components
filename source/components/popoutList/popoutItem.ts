import { Component, Output, EventEmitter } from '@angular/core';

import { PopoutListService } from './popoutList.service';

@Component({
	selector: 'rlPopoutItem',
	template: require('./popoutItem.html'),
})
export class PopoutItemComponent<T> {
	@Output() trigger: EventEmitter<any> = new EventEmitter();

	list: PopoutListService<T>;

	constructor(list: PopoutListService<T>) {
		this.list = list;
	}

	get focused(): boolean {
		return this.list.isFocused(this);
	}
}
