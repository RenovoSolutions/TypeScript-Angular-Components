import { Component, Optional } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { InputComponent, baseInputs, baseOutputs } from '../input';
import { FormComponent } from '../../form/form';

@Component({
	selector: 'rlRadioGroup',
	template: '<ng-content></ng-content>',
	inputs: baseInputs,
	outputs: baseOutputs,
})
export class RadioGroupComponent<T> extends InputComponent<T> {
	constructor(@Optional() rlForm: FormComponent
			, object: __object.ObjectUtility
			, guid: __guid.GuidService) {
		super(rlForm, object, guid);
		this.inputType = 'radio';
		this.initControl();
	}

	select(value: T): void {
		this.setValue(value);
	}
}
