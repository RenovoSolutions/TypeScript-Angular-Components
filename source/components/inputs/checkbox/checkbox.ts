import { Component, Inject, Input, Optional } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { defaultThemeToken } from '../../componentsDefaultTheme';

import { InputComponent, baseInputs, baseOutputs } from '../input';
import { FormComponent } from '../../form/form';

@Component({
	selector: 'rlCheckbox',
	template: require('./checkbox.html'),
	inputs: baseInputs,
	outputs: baseOutputs,
})
export class CheckboxComponent extends InputComponent<boolean> {
	@Input() active: boolean = true;

	useDefaultTheme: boolean;

	constructor( @Inject(defaultThemeToken) useDefaultTheme: boolean
			, @Optional() rlForm: FormComponent
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__guid.guidToken) guid: __guid.IGuidService) {
		super(rlForm, object, guid);
		this.inputType = 'checkbox';
		this.initControl();
		this.useDefaultTheme = useDefaultTheme;
	}

	toggle(): void {
		if (this.active) {
			this.setValue(!this.value);
		}
	}
}