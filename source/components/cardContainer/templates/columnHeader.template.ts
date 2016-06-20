import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({ selector: '[rlColumnHeader]' })
export class ColumnHeaderTemplate {
	@Input() rlColumnHeaderName: string;

	get name(): string {
		return this.rlColumnHeaderName;
	}

	constructor(public template: TemplateRef<any>) {	}
}
