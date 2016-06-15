import { Component, Inject } from '@angular/core';
import { mapValues } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __date = services.date;
import __transform = services.transform;
import __timezone = services.timezone;

import { SIMPLE_CARD_DIRECTIVES } from '../../source/components/simpleCardList/index';
import { CheckboxComponent } from '../../source/components/inputs/checkbox/checkbox';
import { TextboxComponent } from '../../source/components/inputs/textbox/textbox';
import { DateFilter } from '../../source/components/cardContainer/filters/dateFilter/dateFilter.service';
import { DateFilterComponent } from '../../source/components/cardContainer/filters/dateFilter/dateFilter.component';

@Component({
	selector: 'tsCardsBootstrapper',
	template: require('./cardsNg2.html'),
	directives: [
		SIMPLE_CARD_DIRECTIVES,
		CheckboxComponent,
		TextboxComponent,
		DateFilterComponent,
	],
})
export class CardsBootstrapper {
	alwaysOpen: boolean = false;
	dateFilter: DateFilter;

	constructor(@Inject(__timezone.timezoneToken) timezone: __timezone.ITimezoneService) {
		timezone.setCurrentTimezone('-05:00');
		this.dateFilter = new DateFilter({
			type: 'dateFilter',
			valueSelector: 'date',
		}, __date.dateUtility, __transform.transform);
		this.dateFilter.subscribe(value => console.log(mapValues(value, date => date != null ? date.format(__date.defaultFormats.dateTimeFormat) : null)));
	}

	submitAsync: { (data: any): Promise<void> } = (data: any) => {
		return new Promise<void>((resolve: Function, reject: Function): void => {
			setTimeout(() => {
				console.log(data);
				resolve();
			}, 1000);
		});
	}
}