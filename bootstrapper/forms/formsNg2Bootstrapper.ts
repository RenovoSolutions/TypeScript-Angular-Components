import { Component, Inject, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import __timezone = services.timezone;

import { FormComponent } from '../../source/components/form/form';
import { ButtonSubmitComponent } from '../../source/components/buttons/buttonSubmit/buttonSubmit';
import { INPUT_DIRECTIVES } from '../../source/components/inputs/index';
import { ValidationGroupComponent } from '../../source/components/validationGroup/validationGroup';

export interface ITestItem {
	value: number;
}

@Component({
	selector: 'tsFormsBootstrapper',
	template: require('./formsNg2.html'),
	directives: [
		FormComponent,
		ButtonSubmitComponent,
		INPUT_DIRECTIVES,
		ValidationGroupComponent,
	],
})
export class FormsBootstrapper {
	checked: boolean;
	text: string;
	date: moment.Moment;
	selection: ITestItem;
	rating: number;
	time: string;
	validator: any;

	options: ITestItem[];
	optionsAsync: Observable<ITestItem[]>;

	@ViewChild('testForm') testForm: FormComponent;

	constructor(@Inject(__timezone.timezoneToken) timezoneService: __timezone.ITimezoneService) {
		timezoneService.setCurrentTimezone('-05:00');

		this.text = 'Something is already entered';
		this.options = [
			{ value: 1 },
			{ value: 2 },
			{ value: 3 },
		];
		this.selection = this.options[0];
		this.optionsAsync = this.wait(this.options);
		this.time = '8:00AM';

		this.validator = {
			validate: () => this.rating >= 3,
			errorMessage: 'You must give at least 3 stars',
		};
	}

	wait(data: any): Observable<any> {
		const subject: BehaviorSubject<ITestItem[]> = new BehaviorSubject<ITestItem[]>([]);
		setTimeout(() => subject.next(data), 1000);
		return subject.asObservable();
	}

	waitCallback: { (data: any): Promise<void> } = (data: any) => {
		return new Promise<void>((resolve: Function, reject: Function): void => {
			setTimeout(() => {
				console.log(data);
				resolve();
			}, 1000);
		});
	}

	saveTestForm = (data): any => {
		if (this.testForm.form.dirty) {
			return this.waitCallback(data);
		}
		return false;
	}
}