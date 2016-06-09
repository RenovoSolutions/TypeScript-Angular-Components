import { ControlGroup, Control } from '@angular/common';
import { filter, mapValues, first, every } from 'lodash';

import { IControlValidator } from '../../types/formValidators';

export class FormService {
	isFormValid(form: ControlGroup): boolean {
		return every(form.controls, (control: Control): boolean => {
			return control.valid;
		});
	}

	getAggregateError(form: ControlGroup): string {
		const filteredForm: any = filter(form.controls, (control: IControlValidator): boolean => {
			return control != null && control.rlErrorMessage != null;
		});
		const errors: string[] = <any>mapValues(filteredForm, 'rlErrorMessage');
		return first(errors);
	}
}
