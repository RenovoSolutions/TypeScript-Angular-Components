import { Component, Inject } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import __timezone = services.timezone;

import { FormComponent } from '../../source/components/form/form';
import { ButtonSubmitComponent } from '../../source/components/buttonSubmit/buttonSubmit';
import { CheckboxComponent } from '../../source/components/checkbox/checkbox';
import { DateTimeComponent } from '../../source/components/dateTime/dateTime';
import { TextboxComponent } from '../../source/components/textbox/textbox';
import { TextareaComponent } from '../../source/components/textarea/textarea';
import { RADIO_DIRECTIVES } from '../../source/components/radio/index';
import { SelectComponent } from '../../source/components/select/select';
import { SpinnerComponent } from '../../source/components/spinner/spinner';
import { UserRatingComponent } from '../../source/components/userRating/userRating.ng2';

export interface ITestItem {
	value: number;
}

@Component({
	selector: 'tsFormsBootstrapper',
	template: require('./formsNg2.html'),
	directives: [
		FormComponent,
		ButtonSubmitComponent,
		CheckboxComponent,
		DateTimeComponent,
		TextboxComponent,
		TextareaComponent,
		RADIO_DIRECTIVES,
		SelectComponent,
		SpinnerComponent,
		UserRatingComponent,
	],
})
export class FormsBootstrapper {
	checked: boolean;
	text: string;
	date: moment.Moment;
	selection: ITestItem;
	rating: number;

	options: ITestItem[];
	optionsAsync: Observable<ITestItem[]>;

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
}