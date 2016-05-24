import { Component, Inject, Input, Output, EventEmitter, forwardRef } from '@angular/core';

import { defaultThemeToken } from '../componentsDefaultTheme';

import { ValueAccessor, makeValueAccessorProvider } from '../input/valueAccessor';

@Component({
	selector: 'rlCheckbox',
	template: require('./checkbox.ng2.html'),
	providers: [makeValueAccessorProvider({
		useExisting: forwardRef(() => CheckboxComponent)
	})],
})
export class CheckboxComponent extends ValueAccessor<boolean> {
	@Input() value: boolean;
	@Input() disabled: boolean;
	@Input() active: boolean = true;
	@Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() valueChange: EventEmitter<boolean> = this.change;

	useDefaultTheme: boolean;

	constructor( @Inject(defaultThemeToken) useDefaultTheme: boolean) {
		super();
		this.useDefaultTheme = useDefaultTheme;
	}

	writeValue(value: boolean): void {
		this.value = value;
	}

	toggle(): void {
		if (this.active && !this.disabled) {
			this.value = !this.value;
			this.triggerChange(this.value);
			this.change.emit(this.value);
		}
	}
}