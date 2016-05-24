import { Component, ViewChild, Optional, AfterViewInit } from '@angular/core';
import { Control, NgControl, NgFormControl, FORM_DIRECTIVES } from '@angular/common';
import { first, values } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;

import { FormComponent } from '../form/form.ng2';

export const baseInputs: string[] = ['validator', 'validators', 'label', 'name'];

export class InputComponent implements AfterViewInit {
	validator: __validation.IValidationHandler;
	validators: __validation.IValidationHandler[];
	label: string;
	name: string;

	error: string;
	control: Control;
	inputValidator: ComponentValidator;
	rlForm: FormComponent;

	constructor(@Optional() rlForm: FormComponent) {
		this.rlForm = rlForm;
		this.inputValidator = new ComponentValidator(<any>[{
			name: 'rlRequired',
			validate: (value: any): boolean => { return !__object.objectUtility.isNullOrEmpty(value); },
			errorMessage: 'Required field',
		}]);
		this.control = new Control('', this.inputValidator.validate.bind(this.inputValidator));
		this.name = 'test123';
	}

	ngAfterViewInit(): void {
		this.inputValidator.afterInit(this.control);
		if (this.rlForm) {
			this.rlForm.form.addControl(this.name, this.control);
		}
	}
}

export class ComponentValidator {
	error: string;
	validators: __validation.IValidationHandler[];

	constructor(validators: __validation.IValidationHandler[]) {
		this.validators = validators;
	}

	afterInit(control: Control): void {
		control.statusChanges.subscribe((value: any): void => {
			this.setError(control);
		});
		this.setError(control);
	}

	validate(control: Control): any {
		if ((<any>this.validators[0]).validate(control.value)) {
			return null;
		}
		let errors: any = {};
		errors[this.validators[0].name] = this.validators[0].errorMessage;
		return errors;
	}

	setError(control: Control): string {
		if (!control) {
			return;
		}

		this.error = <any>first(values(control.errors));
	}
}