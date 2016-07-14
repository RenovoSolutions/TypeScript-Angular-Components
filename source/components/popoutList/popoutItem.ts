import { Component, Output, EventEmitter } from '@angular/core';

import { PopoutListService } from './popoutList.service';

@Component({
	selector: 'rlPopoutItem',
	template: require('./popoutItem.html'),
})
export class PopoutItemComponent<T> {
	@Output() trigger: EventEmitter<void> = new EventEmitter<void>();

	list: PopoutListService<T>;

	constructor(list: PopoutListService<T>) {
		this.list = list;
	}

	get focused(): boolean {
		return this.list.isFocused(this);
	}

	focus(): void {
		this.list.focus(this);
	}

	blur(): void {
		this.list.blur();
	}
}
