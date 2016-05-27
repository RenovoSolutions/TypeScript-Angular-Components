import { Component, Inject, Optional, OnInit } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { defaultThemeToken } from '../componentsDefaultTheme';

import { InputComponent, baseInputs, baseOutputs } from '../input/input.ng2';
import { FormComponent } from '../form/form.ng2';

@Component({
	selector: 'rlRadioGroup',
	template: '<ng-content></ng-content>',
	inputs: baseInputs,
	outputs: baseOutputs,
})
export class RadioGroupComponent<T> extends InputComponent<T> {
	constructor(@Optional() rlForm: FormComponent
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__guid.guidToken) guid: __guid.IGuidService) {
		super(rlForm, object, guid);
		this.inputType = 'radio';
		this.initControl();
	}

	select(value: T): void {
		this.setValue(value);
	}
}
