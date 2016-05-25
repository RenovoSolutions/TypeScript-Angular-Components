import { Component } from '@angular/core';

import { FormComponent } from '../../source/components/form/form.ng2';
import { ButtonSubmitComponent } from '../../source/components/buttonSubmit/buttonSubmit.ng2';
import { CheckboxComponent } from '../../source/components/checkbox/checkbox.ng2';
import { TextboxComponent } from '../../source/components/textbox/textbox.ng2';
import { TextareaComponent } from '../../source/components/textarea/textarea.ng2';
import { UserRatingComponent } from '../../source/components/userRating/userRating.ng2';

@Component({
	selector: 'tsFormsBootstrapper',
	template: require('./formsNg2.html'),
	directives: [
		FormComponent,
		ButtonSubmitComponent,
		CheckboxComponent,
		TextboxComponent,
		TextareaComponent,
		UserRatingComponent,
	],
})
export class FormsBootstrapper {
	checked: boolean;
	text: string;
	rating: number;

	constructor() {
		this.text = 'Something is already entered';
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