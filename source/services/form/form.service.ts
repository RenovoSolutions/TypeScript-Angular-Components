import { FormGroup, FormControl } from '@angular/forms';
import { filter, mapValues, first, every } from 'lodash';

import { IControlValidator, IControlGroup } from '../../types/formValidators';

export class FormService {
	isFormValid(form: IControlGroup): boolean {
		const allControlsValid = every(form.controls, (control: FormControl): boolean => {
			return control.valid;
		})
		const nestedFormsValid = every(form.rlNestedFormGroups, (nestedForm: IControlGroup): boolean => {
			return this.isFormValid(nestedForm);
		});
		return allControlsValid && nestedFormsValid;
	}

	getAggregateError(form: IControlGroup): string {
		const filteredForm: any = filter(form.controls, (control: IControlValidator): boolean => {
			return control != null && control.rlErrorMessage != null;
		});
		const errors: string[] = <any>mapValues(filteredForm, 'rlErrorMessage');
		return first(errors);
	}
}
