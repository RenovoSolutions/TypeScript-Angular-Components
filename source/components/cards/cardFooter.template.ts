import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlCardFooter]' })
export class CardFooterTemplate {
	constructor(public template: TemplateRef<any>) {	}
}