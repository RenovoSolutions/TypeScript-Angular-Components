import { Component, EventEmitter, Output } from '@angular/core';

import { BaseButtonComponent, baseInputs } from './baseButton';

@Component({
	selector: 'rlButton',
	template: require('./button.html'),
	inputs: baseInputs,
})
export class ButtonComponent extends BaseButtonComponent {
	@Output() trigger: EventEmitter<any> = new EventEmitter();
}