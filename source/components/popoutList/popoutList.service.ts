import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';

import { PopoutItem } from './popoutItem';

export class PopoutListService<T> {
	select: Subject<T> = new Subject<T>();

	disabled: boolean;
	private _showOptions: boolean;
	focusIndex: number;

	get showOptions(): boolean {
		if (this.disabled) {
			return false;
		}
		return this._showOptions;
	}

	customItems: QueryList<PopoutItem<T>>;
	listItems: QueryList<PopoutItem<T>>;

	constructor() {
		this.select.subscribe(() => this.close());
	}

	toggle(): void {
		this._showOptions = !this._showOptions;
	}

	open(): void {
		this._showOptions = true;
	}

	close(): void {
		this._showOptions = false;
	}

	isFocused(item: PopoutItem<T>): boolean {
		return item === this.current;
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

	get current(): PopoutItem<T> {
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