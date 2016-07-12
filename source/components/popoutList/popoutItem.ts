import { Component, ViewChild, Output, EventEmitter, forwardRef, Inject, ElementRef } from '@angular/core';

import { PopoutListComponent } from './popoutList';

@Component({
	selector: 'rlPopoutItem',
	template: require('./popoutItem.html'),
})
export class PopoutItem<T> {
	@Output() trigger: EventEmitter<any> = new EventEmitter();

	@ViewChild('li') element: ElementRef;

	list: PopoutListComponent<T>;

	constructor(@Inject(forwardRef(() => PopoutListComponent)) list: PopoutListComponent<T>) {
		this.list = list;
	}

	focus(): void {
		this.element.nativeElement.focus();
	}

	focusNext(): void {
		this.list.focusNext(this);
	}

	focusPrevious(): void {
		this.list.focusPrevious(this);
	}
}
