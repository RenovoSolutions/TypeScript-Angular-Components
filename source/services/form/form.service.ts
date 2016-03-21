'use strict';

import * as angular from 'angular';

import { IFormValidator } from '../../types/formValidators';

export let moduleName: string = 'rl.ui.services.form';
export let serviceName: string = 'formService';

export interface IFormService {
	getAggregateError(form: IFormValidator): string;
}

class FormService implements IFormService {
	getAggregateError(form: IFormValidator): string {
		let filteredForm: any = _.filter(form, (prop: any): boolean => {
			return prop != null && prop.rlErrorMessage != null;
		});
		let errors: string[] = <any>_.mapValues(filteredForm, 'rlErrorMessage');
		return _.first(errors);
	}
}

angular.module(moduleName, [])
	.service(serviceName, FormService);