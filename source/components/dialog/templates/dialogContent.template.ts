import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlDialogContent]' })
export class DialogContentTemplate {
	constructor(public template: TemplateRef<any>) {	}
}