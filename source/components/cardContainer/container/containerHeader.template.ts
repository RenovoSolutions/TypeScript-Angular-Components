import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[rlContainerHeader]' })
export class ContainerHeaderTemplate {
	constructor(public template: TemplateRef<any>) {	}
}