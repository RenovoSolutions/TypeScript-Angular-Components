import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';

import { defaultThemeToken } from '../componentsDefaultTheme';

@Component({
	selector: 'rlCheckbox',
	template: require('./checkbox.ng2.html'),
})
export class CheckboxComponent {
	@Input() value: boolean;
	@Input() disabled: boolean;
	@Input() active: boolean = true;
	@Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() valueChange: EventEmitter<boolean> = this.change;

	useDefaultTheme: boolean;

	constructor( @Inject(defaultThemeToken) useDefaultTheme: boolean) {
		this.useDefaultTheme = useDefaultTheme;
	}

	toggle(): void {
		if (this.active && !this.disabled) {
			this.value = !this.value;
			this.change.emit(this.value);
		}
	}
}