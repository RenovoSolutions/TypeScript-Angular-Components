import { Component, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __timezone = services.timezone;

export interface ITestItem {
	value: number;
}

export interface ITestItem2 {
	value: string;
}

@Component({
	selector: 'tsinputsBootstrapper',
	template: require('./inputsNg2.html'),
})
export class InputsBootstrapper {
	checked: boolean;
	text: string;
	date: moment.Moment;
	selection: ITestItem;
	rating: number;
	time: string;

	options: ITestItem[];
	optionsAsync: Observable<ITestItem[]>;
	typeaheadOptions: ITestItem2[];
	selections: ITestItem2[];

	constructor(timezoneService: __timezone.TimezoneService) {
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

		this.typeaheadOptions = [
			{ value: 'Option 1' },
			{ value: 'Option 2' },
			{ value: 'Option 3' },
			{ value: 'Option 4' },
			{ value: 'Option 5' },
		];

		this.selections = [this.typeaheadOptions[0], this.typeaheadOptions[2]]
	}

	wait(data: any): Observable<any> {
		const subject: BehaviorSubject<ITestItem[]> = new BehaviorSubject<ITestItem[]>([]);
		setTimeout(() => subject.next(data), 1000);
		return subject.asObservable();
	}

	getOptions = (): Observable<any> => {
		return Observable.of(this.typeaheadOptions);
	}

	searchOptions = (search: string): Observable<any> => {
		return this.wait(filter(this.typeaheadOptions, option => option.value.search(search) != -1));
	}

	createOption = (text: string): any => {
		return { value: text };
	}

	log(value: any): void {
		console.log(value);
	}
}