import { Component } from '@angular/core';

import { FormComponent } from '../../source/components/form/form.ng2';
import { ButtonSubmitComponent } from '../../source/components/buttonSubmit/buttonSubmit.ng2';
import { CheckboxComponent } from '../../source/components/checkbox/checkbox.ng2';
import { TextboxComponent } from '../../source/components/textbox/textbox.ng2';
import { TextareaComponent } from '../../source/components/textarea/textarea.ng2';
import { RADIO_DIRECTIVES } from '../../source/components/radio/index';
import { UserRatingComponent } from '../../source/components/userRating/userRating.ng2';

export interface ITestItem {
	value: number;
}

@Component({
	selector: 'tsFormsBootstrapper',
	template: require('./formsNg2.html'),
	directives: [
		FormComponent,
		ButtonSubmitComponent,
		CheckboxComponent,
		TextboxComponent,
		TextareaComponent,
		RADIO_DIRECTIVES,
		UserRatingComponent,
	],
})
export class FormsBootstrapper {
	checked: boolean;
	text: string;
	selection: ITestItem;
	rating: number;

	options: ITestItem[];

	constructor() {
		this.text = 'Something is already entered';
		this.options = [
			{ value: 1 },
			{ value: 2 },
			{ value: 3 },
		];
		this.selection = this.options[0];
	}

	waitCallback: { (data: any): Promise<void> } = (data: any) => {
		return new Promise<void>((resolve: Function, reject: Function): void => {
			setTimeout(() => {
				console.log(data);
				resolve();
			}, 1000);
		});
	}
}