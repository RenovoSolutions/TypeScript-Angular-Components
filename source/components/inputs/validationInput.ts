import { AfterViewInit, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { InputComponent, baseInputs, baseOutputs } from './input';
import { FormComponent } from '../form/form';
import { ComponentValidator } from '../../services/componentValidator/componentValidator.service';

export const validationInputs: string[] = baseInputs.concat(['validator', 'validators', 'rlRequired'])
export { baseOutputs };

export interface IInputChanges {
	[key: string]: SimpleChange;
	value: SimpleChange;
}

export class ValidatedInputComponent<T> extends InputComponent<T> implements AfterViewInit, OnInit, OnChanges {
	validator: __validation.IValidationHandler;
	validators: __validation.IValidationHandler[];
	rlRequired: string;

	protected componentValidator: ComponentValidator;
	protected array: __array.IArrayUtility;

	constructor(rlForm: FormComponent
			, componentValidator: ComponentValidator
			, object: __object.IObjectUtility
			, array: __array.IArrayUtility
			, guid: __guid.IGuidService) {
		super(rlForm, object, guid);
		this.array = array;
		this.componentValidator = componentValidator;
		this.control = new FormControl('', this.componentValidator.validate.bind(this.componentValidator));
		this.initControl();
	}

	ngOnInit(): void {
		super.ngOnInit();

		let validators: __validation.IValidationHandler[] = [];

		if (this.validator) {
			validators = validators.concat(this.array.arrayify(this.validator));
		}

		if (this.validators) {
			validators = validators.concat(this.array.arrayify(this.validators));
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
		this.control.updateValueAndValidity(this.value || undefined);

		super.ngAfterViewInit();
	}

	ngOnChanges(changes: IInputChanges): void {
		if (changes.value) {
			this.control.setValue(changes.value.currentValue);
		}
	}
}
