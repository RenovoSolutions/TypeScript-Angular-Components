import { Component, Optional, Inject } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;

import { InputComponent, baseInputs } from '../input/input.ng2';
import { ComponentValidator } from '../../services/componentValidator/componentValidator.service.ng2';
import { FormComponent } from '../form/form.ng2';

@Component({
	selector: 'rlTextbox',
	template: require('./textbox.ng2.html'),
	inputs: baseInputs,
	providers: [ComponentValidator],
})
export class TextboxComponent extends InputComponent {
	constructor(@Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__array.arrayToken) array: __array.IArrayUtility
			, @Inject(__guid.guidToken) guid: __guid.IGuidService) {
		super(rlForm, componentValidator, object, array, guid);
	}
}