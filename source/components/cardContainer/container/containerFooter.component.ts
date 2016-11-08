import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ContainerFooterTemplate } from '../templates/containerFooter.template';

@Component({
	selector: 'rlContainerFooter',
	template: require('./containerFooter.component.html'),
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerFooterComponent {
	@Input() footer: ContainerFooterTemplate;
}
