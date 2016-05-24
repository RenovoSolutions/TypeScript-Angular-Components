import { Component, ViewChild, Optional, AfterViewInit } from '@angular/core';
import { Control } from '@angular/common';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;

import { FormComponent } from '../form/form.ng2';
import { ComponentValidator, ComponentValidatorFactory } from '../../services/componentValidator/componentValidator.service.ng2';

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

	constructor(rlForm: FormComponent, componentValidatorFactory: ComponentValidatorFactory) {
		this.rlForm = rlForm;
		this.inputValidator = componentValidatorFactory.getInstance(<any>[{
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
