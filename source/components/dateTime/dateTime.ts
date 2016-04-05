'use strict';

// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />

import '../../../libraries/bootstrap-datetimepicker/index';

import * as angular from 'angular';
import * as moment from 'moment';
import * as $ from 'jquery';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import __dateTimeFormatStrings = services.date;
import __object = services.object;
import __timezone = services.timezone;

import { input, InputController, moduleName as inputModule, IInputAttributes } from '../input/input';
import { IComponentValidatorFactory, factoryName as componentValidatorFactoryName } from '../../services/componentValidator/componentValidator.service';

import { INgModelValidator } from '../../types/formValidators';
import { directiveName as requiredDirectiveName, RequiredController } from '../../behaviors/required/required';

export let moduleName: string = 'rl.ui.components.dateTime';
export let directiveName: string = 'rlDateTime';
export let controllerName: string = 'DateTimeController';

export interface IDateTimeBindings {
	minuteStepping: number;

	useDate: boolean;
	useTime: boolean;

	min: string | Date | moment.Moment;
	max: string | Date | moment.Moment;

	dateTimePickerOpen: boolean;
	validFormat: boolean;

	format: string;

	onClearEvent(): void;

}

export interface IDateTimeScope extends angular.IScope {
	dateTime: DateTimeController;
}

export class DateTimeController extends InputController {
	minuteStepping: number;

	useDate: boolean;
	useTime: boolean;

	clearButton: boolean;
	onClearEvent: { (): void } ;

	min: string | Date | moment.Moment;
	max: string | Date | moment.Moment;

	dateTimePickerOpen: boolean;
	validFormat: boolean;

	format: string;

	timezone: __timezone.ITimezone;

	static $inject: string[] = ['$scope', '$attrs', componentValidatorFactoryName];
	constructor($scope: angular.IScope
			, $attrs: IInputAttributes
			, componentValidatorFactory: IComponentValidatorFactory) {
		super($scope, $attrs, componentValidatorFactory);

		this.inputType = 'date-time';

		this.useDate = _.isUndefined(this.useDate) ? true : this.useDate;
		this.useTime = _.isUndefined(this.useTime) ? true : this.useTime;
	}

	onClearClick(): void {
		this.ngModel.$setViewValue('');
		this.onClearEvent();
	}
}

dateTime.$inject = [services.moment.serviceName, __dateTimeFormatStrings.dateTimeFormatServiceName, __object.serviceName];
function dateTime(moment: moment.MomentStatic
				, dateTimeFormatStrings: __dateTimeFormatStrings.IDateFormatStrings
				, object: __object.IObjectUtility): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./dateTime.html'),
		require: { ngModel: 'ngModel', required: '?' + requiredDirectiveName },
		controller: controllerName,
		controllerAs: 'dateTime',
		scope: {},
		bindToController: {
			minuteStepping: '<?',
			useDate: '<?',
			useTime: '<?',
			min: '<?',
			max: '<?',
			validator: '<?',
			clearButton: '<?',
			onClearEvent: '&'
		},
		link: (scope: IDateTimeScope
			, element: angular.IAugmentedJQuery
			, attrs: angular.IAttributes
			, controllers: any): void => {
			let dateTime: DateTimeController = scope.dateTime;

			let ngModel: INgModelValidator = controllers.ngModel;
			dateTime.ngModel = ngModel;

			let defaults: bootstrapDateTimePicker.IConfiguration = element.datetimepicker.defaults;
			let min: string | Date | moment.Moment
				= dateTime.min != null ? dateTime.min : defaults.minDate;
			let max: string | Date | moment.Moment
				= dateTime.max != null ? dateTime.max : defaults.maxDate;

			ngModel.$formatters.push((value: moment.Moment): string => {
				if (value == null) {
					dateTime.timezone = __timezone.timezoneService.currentTimezone;
					return null;
				}

				dateTime.timezone = __timezone.timezones.get(value.tz());
				return moment(value).format(getFormatOrDefault());
			});

			ngModel.$parsers.push((value: string): moment.Moment => {
				return __timezone.timezoneService.buildMomentWithTimezone(value, dateTime.timezone, getFormatOrDefault());
			});

			scope.$watch((): any => { return ngModel.$modelValue; }, (newValue: any): void => {
				dateTime.validFormat = object.isNullOrEmpty(newValue)
					? true
					: moment(newValue).isValid();
			});
			element.find('.show-date-picker').datetimepicker({
				stepping: dateTime.minuteStepping || 1,
				format: getFormatOrDefault(),
				direction: 'bottom',
				elementHeight: 2,
				pickDate: dateTime.useDate,
				pickTime: dateTime.useTime,
				minDate: min,
				maxDate: max,
			}).on('change.dp', function(): void {
				let newValue: any = $(this).find('input').val();
				ngModel.$setViewValue(newValue);
				scope.$apply();
			});

			function getFormatOrDefault(): string {
				return dateTime.format || <string>defaultFormat(dateTime.useDate, dateTime.useTime);
			}

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

angular.module(moduleName, [services.moment.moduleName, services.date.moduleName, inputModule, __object.moduleName])
	.directive(directiveName, dateTime)
	.controller(controllerName, DateTimeController);
