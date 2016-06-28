import { Component, ViewChild, Input, Inject } from '@angular/core';
import { NgForm, ControlGroup, FormBuilder, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs';

import { services, downgrade } from 'typescript-angular-utilities';
import __notification = services.notification;

import { IWaitValue } from '../busy/busy';
import { FormService } from '../../services/form/form.service';
import { IControlGroup } from '../../types/formValidators';

export interface IBaseFormInputs {
	save: string;
}

export const baseInputs: IBaseFormInputs = {
	save: 'save',
};

export interface ISaveAction<T> {
	(data: T): IWaitValue<T>;
}

@Component({
	selector: 'rlForm',
	template: require('./form.html'),
	directives: [FORM_DIRECTIVES],
})
export class FormComponent {
	@Input() save: ISaveAction<any>;

	form: IControlGroup;
	private notification: __notification.INotificationService;
	private formService: FormService;

	constructor( @Inject(__notification.notificationToken) notification: __notification.INotificationService
			, formService: FormService) {
		this.notification = notification;
		this.formService = formService;
		this.form = <IControlGroup>new ControlGroup({});
		this.form.rlNestedFormGroups = [];
		if (!this.save) {
			this.save = <ISaveAction>() => Promise.resolve();
		}
	}

	submit(): IWaitValue<any> {
		if (this.validate()) {
			return this.saveForm();
		} else {
			this.notification.warning(this.formService.getAggregateError(this.form));
			return false;
		}
	}

	validate(): boolean {
		return this.formService.isFormValid(this.form);
	}

	saveForm(): IWaitValue<any> {
		return this.save(this.form.value);
	}
}