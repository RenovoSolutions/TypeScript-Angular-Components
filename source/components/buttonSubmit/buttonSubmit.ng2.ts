import { Component, Optional, ExceptionHandler } from '@angular/core';

import { BaseButtonComponent, baseInputs } from '../button/baseButton.ng2';
import { FormComponent } from '../form/form.ng2';

@Component({
	selector: 'rlButtonSubmit',
	template: require('./buttonSubmit.ng2.html'),
	inputs: baseInputs,
})
export class ButtonSubmitComponent extends BaseButtonComponent {
	public form: FormComponent;

	constructor( @Optional() form: FormComponent
			, exceptionHandler: ExceptionHandler) {
		super();
		this.form = form;

		if (!form) {
			exceptionHandler.call(new Error('This component must be nested in an rlForm component.'))
		}
	}
}