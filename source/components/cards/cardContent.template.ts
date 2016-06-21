import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlCardContent]' })
export class CardContentTemplate {
	constructor(public template: TemplateRef<any>) {	}
}