import { Component, Input } from '@angular/core';

import { ContainerFooterTemplate } from '../templates/containerFooter.template';

@Component({
	selector: 'rlContainerFooter',
	template: require('./containerFooter.component.html'),
})
export class ContainerFooterComponent {
	@Input() footer: ContainerFooterTemplate;
}
