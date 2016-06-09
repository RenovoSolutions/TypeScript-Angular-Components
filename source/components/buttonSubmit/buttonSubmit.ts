import { Component, Input, Optional, ExceptionHandler, ViewChild } from '@angular/core';

import { BusyComponent, IWaitValue } from '../busy/busy';
import { BaseButtonComponent, baseInputs } from '../button/baseButton';
import { FormComponent } from '../form/form';

@Component({
	selector: 'rlButtonSubmit',
	template: require('./buttonSubmit.html'),
	inputs: baseInputs,
	directives: [BusyComponent],
})
export class ButtonSubmitComponent extends BaseButtonComponent {
	@Input() rightAligned: boolean;

	@ViewChild(BusyComponent) busySpinner: BusyComponent;

	private form: FormComponent;

	constructor( @Optional() form: FormComponent
			, exceptionHandler: ExceptionHandler) {
		super();
		this.form = form;

		if (!form) {
			exceptionHandler.call(new Error('This component must be nested in an rlForm component.'))
		}
	}

	submit(): void {
		const waitValue: IWaitValue<any> = this.form.submit();
		this.busySpinner.trigger(waitValue);
	}
}