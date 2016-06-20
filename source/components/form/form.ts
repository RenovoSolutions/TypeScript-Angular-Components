import { Component, ViewChild, Input, Inject } from '@angular/core';
import { NgForm, ControlGroup, FormBuilder, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs';

import { services, downgrade } from 'typescript-angular-utilities';
import __notification = services.notification;

import { IWaitValue } from '../busy/busy';
import { FormService } from '../../services/form/form.service';

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

	form: ControlGroup;
	private notification: __notification.INotificationService;
	private formService: FormService;

	constructor( @Inject(__notification.notificationToken) notification: __notification.INotificationService
			, formService: FormService) {
		this.notification = notification;
		this.formService = formService;
		this.form = new ControlGroup({});
		if (!this.save) {
			this.save = <ISaveAction>() => Promise.resolve();
		}
	}

	submit(): IWaitValue<any> {
		if (this.formService.isFormValid(this.form)) {
			return this.save(this.form.value);
		} else {
			this.notification.warning(this.formService.getAggregateError(this.form));
			return false;
		}
	}
}