import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlCardContent]' })
export class CardContent {
	constructor(public template: TemplateRef<any>) {	}
}