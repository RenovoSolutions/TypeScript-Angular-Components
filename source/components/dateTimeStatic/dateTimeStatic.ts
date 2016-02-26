'use strict';

// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />

import * as angular from 'angular';
import * as moment from 'moment';


export let moduleName: string = 'rl.ui.components.dateTimeStatic';
export let directiveName: string = 'rlDateTimeStatic';
export let controllerName: string = 'DateTimeStaticController';

import { services } from 'typescript-angular-utilities';
import __date = services.date;

export class DateTimeStaticController {
	dateValue: string;
	includeTime: boolean = false;
	displayValue: string;
	displayTimeZone: boolean = true;

	constructor(private dateUtility: __date.IDateUtility) {
		this.displayValue = '';
		if (this.dateValue != null && this.dateUtility.isDate(this.dateValue)) {
			this.displayValue = moment(this.dateValue).format('MM/DD/YYYY');

			if (this.includeTime) {
				this.displayValue = this.displayValue + moment(this.dateValue).format('+-HHmm');
			}
		}
	}
}

dateTimeStatic.$inject = [];
function dateTimeStatic(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./dateTimeStatic.html'),
		controller: controllerName,
		controllerAs: 'view',
		scope: {},
		bindToController: {
			dateValue: '=',
			includeTime: '=',
			displayTimeZone: '='
		}
	};
}

angular.module(moduleName, [])
	.directive(directiveName, dateTimeStatic)
	.controller(controllerName, DateTimeStaticController);