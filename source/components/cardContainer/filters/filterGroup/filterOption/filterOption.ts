import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IFilterGroupOld, IFilterOptionOld } from '../filterGroupOld.service';

@Component({
	selector: 'rlFilterOption',
	template: require('./filterOption.html'),
})
export class FilterOptionComponent {
	@Input() option: IFilterOptionOld;
	@Input() isActive: boolean;
	@Output() activate: EventEmitter<void> = new EventEmitter<void>();
}
