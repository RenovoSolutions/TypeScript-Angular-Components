import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlCardHeader]' })
export class CardHeader {
	constructor(public template: TemplateRef<any>) {	}
}