import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ContainerHeaderTemplate } from '../templates/containerHeader.template';

@Component({
	selector: 'rlContainerHeader',
	template: require('./containerHeader.component.html'),
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerHeaderComponent {
	@Input() header: ContainerHeaderTemplate;
}
