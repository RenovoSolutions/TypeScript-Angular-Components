import { Component, Optional, ExceptionHandler } from '@angular/core';

import { FormComponent } from '../form/form.ng2';

@Component({
	selector: 'rlButtonSubmit',
	template: require('./buttonSubmit.ng2.html'),
})
export class ButtonSubmitComponent {
	public form: FormComponent;

	constructor( @Optional() form: FormComponent
			, exceptionHandler: ExceptionHandler) {
		this.form = form;

		if (!form) {
			exceptionHandler.call(new Error('This component must be nested in an rlForm component.'))
		}
	}
}