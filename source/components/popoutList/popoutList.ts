import { Component, Input, Output, EventEmitter, TemplateRef, ContentChildren, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { clone } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { PopoutItemComponent } from './popoutItem';
import { PopoutListService } from './popoutList.service';

@Component({
	selector: 'rlPopoutList',
	template: require('./popoutList.html'),
})
export class PopoutListComponent<T> {
	@Input() options: T[];
	@Input() template: TemplateRef<any>;
	@Input() transform: __transform.ITransform<T, string>;
	@Output() select: EventEmitter<T> = new EventEmitter<T>();

	@Input() set disabled(value: boolean) {
		this.popoutListService.disabled = value;
	}

	@ContentChildren(PopoutItemComponent) set customItems(value: QueryList<PopoutItemComponent<T>>) {
		this.popoutListService.customItems = value;
	}
	@ViewChildren(PopoutItemComponent) set listItems(value: QueryList<PopoutItemComponent<T>>) {
		this.popoutListService.listItems = value;
	}

	transformService: __transform.ITransformService;
	popoutListService: PopoutListService<T>;

	constructor(transformService: __transform.TransformService
			, popoutListService: PopoutListService<T>) {
		this.transformService = transformService;
		this.popoutListService = popoutListService;
		popoutListService.select.subscribe(value => this.select.emit(value));
	}

	get isEmpty(): boolean {
		return !((this.options && this.options.length)
			|| this.popoutListService.customItems && this.popoutListService.customItems.length);
	}

	get showOptions(): boolean {
		return this.popoutListService.showOptions;
	}

	open(): void {
		this.popoutListService.open();
	}

	close(): void {
		this.popoutListService.close();
	}

	newTemplate(): TemplateRef<any> {
		return clone(this.template);
	}

	getDisplayName(item: T): string {
		return this.transformService.getValue(item, this.transform);
	}
}
