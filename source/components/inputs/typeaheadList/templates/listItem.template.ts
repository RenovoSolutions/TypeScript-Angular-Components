import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlListItem]' })
export class ListItemTemplate {
	constructor(public template: TemplateRef<any>) {	}
}