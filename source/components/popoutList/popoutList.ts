import { Component, Input, Output, EventEmitter, TemplateRef, ContentChildren, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { clone } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { PopoutItem } from './popoutItem';

@Component({
	selector: 'rlPopoutList',
	template: require('./popoutList.html'),
	directives: [PopoutItem],
})
export class PopoutListComponent<T> {
	@Input() options: Observable<T[]>;
	@Input() template: TemplateRef<any>;
	@Input() transform: __transform.ITransform<T, string>;
	@Output() select: EventEmitter<T> = new EventEmitter<T>();

	showOptions: boolean;
	focusIndex: number;

	@ContentChildren(PopoutItem) customItems: QueryList<PopoutItem<T>>;
	@ViewChildren(PopoutItem) listItems: QueryList<PopoutItem<T>>;

	transformService: __transform.ITransformService;

	constructor(transformService: __transform.TransformService) {
		this.transformService = transformService;
	}

	toggle(): void {
		this.showOptions = !this.showOptions;
	}

	open(): void {
		this.showOptions = true;
	}

	close(): void {
		this.showOptions = false;
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

	newTemplate(): TemplateRef<any> {
		return clone(this.template);
	}

	getDisplayName(item: T): string {
		return this.transformService.getValue(item, this.transform);
	}
}
