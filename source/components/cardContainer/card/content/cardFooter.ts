import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlCardFooter]' })
export class CardFooter {
	constructor(public template: TemplateRef<any>) {	}
}