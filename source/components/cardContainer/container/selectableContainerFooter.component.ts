import { Component, Input, forwardRef } from '@angular/core';

import { ContainerFooterTemplate } from '../templates/containerFooter.template';
import { ItemCountComponent } from './itemCount/itemCount';
import { PagerComponent } from '../paging/pager/pager';
import { SelectionComponent } from './selectionControl/selectionControl';

@Component({
	selector: 'rlSelectableContainerFooter',
	template: require('./containerFooter.component.html'),
	directives: [
		ItemCountComponent,
		forwardRef(() => SelectionComponent),
		forwardRef(() => PagerComponent),
	],
})
export class SelectableContainerFooterComponent {
	@Input() footer: ContainerFooterTemplate;
}
