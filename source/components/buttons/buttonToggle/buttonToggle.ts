import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';

import { BaseButtonComponent, baseInputs } from '../baseButton';

@Component({
	selector: 'rlButtonToggle',
	template: require('./buttonToggle.html'),
	inputs: baseInputs,
})
export class ButtonToggleComponent extends BaseButtonComponent {
	@Input() value: boolean;
	@Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() valueChange: EventEmitter<boolean> = this.change;

	toggle(): void {
		if (!this.disabled) {
			this.value = !this.value;
			this.change.emit(this.value);
		}
	}
}
