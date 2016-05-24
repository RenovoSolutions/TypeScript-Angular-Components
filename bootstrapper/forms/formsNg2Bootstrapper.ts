import { Component } from '@angular/core';

import { FormComponent } from '../../source/components/form/form.ng2';
import { ButtonSubmitComponent } from '../../source/components/buttonSubmit/buttonSubmit.ng2';
import { TextboxComponent } from '../../source/components/textbox/textbox.ng2';

@Component({
	selector: 'tsFormsBootstrapper',
	template: require('./formsNg2.html'),
	directives: [FormComponent, ButtonSubmitComponent, TextboxComponent],
})
export class FormsBootstrapper {

}