import { Component, Input } from '@angular/core';

import { ContainerHeaderTemplate } from './containerHeader.template';
import { TemplateRenderer } from '../../templateRenderer/templateRenderer';

@Component({
	selector: 'rlContainerHeader',
	template: require('./containerHeader.component.html'),
	directives: [TemplateRenderer],
})
export class ContainerHeaderComponent {
	@Input() header: ContainerHeaderTemplate;
}
