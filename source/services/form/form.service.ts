'use strict';

import * as angular from 'angular';

import { IFormValidator } from '../../types/formValidators';

export let moduleName: string = 'rl.ui.services.form';
export let serviceName: string = 'formService';

export interface IFormService {
	getErrorMessage(form: IFormValidator): string;
}

class FormService implements IFormService {
	getErrorMessage(form: IFormValidator): string {
		return 'string';
	}
}

angular.module(moduleName, [])
	.service(serviceName, FormService);