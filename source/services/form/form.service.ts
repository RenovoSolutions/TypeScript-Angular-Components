import { FormGroup, FormControl } from '@angular/forms';
import { filter, first, map } from 'lodash';

import { IControlValidator} from '../../types/formValidators';

export class FormService {
	getAggregateError(form: FormGroup): string {

		const filteredForm: any = filter(form.controls, (control: IControlValidator): boolean => {
			return control != null && !control.valid;
		});

		const errors: string[] = <any>map(filteredForm, 'validation.rlErrorMessage');

		const filteredErrors = filter(errors, (error: string): boolean => error ? true : false )

		if (filteredErrors.length > 0) {
			return first(filteredErrors);
		}else {
			return first(map(form.controls, nestedForm => this.getAggregateError(<any>nestedForm)));
		}
	}
}
