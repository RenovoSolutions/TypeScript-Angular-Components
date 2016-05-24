import { Component, ViewChild, Optional, AfterViewInit, OnInit } from '@angular/core';
import { Control } from '@angular/common';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { FormComponent } from '../form/form.ng2';
import { ComponentValidator } from '../../services/componentValidator/componentValidator.service.ng2';

export const baseInputs: string[] = ['validator', 'validators', 'label', 'name', 'rlRequired'];

export class InputComponent implements AfterViewInit, OnInit {
	validator: __validation.IValidationHandler;
	validators: __validation.IValidationHandler[];
	label: string;
	name: string;
	rlRequired: string;

	control: Control;
	inputType: string = 'input';

	rlForm: FormComponent;
	protected componentValidator: ComponentValidator;
	protected object: __object.IObjectUtility;
	protected array: __array.IArrayUtility;
	protected guid: __guid.IGuidService;

	constructor(rlForm: FormComponent
			, componentValidator: ComponentValidator
			, object: __object.IObjectUtility
			, array: __array.IArrayUtility
			, guid: __guid.IGuidService) {
		this.rlForm = rlForm;
		this.object = object;
		this.array = array;
		this.guid = guid;
		this.componentValidator = componentValidator;
		this.control = new Control('', this.componentValidator.validate.bind(this.componentValidator));
	}

	ngOnInit(): void {
		let validators: __validation.IValidationHandler[] = [];

		if (this.validator) {
			validators = validators.concat(this.array.arrayify(this.validator));
		}

		if (this.validators) {
			validators = validators.concat(this.array.arrayify(this.validators));
		}

		if (this.object.isNullOrEmpty(this.name)) {
			this.name = this.inputType + '-' + this.guid.random();
		}

		if (this.rlRequired) {
			validators.push({
				name: 'rlRequired',
				validate: (value: any): boolean => { return !this.object.isNullOrEmpty(value); },
				errorMessage: this.rlRequired,
			});
		}

		this.componentValidator.setValidators(validators);
	}

	ngAfterViewInit(): void {
		this.componentValidator.afterInit(this.control);
		if (this.rlForm) {
			this.rlForm.form.addControl(this.name, this.control);
		}
	}
}
