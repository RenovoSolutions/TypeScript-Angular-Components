import { Component, Input, forwardRef } from '@angular/core';

import { ContainerFooterTemplate } from '../templates/containerFooter.template';
import { ItemCountComponent } from './itemCount/itemCount';
import { PagerComponent } from '../paging/pager/pager';

@Component({
	selector: 'rlContainerFooter',
	template: require('./containerFooter.component.html'),
	directives: [ItemCountComponent, forwardRef(() => PagerComponent)],
})
export class ContainerFooterComponent {
	@Input() footer: ContainerFooterTemplate;
}
