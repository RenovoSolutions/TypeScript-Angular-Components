import { Component, Input, Output, EventEmitter, forwardRef, Inject } from '@angular/core';

import { PopoutListComponent } from './popoutList';

@Component({
	selector: 'rlPopoutItem',
	template: require('./popoutItem.html'),
})
export class PopoutItem<T> {
	@Output() trigger: EventEmitter<any> = new EventEmitter();

	list: PopoutListComponent<T>;

	constructor(@Inject(forwardRef(() => PopoutListComponent)) list: PopoutListComponent<T>) {
		this.list = list;
	}

	get focused(): boolean {
		return this.list.isFocused(this);
	}
}
