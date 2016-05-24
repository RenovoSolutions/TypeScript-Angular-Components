import { Component, Optional } from '@angular/core';

import { InputComponent, baseInputs } from '../input/input.ng2';
import { FormComponent } from '../form/form.ng2';

@Component({
	selector: 'rlTextbox',
	template: require('./textbox.ng2.html'),
	inputs: baseInputs,
})
export class TextboxComponent extends InputComponent {
	constructor(@Optional() rlForm: FormComponent) {
		super(rlForm);
	}
}