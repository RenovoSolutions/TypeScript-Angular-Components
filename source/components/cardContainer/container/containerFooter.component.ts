import { Component, Input } from '@angular/core';

import { ContainerFooterTemplate } from './containerFooter.template';
import { TemplateRenderer } from '../../templateRenderer/templateRenderer';

@Component({
	selector: 'rlContainerFooter',
	template: require('./containerFooter.component.html'),
	directives: [TemplateRenderer],
})
export class ContainerFooterComponent {
	@Input() footer: ContainerFooterTemplate;
}
