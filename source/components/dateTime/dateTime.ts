'use strict';

// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />

import '../../../libraries/bootstrap-datetimepicker/index';

import * as angular from 'angular';
import * as moment from 'moment';
import * as $ from 'jquery';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import __dateTimeFormatStrings = services.date;
import __validation = services.validation;
import __object = services.object;

import {
	IComponentValidator,
	IComponentValidatorFactory,
	factoryName as componentValidatorFactoryName,
	moduleName as componentValidatorModuleName,
} from '../../services/componentValidator/componentValidator.service';

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

	validator: __validation.IValidationHandler;
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

	validator: __validation.IValidationHandler;

	ngModel: angular.INgModelController;
	dateTimeValidator: IComponentValidator;

	static $inject: string[] = ['$scope', componentValidatorFactoryName];
	constructor($scope: angular.IScope
			, componentValidatorFactory: IComponentValidatorFactory) {
		let unregister: Function = $scope.$watch((): any => { return this.ngModel; }, (value: angular.INgModelController): void => {
			if (!_.isUndefined(this.validator)) {
				this.dateTimeValidator = componentValidatorFactory.getInstance({
					ngModel: this.ngModel,
					$scope: $scope,
					validators: [this.validator],
				});
			}
			unregister();
		});
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
			validator: '=',
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
				dateTime.validFormat = object.isNullOrEmpty(newValue)
									? true
									: moment(newValue).isValid();
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

angular.module(moduleName, [services.moment.moduleName, services.date.moduleName, componentValidatorModuleName, __object.moduleName])
	.directive(directiveName, dateTime)
	.controller(controllerName, DateTimeController);
