import { FormControl, FormGroup } from '@angular/forms';
import * as angular from 'angular';

export interface IControlValidator extends FormControl {
	rlErrorMessage?: string;
}

export interface IFormValidator extends angular.IFormController {
	rlErrorMessage?: string;
}

export interface INgModelValidator extends angular.INgModelController {
	rlErrorMessage?: string;
}
