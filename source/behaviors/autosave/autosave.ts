import { Directive, Self } from '@angular/core';

import { FormComponent } from '../../components/form/form';

@Directive({
	selector: '[rlAutosave]',
})
export class AutosaveDirective {
	form: FormComponent;

	constructor( @Self() form: FormComponent) {
		this.form = form;
		form.form.statusChanges.subscribe(value => console.log(value));
	}
}
