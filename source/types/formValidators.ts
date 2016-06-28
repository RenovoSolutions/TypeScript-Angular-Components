import { Control, ControlGroup } from '@angular/common';
import * as angular from 'angular';

export interface IControlValidator extends Control {
	rlErrorMessage?: string;
}

export interface IControlGroup extends ControlGroup {
	rlNestedForms: IControlGroup[];
}

export interface IFormValidator extends angular.IFormController {
	rlErrorMessage?: string;
}

export interface INgModelValidator extends angular.INgModelController {
	rlErrorMessage?: string;
}
