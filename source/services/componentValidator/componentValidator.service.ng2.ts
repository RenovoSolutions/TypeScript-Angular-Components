import { Inject, Provider } from '@angular/core';
import { Control } from '@angular/common';
import { first, values } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

export class ComponentValidator {
	error: string;
	validators: __validation.IValidationHandler[];

	constructor(validationService: __validation.IValidationService
			, validators: __validation.IValidationHandler[]) {
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

export class ComponentValidatorFactory {
	validationService: __validation.IValidationService;

	constructor( @Inject(__validation.validationToken) validationService: __validation.IValidationService) {
		this.validationService = validationService;
	}

	getInstance(validators: __validation.IValidationHandler[]): ComponentValidator {
		return new ComponentValidator(this.validationService, validators);
	}
}

export const COMPONENT_VALIDATOR_PROVIDER: Provider = new Provider(ComponentValidatorFactory, {
	useClass: ComponentValidatorFactory,
});
