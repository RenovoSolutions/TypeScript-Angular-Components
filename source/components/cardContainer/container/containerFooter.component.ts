import { Component, Input } from '@angular/core';

import { ContainerFooterTemplate } from './containerFooter.template';
import { TemplateRenderer } from '../../templateRenderer/templateRenderer';
import { ItemCountComponent } from './itemCount/itemCount';

@Component({
	selector: 'rlContainerFooter',
	template: require('./containerFooter.component.html'),
	directives: [TemplateRenderer, ItemCountComponent],
})
export class ContainerFooterComponent {
	@Input() footer: ContainerFooterTemplate;
}
