import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { first, values, each } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

import { IControlValidator } from '../../types/formValidators';

@Injectable()
export class ComponentValidator {
	validator: __validation.ObservableValidator;
	value$: Observable<any>;


	constructor(validationService: __validation.ValidationService) {
		this.validator = validationService.buildObservableValidator();
	}

	initValidator(validators: __validation.IObservableValidationHandler[], value$: Observable<any>, control: IControlValidator): void {
		each(validators, (customValidator: __validation.IObservableValidationHandler): void => {
			this.validator.registerValidationHandler(customValidator);
		});
		this.value$ = value$;
		this.error$.subscribe(error => control.rlErrorMessage = error);
	}

	get error$(): Observable<string> {
		return this.validator.validate(this.value$);
	}

	validate(control: FormControl): Observable<any> {
		return this.validator.validate(control.valueChanges).map(validation => {
			if (validation) {
				return { validationError: validation };
			}
			return null;
		});
	}
}
