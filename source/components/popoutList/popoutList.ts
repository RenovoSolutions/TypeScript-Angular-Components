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

	focus(): void {
		this.customItems.first.focus();
	}

	focusNext(item): void {
		const customList = this.customItems.toArray();
		const locationInCustom = customList.indexOf(item);

		if (locationInCustom > -1) {
			if (locationInCustom < customList.length - 1) {
				customList[locationInCustom + 1].focus();
			} else {
				this.listItems.first.focus();
			}
		} else {
			const ourList = this.listItems.toArray();
			const locationInOurs = ourList.indexOf(item);
			if (locationInCustom < ourList.length - 1) {
				ourList[locationInOurs + 1].focus();
			}
		}
	}

	focusPrevious(item): void {
		const ourList = this.listItems.toArray();
		const locationInOurs = ourList.indexOf(item);

		if (locationInOurs > -1) {
			if (locationInOurs > 0) {
				ourList[locationInOurs - 1].focus();
			} else {
				this.customItems.last.focus();
			}
		} else {
			const customList = this.customItems.toArray();
			const locationInCustom = customList.indexOf(item);
			if (locationInCustom > 0) {
				customList[locationInCustom - 1].focus();
			}
		}
	}

	newTemplate(): TemplateRef<any> {
		return clone(this.template);
	}

	getDisplayName(item: T): string {
		return this.transformService.getValue(item, this.transform);
	}
}
