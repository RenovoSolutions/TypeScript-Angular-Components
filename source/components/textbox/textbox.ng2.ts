import { Component, Optional } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

import { InputComponent, baseInputs } from '../input/input.ng2';
import { FormComponent } from '../form/form.ng2';

@Component({
	selector: 'rlTextbox',
	template: require('./textbox.ng2.html'),
	inputs: baseInputs,
	directives: [FORM_DIRECTIVES],
})
export class TextboxComponent extends InputComponent {
	constructor(@Optional() rlForm: FormComponent) {
		super(rlForm);
	}
}