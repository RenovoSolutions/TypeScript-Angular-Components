import { Component, ViewChild } from '@angular/core';

import { FormComponent } from '../../source/components/form/form';
import { AutosaveActionService } from '../../source/services/autosaveAction/autosaveAction.service';

@Component({
	selector: 'tsFormsBootstrapper',
	template: require('./formsNg2.html'),
})
export class FormsBootstrapper {
	text: string;
	rating: number;
	validator: any;
	brokenValidator: any;

	@ViewChild('testForm') testForm: FormComponent;

	autosaveAction: AutosaveActionService;

	constructor(autosaveAction: AutosaveActionService) {
		this.autosaveAction = autosaveAction;

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