import { Injectable, Inject, Provider } from '@angular/core';
import { Control } from '@angular/common';
import { first, values, each } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

@Injectable()
export class ComponentValidator {
	validator: __validation.ISimpleValidator;
	error: string;
	errorType: string;

	validationService: __validation.IValidationService;

	constructor(@Inject(__validation.validationToken) validationService: __validation.IValidationService) {
		this.validationService = validationService;
		this.validator = this.validationService.buildCustomValidator((error: string, name: string): void => {
			this.error = error;
			this.errorType = name || 'customValidation';
		});
	}

	setValidators(validators: __validation.IValidationHandler[]): void {
		each(validators, (customValidator: __validation.IValidationHandler): void => {
			this.validator.registerValidationHandler(customValidator);
		});
	}

	afterInit(control: Control): void {
		control.statusChanges.subscribe((value: any): void => {
			this.setError(control);
		});
		this.setError(control);
	}

	validate(control: Control): any {
		if (this.validator.validate(control.value)) {
			return null;
		}
		let errors: any = {};
		errors[this.errorType] = this.error;
		return errors;
	}

	setError(control: Control): string {
		if (!control) {
			return;
		}

		this.error = <any>first(values(control.errors));
	}
}
