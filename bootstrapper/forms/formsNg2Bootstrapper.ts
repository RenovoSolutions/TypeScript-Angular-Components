import { Component, ViewChild } from '@angular/core';

import { FormComponent } from '../../source/components/form/form';
import { BUTTON_DIRECTIVES } from '../../source/components/buttons/index';
import { INPUT_DIRECTIVES } from '../../source/components/inputs/index';
import { ValidationGroupComponent } from '../../source/components/validationGroup/validationGroup';
import { AutosaveDirective } from '../../source/behaviors/autosave/autosave';

@Component({
	selector: 'tsFormsBootstrapper',
	template: require('./formsNg2.html'),
	directives: [
		FormComponent,
		BUTTON_DIRECTIVES,
		INPUT_DIRECTIVES,
		ValidationGroupComponent,
		AutosaveDirective,
	],
})
export class FormsBootstrapper {
	text: string;
	rating: number;
	validator: any;
	brokenValidator: any;

	@ViewChild('testForm') testForm: FormComponent;

	constructor() {
		this.validator = {
			validate: () => this.rating >= 3,
			errorMessage: 'You must give at least 3 stars',
		};
		this.brokenValidator = {
			validate: () => false,
			errorMessage: null,
		};
	}

	waitCallback: { (data: any): Promise<void> } = (data: any) => {
		return new Promise<void>((resolve: Function, reject: Function): void => {
			setTimeout(() => {
				console.log(data);
				resolve();
			}, 1000);
		});
	}

	saveTestForm = (data): any => {
		if (this.testForm.form.dirty) {
			return this.waitCallback(data);
		}
		return false;
	}
}