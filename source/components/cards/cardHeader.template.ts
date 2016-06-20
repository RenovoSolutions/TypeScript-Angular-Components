import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlCardHeader]' })
export class CardHeaderTemplate {
	constructor(public template: TemplateRef<any>) {	}
}