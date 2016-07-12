import { Component, Input, Output, EventEmitter, TemplateRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { clone } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __transform = services.transform;

@Component({
	selector: 'rlPopoutList',
	template: require('./popoutList.html'),
})
export class PopoutListComponent<T> {
	@Input() options: Observable<T>;
	@Input() template: TemplateRef<any>;
	@Input() transform: __transform.ITransform<T, string>;
	@Output() select: EventEmitter<T> = new EventEmitter<T>();

	showOptions: boolean;

	transformService: __transform.ITransformService;

	constructor(@Inject(__transform.transformToken) transformService: __transform.ITransformService) {
		this.transformService = transformService;
	}

	toggle(): void {
		this.showOptions = !this.showOptions;
	}

	close(): void {
		this.showOptions = false;
	}

	newTemplate(): TemplateRef<any> {
		return clone(this.template);
	}

	getDisplayName(item: T): string {
		return this.transformService.getValue(item, this.transform);
	}
}
