import { Component, Inject } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

import { services } from 'typescript-angular-utilities';
import __timezone = services.timezone;

import { FormComponent } from '../../source/components/form/form';
import { ButtonSubmitComponent } from '../../source/components/buttons/buttonSubmit/buttonSubmit';
import { INPUT_DIRECTIVES } from '../../source/components/inputs/index';

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