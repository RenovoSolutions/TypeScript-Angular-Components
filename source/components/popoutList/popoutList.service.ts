import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';

import { PopoutItemComponent } from './popoutItem';

export class PopoutListService<T> {
	select: Subject<T> = new Subject<T>();

	disabled: boolean;
	_showOptions: boolean;
	focusIndex: number;

	get showOptions(): boolean {
		if (this.disabled) {
			return false;
		}
		return this._showOptions;
	}

	get isEmpty(): boolean {
		return !((this.listItems && this.listItems.length)
			|| this.customItems && this.customItems.length);
	}

	customItems: QueryList<PopoutItemComponent<T>>;
	listItems: QueryList<PopoutItemComponent<T>>;

	constructor() {
		this.select.subscribe(() => this.close());
	}

	open(): void {
		this._showOptions = true;
	}

	close(): void {
		this._showOptions = false;
	}

	isFocused(item: PopoutItemComponent<T>): boolean {
		return item === this.current;
	}

	focus(item: PopoutItemComponent<T>): void {
		const indexInFirstList = this.customItems.toArray().indexOf(item);

		if (indexInFirstList != -1) {
			this.focusIndex = indexInFirstList;
		}

		const indexInSecondList = this.listItems.toArray().indexOf(item);

		if (indexInSecondList != -1) {
			this.focusIndex = this.customItems.length + indexInSecondList;
		}
	}

	blur(): void {
		this.focusIndex = null;
	}

	focusNext(): void {
		if (this.focusIndex == null
			|| this.focusIndex === this.listItems.length + this.customItems.length - 1) {
			this.focusIndex = 0;
		} else {
			this.focusIndex += 1;
		}
	}

	focusPrevious(): void {
		// not using falsy to clarify the intended behavior
		if (this.focusIndex == null
			|| this.focusIndex === 0) {
			this.focusIndex = this.listItems.length + this.customItems.length - 1;
		} else {
			this.focusIndex -= 1;
		}
	}

	selectCurrent(): void {
		if (this.current) {
			this.current.trigger.emit(null);
			this.focusIndex = null;
		}
	}

	get current(): PopoutItemComponent<T> {
		if (this.focusIndex == null) {
			return null;
		} else if (this.focusIndex < this.customItems.length) {
			return this.customItems.toArray()[this.focusIndex];
		} else {
			const indexIntoSecondList = this.focusIndex - this.customItems.length;
			return this.listItems.toArray()[indexIntoSecondList];
		}
	}
}
