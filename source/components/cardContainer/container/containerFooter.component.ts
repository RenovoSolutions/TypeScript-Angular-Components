import { Component, Input } from '@angular/core';

import { ContainerFooterTemplate } from '../templates/containerFooter.template';
import { ItemCountComponent } from './itemCount/itemCount';

@Component({
	selector: 'rlContainerFooter',
	template: require('./containerFooter.component.html'),
	directives: [ItemCountComponent],
})
export class ContainerFooterComponent {
	@Input() footer: ContainerFooterTemplate;
}
