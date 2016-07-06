import { Component, ViewChild, Input, Inject, Optional, SkipSelf } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { isBoolean } from 'lodash';

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
	directives: [FormGroupDirective],
})
export class FormComponent {
	@Input() save: ISaveAction<any>;

	form: IControlGroup;
	private notification: __notification.INotificationService;
	private formService: FormService;

	get dirty(): boolean {
		return this.form.dirty;
	}

	constructor( @Inject(__notification.notificationToken) notification: __notification.INotificationService
			, formService: FormService
			, @Optional() @SkipSelf() parentForm: FormComponent) {
		this.notification = notification;
		this.formService = formService;
		this.form = <IControlGroup>new FormGroup({});
		this.form.rlNestedFormGroups = [];
		if (!this.save) {
			this.save = <ISaveAction>() => Promise.resolve();
		}

		if (parentForm) {
			parentForm.form.rlNestedFormGroups.push(this.form);
		}
	}

	submit(): boolean {
		if (this.validate()) {
			this.saveForm();
			return true;
		} else {
			this.showErrors();
			return false;
		}
	}

	submitAndWait(): IWaitValue<any> {
		if (this.validate()) {
			return this.saveForm();
		} else {
			this.showErrors();
			return false;
		}
	}

	validate(): boolean {
		return this.formService.isFormValid(this.form);
	}

	saveForm(): IWaitValue<any> {
		const waitOn = this.save(this.form.value);
		this.resetAfterSubmit(waitOn);
		return waitOn;
	}

	markAsPristine(): void {
		// TODO: remove this once angular provides a way to mark as pristine or reset the form
		(<any>this.form)._pristine = true;
		(<any>this.form)._dirty = false;
	}

	private showErrors(): void {
		this.notification.warning(this.formService.getAggregateError(this.form));
	}

	private resetAfterSubmit(waitOn: IWaitValue<any>): void {
		if (waitOn == null || isBoolean(waitOn)) {
			this.markAsPristine();
			return;
		}

		Observable.from(<any>waitOn).subscribe(() => this.markAsPristine());
	}
}