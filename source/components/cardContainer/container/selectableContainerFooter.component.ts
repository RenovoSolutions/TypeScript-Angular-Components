import { Component, Input } from '@angular/core';

import { ContainerFooterTemplate } from '../templates/containerFooter.template';

@Component({
	selector: 'rlSelectableContainerFooter',
	template: require('./containerFooter.component.html'),
})
export class SelectableContainerFooterComponent {
	@Input() footer: ContainerFooterTemplate;
}
