import { Component, Optional } from '@angular/core';

import { FormComponent } from '../form/form.ng2';

@Component({
	selector: 'rlButtonSubmit',
	template: require('./buttonSubmit.ng2.html'),
})
export class ButtonSubmitComponent {
	public form: FormComponent;

	constructor(@Optional() form: FormComponent) {
		this.form = form;
	}
}