import { Component, Input } from '@angular/core';

import { ContainerHeaderTemplate } from '../templates/containerHeader.template';

@Component({
	selector: 'rlContainerHeader',
	template: require('./containerHeader.component.html'),
})
export class ContainerHeaderComponent {
	@Input() header: ContainerHeaderTemplate;
}
