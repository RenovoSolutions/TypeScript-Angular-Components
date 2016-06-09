import { Component, Input, Optional, ExceptionHandler, ViewChild } from '@angular/core';

import { BusyComponent, IWaitValue } from '../busy/busy';
import { BaseButtonComponent, baseInputs } from '../button/baseButton.ng2';
import { FormComponent } from '../form/form.ng2';

@Component({
	selector: 'rlButtonSubmit',
	template: require('./buttonSubmit.ng2.html'),
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