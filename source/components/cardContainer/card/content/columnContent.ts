import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({ selector: '[rlColumnContent]' })
export class ColumnContent {
	@Input() rlColumnContentName: string;

	get name(): string {
		return this.rlColumnContentName;
	}

	constructor(public template: TemplateRef<any>) {	}
}