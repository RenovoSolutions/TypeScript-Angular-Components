import { Component, Input, Optional } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { DefaultTheme } from '../../componentsDefaultTheme';

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

	constructor(defaultTheme: DefaultTheme
			, @Optional() rlForm: FormComponent
			, object: __object.ObjectUtility
			, guid: __guid.GuidService) {
		super(rlForm, object, guid);
		this.inputType = 'checkbox';
		this.initControl();
		this.useDefaultTheme = defaultTheme.useDefaultTheme;
	}

	toggle(): void {
		if (this.active) {
			this.setValue(!this.value);
		}
	}
}