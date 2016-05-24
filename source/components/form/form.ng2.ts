import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/common';

@Component({
	selector: 'rlForm',
	template: require('./form.ng2.html'),
})
export class FormComponent {
	@ViewChild('form') form: NgForm;

	submit(): Promise<void> {
		console.log('Submit');
		console.log(this.form);
		return Promise.resolve();
	}
}