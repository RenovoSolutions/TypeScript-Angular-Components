import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IFilterGroup, IFilterOption } from '../filterGroup.service';

@Component({
	selector: 'rlFilterOption',
	template: require('./filterOption.html'),
})
export class FilterOptionComponent {
	@Input() option: IFilterOption;
	@Input() isActive: boolean;
	@Output() activate: EventEmitter<void> = new EventEmitter<void>();
}
