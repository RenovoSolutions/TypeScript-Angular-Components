import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlContainerFooter]' })
export class ContainerFooterTemplate {
	constructor(public template: TemplateRef<any>) {	}
}
