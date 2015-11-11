'use strict';

// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />

import * as angular from 'angular';
import * as moment from 'moment';
import * as $ from 'jquery';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

export let moduleName: string = 'rl.ui.components.dateTime';
export let directiveName: string = 'rlDateTime';
export let controllerName: string = 'DateTimeController';

import __dateTimeFormatStrings = services.date;

export interface IDateTimeBindings {
	minuteStepping: number;

	useDate: boolean;
	useTime: boolean;

	min: string | Date | moment.Moment;
	max: string | Date | moment.Moment;

	dateTimePickerOpen: boolean;
	validFormat: boolean;

	format: string;
}

export interface IDateTimeScope extends angular.IScope {
	dateTime: DateTimeController;
}

export class DateTimeController {
	minuteStepping: number;

	useDate: boolean;
	useTime: boolean;

	min: string | Date | moment.Moment;
	max: string | Date | moment.Moment;

	dateTimePickerOpen: boolean;
	validFormat: boolean;

	format: string;

	ngModel: angular.INgModelController;
}

dateTime.$inject = [services.moment.serviceName, __dateTimeFormatStrings.dateTimeFormatServiceName];
function dateTime(moment: moment.MomentStatic
				, dateTimeFormatStrings: __dateTimeFormatStrings.IDateFormatStrings): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./dateTime.html'),
		require: '?^ngModel',
		controller: controllerName,
		controllerAs: 'dateTime',
		scope: {},
		bindToController: {
			minuteStepping: '=',
			useDate: '=',
			useTime: '=',
			min: '=',
			max: '=',
		},
		link: (scope: IDateTimeScope
			, element: angular.IAugmentedJQuery
			, attrs: angular.IAttributes
			, ngModel: angular.INgModelController): void => {
			let dateTime: DateTimeController = scope.dateTime;
			dateTime.ngModel = ngModel;
			// defaults to true
			let hasDate: boolean = _.isUndefined(dateTime.useDate) ? true : dateTime.useDate;
			let hasTime: boolean = _.isUndefined(dateTime.useTime) ? true : dateTime.useTime;

			let defaults: bootstrapDateTimePicker.IConfiguration = element.datetimepicker.defaults;
			let min: string | Date | moment.Moment
				= dateTime.min != null ? dateTime.min : defaults.minDate;
			let max: string | Date | moment.Moment
				= dateTime.max != null ? dateTime.max : defaults.maxDate;

			scope.$watch((): any => { return ngModel.$viewValue; }, (newValue: any): void => {
				if (newValue !== '') {
					dateTime.validFormat = moment(newValue).isValid();
				}
			});

			// --- Implementation ---
			element.datetimepicker({
				stepping: dateTime.minuteStepping || 1,
				format: dateTime.format || defaultFormat(hasDate, hasTime),
				direction: 'bottom',
				elementHeight: 32,
				pickDate: hasDate,
				pickTime: hasTime,
				minDate: min,
				maxDate: max,
			}).on('change.dp', function (): void {
				let newValue: any = $(this).find('input').val();
				ngModel.$setViewValue(newValue);
				scope.$apply();
			});

			function defaultFormat(hasDate: boolean, hasTime: boolean): string | boolean {
				if (hasDate && hasTime) {
					return dateTimeFormatStrings.dateTimeFormat;
				} else if (hasDate) {
					return dateTimeFormatStrings.dateFormat;
				} else if (hasTime) {
					return dateTimeFormatStrings.timeFormat;
				} else {
					// revert to default format
					return false;
				}
			}
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, dateTime)
	.controller(controllerName, DateTimeController);
