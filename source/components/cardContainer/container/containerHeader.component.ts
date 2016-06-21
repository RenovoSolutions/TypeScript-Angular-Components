import { Component, Input } from '@angular/core';

import { ContainerHeaderTemplate } from '../templates/containerHeader.template';
import { CardSearchComponent } from './cardSearch/cardSearch';
import { PageSizeComponent } from '../paging/pageSize/pageSize';

@Component({
	selector: 'rlContainerHeader',
	template: require('./containerHeader.component.html'),
	directives: [CardSearchComponent, PageSizeComponent],
})
export class ContainerHeaderComponent {
	@Input() header: ContainerHeaderTemplate;
}
