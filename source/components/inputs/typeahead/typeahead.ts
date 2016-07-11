import { Component, Inject, Optional } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;
import __transform = services.transform;

import { ValidatedInputComponent, validationInputs, baseOutputs } from '../validationInput';
import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';
import { FormComponent } from '../../form/form';
import { BusyComponent } from '../../busy/busy';
import { OffClickDirective } from '../../../behaviors/offClick/offClick';

@Component({
	selector: 'rlTypeahead',
	template: require('./typeahead.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator],
	directives: [BusyComponent, OffClickDirective]
})
export class TypeaheadComponent<T> extends ValidatedInputComponent<T> {
	constructor(@Inject(__transform.transformToken) transformService: __transform.ITransformService
			, @Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, @Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__array.arrayToken) array: __array.IArrayUtility
			, @Inject(__guid.guidToken) guid: __guid.IGuidService) {
		super(rlForm, componentValidator, object, array, guid);
	}
}