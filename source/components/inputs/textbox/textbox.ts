import { Component, Optional, Input, OnInit } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { baseAnimations } from '../input';
import { ValidatedInputComponent, validationInputs, baseOutputs } from '../validationInput';
import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';
import { FormComponent } from '../../form/form';

@Component({
	selector: 'rlTextbox',
	template: require('./textbox.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator],
	animations: baseAnimations,
})
export class TextboxComponent extends ValidatedInputComponent<string> implements OnInit {
	@Input() maxlength: number;

	constructor( @Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, object: __object.ObjectUtility
			, array: __array.ArrayUtility
			, guid: __guid.GuidService) {
		super(rlForm, componentValidator, object, array, guid);
		this.inputType = 'textbox';
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.value = this.value || '';
	}

	onChange(text: string): void {
		this.setValue(text);
	}
}