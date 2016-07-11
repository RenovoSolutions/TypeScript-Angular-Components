import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlDialogHeader]' })
export class DialogHeaderTemplate {
	constructor(public template: TemplateRef<any>) {	}
}