import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ContainerFooterTemplate } from '../templates/containerFooter.template';

@Component({
	selector: 'rlSelectableContainerFooter',
	template: require('./selectableContainerFooter.component.html'),
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableContainerFooterComponent {
	@Input() footer: ContainerFooterTemplate;
}
