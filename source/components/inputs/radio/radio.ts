import { Component, Input } from '@angular/core';

import { DefaultTheme } from '../../componentsDefaultTheme';

import { RadioGroupComponent } from './radioGroup';

@Component({
	selector: 'rlRadio',
	template: require('./radio.html'),
})
export class RadioComponent<T> {
	@Input() label: string;
	@Input() option: T;

	radioGroup: RadioGroupComponent<T>;
	useDefaultTheme: boolean;

	constructor(defaultTheme: DefaultTheme
			, radioGroup: RadioGroupComponent<T>) {
		this.radioGroup = radioGroup;
		this.useDefaultTheme = defaultTheme.useDefaultTheme;
	}
}
