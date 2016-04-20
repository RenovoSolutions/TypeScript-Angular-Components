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

import { buildInput, InputController, moduleName as inputModule, IInputAttributes } from '../input/input';
import { IComponentValidatorFactory, factoryName as componentValidatorFactoryName } from '../../services/componentValidator/componentValidator.service';

import { INgModelValidator } from '../../types/formValidators';
import { directiveName as requiredDirectiveName, RequiredController } from '../../behaviors/required/required';

export let moduleName: string = 'rl.ui.components.dateTime';
export let componentName: string = 'rlDateTime';
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

	static $inject: string[] = ['$scope', '$attrs', componentValidatorFactoryName, '$element'];
	constructor($scope: angular.IScope
			, $attrs: IInputAttributes
			, componentValidatorFactory: IComponentValidatorFactory
			, private $element: angular.IAugmentedJQuery) {
		super($scope, $attrs, componentValidatorFactory);

		this.inputType = 'date-time';

		this.useDate = _.isUndefined(this.useDate) ? true : this.useDate;
		this.useTime = _.isUndefined(this.useTime) ? true : this.useTime;
	}

	onClearClick(): void {
		this.ngModel.$setViewValue(null);
		this.onClearEvent();
	}

	$postLink(): void {
		let defaults: bootstrapDateTimePicker.IConfiguration = this.$element.datetimepicker.defaults;
		let min: string | Date | moment.Moment
			= this.min != null ? this.min : defaults.minDate;
		let max: string | Date | moment.Moment
			= this.max != null ? this.max : defaults.maxDate;

		this.setValidity(this.ngModel.$viewValue);
		this.ngModel.$formatters.push((value: moment.Moment): string => {
			if (value == null) {
				this.timezone = __timezone.timezoneService.currentTimezone;
				return null;
			}

			const date: moment.Moment = moment(value);

			this.setValidity(date);

			this.timezone = __timezone.timezones.get(date.tz());
			return date.format(this.getFormatOrDefault());
		});

		this.ngModel.$parsers.push((value: string): moment.Moment => {
			const newMoment: moment.Moment = __timezone.timezoneService.buildMomentWithTimezone(value, this.timezone, this.getFormatOrDefault());
			this.setValidity(newMoment);
			return newMoment;
		});

		this.$element.find('.show-date-picker').datetimepicker({
			stepping: this.minuteStepping || 1,
			format: this.getFormatOrDefault(),
			direction: 'bottom',
			elementHeight: 2,
			pickDate: this.useDate,
			pickTime: this.useTime,
			minDate: min,
			maxDate: max,
		}).on('change.dp', (): void => {
			let newValue: any = this.$element.find('input').val();
			this.ngModel.$setViewValue(newValue);
			this.$scope.$apply();
		});
	}

	private getFormatOrDefault(): string {
		return this.format || <string>this.defaultFormat(this.useDate, this.useTime);
	}

	private defaultFormat(hasDate: boolean, hasTime: boolean): string | boolean {
		if (hasDate && hasTime) {
			return __dateTimeFormatStrings.defaultFormats.dateTimeFormat;
		} else if (hasDate) {
			return __dateTimeFormatStrings.defaultFormats.dateFormat;
		} else if (hasTime) {
			return __dateTimeFormatStrings.defaultFormats.timeFormat;
		} else {
			// revert to default format
			return false;
		}
	}

	private setValidity(date: moment.Moment): void {
		this.validFormat = __object.objectUtility.isNullOrEmpty(date)
			? true
			: moment(date).isValid();
	}
}

let dateTime: angular.IComponentOptions = buildInput({
	template: require('./dateTime.html'),
	controller: controllerName,
	controllerAs: 'dateTime',
	bindings: {
		minuteStepping: '<?',
		useDate: '<?',
		useTime: '<?',
		min: '<?',
		max: '<?',
		clearButton: '<?',
		onClearEvent: '&',
	},
});

angular.module(moduleName, [services.moment.moduleName, services.date.moduleName, inputModule, __object.moduleName])
	.component(componentName, dateTime)
	.controller(controllerName, DateTimeController);
