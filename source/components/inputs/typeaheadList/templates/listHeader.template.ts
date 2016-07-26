import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlListHeader]' })
export class ListHeaderTemplate {
	constructor(public template: TemplateRef<any>) {	}
}