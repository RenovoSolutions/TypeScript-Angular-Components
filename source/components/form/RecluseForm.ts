import { Component, forwardRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormComponent } from '../form/form';

@Component({
	selector: 'rlRecluseForm',
	template: '<ng-content></ng-content>',
	providers: [
		{
			provide: FormComponent,
			useExisting: forwardRef(() => RecluseFormComponent),
		},
	],
})
export class RecluseFormComponent {
	form = new FormGroup({});
}
