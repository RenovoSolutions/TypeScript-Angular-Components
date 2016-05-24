import { Component, EventEmitter, Output } from '@angular/core';

import { BaseButtonComponent, baseInputs } from './baseButton.ng2';

@Component({
	selector: 'rlButton',
	template: require('./button.ng2.html'),
	inputs: baseInputs,
})
export class ButtonComponent extends BaseButtonComponent {
	@Output() trigger: EventEmitter<any> = new EventEmitter();
}