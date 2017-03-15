import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { clone } from 'lodash';

export interface ILogPage {
	pageNumber: number;
	pageSize: number;
}

@Component({
	selector: 'rlMessageLog',
	template: require('./messageLog.component.html'),
})
export class MessageLogComponent {
	@Input() pageNumber: number = 1;
	@Input() pageSize: number = 8;
	@Input() hasNextPage: boolean;
	@Input() loading: boolean;
	@Input() messages: any[];

	@Output() page: EventEmitter<ILogPage> = new EventEmitter<ILogPage>();

	@ContentChild(TemplateRef) template: TemplateRef<any>;

	get hasPreviousPage(): boolean {
		return this.pageNumber > 1;
	}

	getTop = (): void => {
		this.pageNumber = 1;
		this.page.emit({
			pageNumber: this.pageNumber,
			pageSize: this.pageSize,
		});
	}

	getOlder = (): void => {
		this.pageNumber = this.pageNumber + 1;
		this.page.emit({
			pageNumber: this.pageNumber,
			pageSize: this.pageSize,
		});
	}

	newTemplate(): TemplateRef<any> {
		return clone(this.template);
	}
}
