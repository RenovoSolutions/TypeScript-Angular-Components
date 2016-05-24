import { Component, ViewChild, Optional, AfterViewInit } from '@angular/core';
import { Control, NgControl, NgFormControl, FORM_DIRECTIVES } from '@angular/common';
import { first, values } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;

import { FormComponent } from '../form/form.ng2';

export const baseInputs: string[] = ['validator', 'validators', 'label', 'name'];

@Component({
	selector: 'rlTextbox',
	template: require('./textbox.ng2.html'),
	inputs: baseInputs,
	directives: [FORM_DIRECTIVES],
})
export class TextboxComponent implements AfterViewInit {
	validator: __validation.IValidationHandler;
	validators: __validation.IValidationHandler[];
	label: string;
	name: string;

	error: string;
	control: Control;
	rlForm: FormComponent;

	@ViewChild('input') input: NgFormControl;

	constructor(@Optional() rlForm: FormComponent) {
		this.rlForm = rlForm;
		this.control = new Control('', buildValidator(<any>[{
			name: 'rlRequired',
			validate: (value: any): boolean => { return !__object.objectUtility.isNullOrEmpty(value); },
			errorMessage: 'Required field',
		}]));
		this.control.statusChanges.subscribe((value: any): void => {
			this.setError();
		});
		this.name = 'test123';
	}

	ngAfterViewInit(): void {
		this.setError();
		if (this.rlForm) {
			this.rlForm.form.addControl(this.name, this.control);
		}
	}

	setError(): string {
		if (!this.control) {
			return;
		}

		this.error = <any>first(values(this.control.errors));
	}
}

function buildValidator(validators: __validation.IValidationHandler[]): any {
	return (control: Control): any => {
		if ((<any>validators[0]).validate(control.value)) {
			return null;
		}
		let errors: any = {};
		errors[validators[0].name] = validators[0].errorMessage;
		return errors;
	};
}