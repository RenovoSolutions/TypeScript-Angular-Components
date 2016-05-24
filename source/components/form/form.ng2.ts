import { Component, ViewChild, Input } from '@angular/core';
import { NgForm, ControlGroup, FormBuilder, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs';

import { IWaitValue } from '../busy/busy.ng2';

export interface ISaveAction<T> {
	(data: T): IWaitValue<T>;
}

@Component({
	selector: 'rlForm',
	template: require('./form.ng2.html'),
	directives: [FORM_DIRECTIVES],
})
export class FormComponent {
	@Input() save: ISaveAction<any>;

	// @ViewChild('form') form: NgForm;
	form: ControlGroup;

	constructor() {
		this.form = new ControlGroup({});
		if (!this.save) {
			this.save = <ISaveAction>() => Promise.resolve();
		}
	}

	submit(): IWaitValue<any> {
		return this.save(this.form.value);
	}
}