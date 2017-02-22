import { Component, Optional, Input, Output, ViewChild, ContentChild, AfterViewInit, TemplateRef } from '@angular/core';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __guid = services.guid;
import __transform = services.transform;

import { ValidatedInputComponent, validationInputs, baseOutputs } from '../validationInput';
import { ComponentValidator } from '../../../services/componentValidator/componentValidator.service';
import { FormComponent } from '../../form/form';
import { BusyComponent } from '../../busy/busy';
import { POPOUT_LIST_PROVIDERS, PopoutListComponent } from '../../popoutList/index';

import { baseAnimations } from '../input';

@Component({
	selector: 'rlSelect',
	template: require('./select.html'),
	inputs: validationInputs,
	outputs: baseOutputs,
	providers: [ComponentValidator, POPOUT_LIST_PROVIDERS],
	animations: baseAnimations,
})
export class SelectComponent<T> extends ValidatedInputComponent<T> implements AfterViewInit {
	@Input() options: T[];
	@Input() transform: __transform.ITransform<T, string>;
	@Input() nullOption: string;

	// used for select filter only
	@Input() externalTemplate: TemplateRef<any>;

	@ViewChild(BusyComponent) busy: BusyComponent;
	@ContentChild(TemplateRef) template: TemplateRef<any>;

	private transformService: __transform.ITransformService;

	constructor(transformService: __transform.TransformService
			, @Optional() rlForm: FormComponent
			, componentValidator: ComponentValidator
			, object: __object.ObjectUtility
			, array: __array.ArrayUtility
			, guid: __guid.GuidService) {
		super(rlForm, componentValidator, object, array, guid);
		this.transformService = transformService;
		this.inputType = 'select';
	}

	ngAfterViewInit(): void {
		super.ngAfterViewInit();
		this.template = this.template || this.externalTemplate;
	}

	select(value: T): void {
		if (value != this.value) {
			this.setValue(value);
		}
		this.hideLabelIfEmpty();
	}

	getDisplayName(item: T): string {
		return this.transformService.getValue(item, this.transform);
	}
}
