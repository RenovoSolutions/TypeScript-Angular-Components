import { Component, Input, ViewChild } from '@angular/core';

import { BusyComponent, IWaitValue } from '../../busy/busy';
import { BaseButtonComponent, baseInputs } from '../baseButton';
import { FormComponent } from '../../form/form';

@Component({
	selector: 'rlButtonSubmit',
	template: require('./buttonSubmit.html'),
	inputs: baseInputs,
})
export class ButtonSubmitComponent extends BaseButtonComponent {

	@ViewChild(BusyComponent) busySpinner: BusyComponent;

	private form: FormComponent;

	constructor(form: FormComponent) {
		super();
		this.form = form;
	}

	submit(): void {
		const waitValue: IWaitValue<any> = this.form.submitAndWait();
		this.busySpinner.trigger(waitValue);
	}
}
