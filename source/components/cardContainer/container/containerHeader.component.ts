import { Component, Input } from '@angular/core';

import { ContainerHeaderTemplate } from './containerHeader.template';
import { TemplateRenderer } from '../../templateRenderer/templateRenderer';
import { CardSearchComponent } from './cardSearch/cardSearch';
import { PageSizeComponent } from '../paging/index';

@Component({
	selector: 'rlContainerHeader',
	template: require('./containerHeader.component.html'),
	directives: [TemplateRenderer, CardSearchComponent, PageSizeComponent],
})
export class ContainerHeaderComponent {
	@Input() header: ContainerHeaderTemplate;
}
