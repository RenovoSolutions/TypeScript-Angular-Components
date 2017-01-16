import { Component, Input, Optional, OnInit, AfterViewInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __array = services.array;

import { FormComponent } from '../form/form';
import { IControlGroup } from '../../types/formValidators';
import { ComponentValidator } from '../../services/componentValidator/componentValidator.service';

export interface IGroupChanges {
	[key: string]: SimpleChange;
	model: SimpleChange;
}

@Component({
	selector: 'rlValidationGroup',
	template: require('./validationGroup.html'),
	providers: [ComponentValidator],
})
export class ValidationGroupComponent implements OnInit, AfterViewInit, OnChanges {
	@Input() validator: __validation.IObservableValidationHandler;
	@Input() validators: __validation.IObservableValidationHandler[];
	@Input() model: any;

	groupValidator: ComponentValidator;
	formGroup: IControlGroup;
	validationControl: FormControl;
	arrayUtility: __array.IArrayUtility;

	constructor(@Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, arrayUtility: __array.ArrayUtility) {
		this.arrayUtility = arrayUtility;
		this.groupValidator = componentValidator;
		this.validationControl = new FormControl('', null, this.groupValidator.validate.bind(this.groupValidator));
		this.formGroup = <IControlGroup>new FormGroup({ validation: this.validationControl });
		if (rlForm) {
			rlForm.form.addControl('', this.formGroup)
		}
	}

	ngOnInit(): void {
		let validators: __validation.IObservableValidationHandler[] = [];

		if (this.validator) {
			validators = validators.concat(this.arrayUtility.arrayify(this.validator));
		}

		if (this.validators) {
			validators = validators.concat(this.arrayUtility.arrayify(this.validators));
		}

		this.groupValidator.initValidator(validators, this.validationControl.valueChanges, this.validationControl);
	}

	ngAfterViewInit(): void {
		this.validationControl.updateValueAndValidity(this.model || undefined);
	}

	ngOnChanges(changes: IGroupChanges): void {
		if (changes.model) {
			this.validationControl.updateValueAndValidity(changes.model.currentValue);
		}
	}

	checkValidity(): void {
		this.validationControl.updateValueAndValidity(this.model);
	}
}
