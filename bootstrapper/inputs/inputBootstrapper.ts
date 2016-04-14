import * as angular from 'angular';
import * as moment from 'moment';
import 'moment-timezone';

import { services } from 'typescript-angular-utilities';
import __timezone = services.timezone;

interface ITestItem {
	name: string;
}

class InputTestController {
	set: ITestItem[];
	options: ITestItem[];
	typeaheadList: ITestItem[];
	date: moment.Moment;
	date2: moment.Moment;

	static $inject: string[] = ['$q'];
	constructor(private $q: angular.IQService) {}

	$onInit(): void {
		this.options = [
			{ name: 'item1' },
			{ name: 'item2' },
			{ name: 'item3' },
			{ name: 'item4' },
			{ name: 'item5' },
		];

		this.typeaheadList = [this.options[0], this.options[4]];

		this.date = moment('2016-04-01T12:00:00.000-08:00').tz('US/Pacific');
		__timezone.timezoneService.setCurrentTimezone('-08:00');
	}

	select(value: ITestItem): void {
		this.set.push(value);
	}

	create(value: string): ITestItem {
		return {
			name: value,
		};
	}

	getOptions(): angular.IPromise<ITestItem[]> {
		return this.$q.when(_.clone(this.options));
	}

	logDates(): void {
		const format = 'YYYY-MM-DDTHH:mm:ssZ';
		console.log(this.date.format(format));
		console.log(this.date2.format(format));
	}
}

angular.module('app')
	.controller('InputTestController', InputTestController);