import { Component, Optional, Inject, Input, OnInit } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { ValidatedInputComponent, validationInputs, baseOutputs } from '../input/input.ng2';
import { ComponentValidator } from '../../services/componentValidator/componentValidator.service.ng2';
import { FormComponent } from '../form/form.ng2';

@Component({
	selector: 'rlTextarea',
	template: require('./textarea.ng2.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator],
})
export class TextareaComponent extends ValidatedInputComponent<string> implements OnInit {
	@Input() maxlength: number;
	@Input() rows: number;

	constructor( @Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__array.arrayToken) array: __array.IArrayUtility
			, @Inject(__guid.guidToken) guid: __guid.IGuidService) {
		super(rlForm, componentValidator, object, array, guid);
		this.inputType = 'textarea';
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.value = this.value || '';
	}
}