import { Component, Inject, Input } from '@angular/core';

import { defaultThemeToken } from '../componentsDefaultTheme';

import { RadioGroupComponent } from './radioGroup.ng2';

@Component({
	selector: 'rlRadio',
	template: require('./radio.ng2.html'),
})
export class RadioComponent<T> {
	@Input() label: string;
	@Input() option: T;

	radioGroup: RadioGroupComponent<T>;
	useDefaultTheme: boolean;

	constructor( @Inject(defaultThemeToken) useDefaultTheme: boolean
			, radioGroup: RadioGroupComponent<T>) {
		this.radioGroup = radioGroup;
		this.useDefaultTheme = useDefaultTheme;
	}
}
