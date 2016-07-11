import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlDialogFooter]' })
export class DialogFooterTemplate {
	constructor(public template: TemplateRef<any>) {	}
}