import { AfterViewInit, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

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
	value$: BehaviorSubject<T>;
	validator: __validation.IObservableValidationHandler;
	validators: __validation.IObservableValidationHandler[];
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
		this.control = new FormControl('', null, this.componentValidator.validate.bind(this.componentValidator));
		this.initControl();
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.value$ = new BehaviorSubject(this.value);
		this.control.valueChanges.subscribe(this.value$);

		let validators: __validation.IObservableValidationHandler[] = [];

		if (this.validator) {
			validators = validators.concat(this.array.arrayify(this.validator));
		}

		if (this.validators) {
			validators = validators.concat(this.array.arrayify(this.validators));
		}

		if (this.rlRequired) {
			validators.push({
				name: 'rlRequired',
				validate: (value$: Observable<any>): Observable<string> => {
					return value$.map(value => value ? null : this.rlRequired);
				},
			});
		}
		this.componentValidator.initValidator(validators, this.value$, this.control);
	}

	ngAfterViewInit(): void {
		this.control.updateValueAndValidity(this.value || undefined);

		super.ngAfterViewInit();
	}

	ngOnChanges(changes: IInputChanges): void {
		if (changes.value) {
			this.control.setValue(changes.value.currentValue);
		}
	}
}
