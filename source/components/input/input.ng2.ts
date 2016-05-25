import { Component, ViewChild, Optional, AfterViewInit, OnInit, OnChanges, EventEmitter, SimpleChange } from '@angular/core';
import { Control } from '@angular/common';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { FormComponent } from '../form/form.ng2';
import { ComponentValidator } from '../../services/componentValidator/componentValidator.service.ng2';

export const baseInputs: string[] = ['name', 'label', 'value', 'disabled'];
export const baseOutputs: string[] = ['change', 'valueChange'];

export const validationInputs: string[] = baseInputs.concat(['validator', 'validators', 'rlRequired'])

export interface IInputChanges {
	[key: string]: SimpleChange;
	value: SimpleChange;
}

export class InputComponent<T> implements AfterViewInit, OnInit {
	name: string;
	label: string;
	disabled: boolean;
	value: T;
	change: EventEmitter<T> = new EventEmitter<T>();
	valueChange: EventEmitter<T> = this.change;

	inputType: string = 'input';
	control: Control;
	rlForm: FormComponent;
	protected object: __object.IObjectUtility;
	protected guid: __guid.IGuidService;

	constructor(rlForm: FormComponent
			, object: __object.IObjectUtility
			, guid: __guid.IGuidService) {
		this.rlForm = rlForm;
		this.object = object;
		this.guid = guid;
	}

	ngOnInit(): void {
		if (this.object.isNullOrEmpty(this.name)) {
			this.name = this.inputType + '-' + this.guid.random();
		}
	}

	ngAfterViewInit(): void {
		if (this.rlForm) {
			this.rlForm.form.addControl(this.name, this.control);
		}
	}

	initControl(): void {
		if (!this.control) {
			this.control = new Control('');
		}

		this.control.valueChanges.subscribe(value => {
			this.value = value;
			this.valueChange.emit(value);
		});
	}
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
		this.control = new Control('', this.componentValidator.validate.bind(this.componentValidator));
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

		super.ngAfterViewInit();
	}

	ngOnChanges(changes: IInputChanges): void {
		if (changes.value) {
			this.control.updateValue(changes.value.currentValue);
		}
	}
}
