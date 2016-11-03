import { Component, ViewChild, Input, Optional, SkipSelf } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { isBoolean } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __notification = services.notification;

import { AsyncHelper, IWaitValue } from '../../services/async/async.service';
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
})
export class FormComponent {
	@Input() save: ISaveAction<any>;

	form: IControlGroup;
	private notification: __notification.INotificationService;
	asyncHelper: AsyncHelper;
	private formService: FormService;
	submitted: Subject<void> = new Subject<void>();

	get dirty(): boolean {
		return this.form.dirty;
	}

	constructor(notification: __notification.NotificationService
			, asyncHelper: AsyncHelper
			, formService: FormService
			, @Optional() @SkipSelf() parentForm: FormComponent) {
		this.notification = notification;
		this.asyncHelper = asyncHelper;
		this.formService = formService;
		this.form = <IControlGroup>new FormGroup({});
		this.form.rlNestedFormGroups = [];
		if (!this.save) {
			this.save = <ISaveAction>() => null;
		}

		if (parentForm) {
			parentForm.form.rlNestedFormGroups.push(this.form);
		}
	}

	submit(): boolean {
		if (this.validate()) {
			// kicks off the subscription since no observable is returned
			this.saveForm().subscribe();
			return true;
		} else {
			this.showErrors();
			return false;
		}
	}

	submitAndWait(): Observable<any> {
		if (this.validate()) {
			return this.saveForm();
		} else {
			this.showErrors();
			return Observable.of(false);
		}
	}

	validate(): boolean {
		return this.formService.isFormValid(this.form);
	}

	reset(): void {
		this.form.reset();
	}

	saveForm(): Observable<any> {
		const waitOn = this.save(this.form.value);
		const request = this.asyncHelper.waitAsObservable(waitOn);
		return this.resetAfterSubmit(request);
	}

	private showErrors(): void {
		const error = this.formService.getAggregateError(this.form);
		if (error) {
			this.notification.warning(error);
		} else {
			throw new Error('The form is invalid but there are no validation errors to show');
		}
	}

	private resetAfterSubmit(request: Observable<any>): Observable<any> {
		return request.do(() => this.form.markAsPristine());
	}
}
