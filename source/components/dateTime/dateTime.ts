// uses typings/angularjs
// uses typings/jquery
// uses typings/moment
// uses typescript-angular-utilities

// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path="../../../typings/jquery/jquery.d.ts"/>
// /// <reference path='../../../typings/moment/moment-node.d.ts' />
// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

module rl.ui.components.dateTime {
	'use strict';

	export var moduleName: string = 'rl.ui.components.dateTime';	
	export var directiveName: string = 'rlDateTime';
	
	import __dateTimeFormatStrings = rl.utilities.services.date;
	
	export interface IDateTimeScope extends ng.IScope {
		minuteStepping: number;
	
		// The property that be bound
		ngModel: any;
	
		useDate: boolean;
		useTime: boolean;
	
		min: string | Date | moment.Moment;
		max: string | Date | moment.Moment;
	
		dateTimePickerOpen: boolean;
		validFormat: boolean;
	
		format: string;
	}
	
	dateTime.$inject = [rl.utilities.services.momentWrapper.serviceName, __dateTimeFormatStrings.dateTimeFormatServiceName];
	function dateTime(moment: moment.MomentStatic
					, dateTimeFormatStrings: __dateTimeFormatStrings.IDateFormatStrings): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			template: `
				<div class="input-group" ng-class="{ 'has-warning': !validFormat}" id="{{inputId}}">
					<input type="text" class="form-control" ng-model="ngModel" />
					<span class="input-group-btn">
						<button class="btn btn-default show-date-picker" ng-click="toggle()"><i class="fa fa-calendar"></i></button>
					</span>
				</div>
			`,
			require: '?^ngModel',
			scope: {
				minuteStepping: '=',
				ngModel: '=',
				useDate: '=',
				useTime: '=',
				min: '=',
				max: '=',
			},
			link: (scope: IDateTimeScope
				, element: ng.IAugmentedJQuery
				, attrs: ng.IAttributes
				, ngModel: ng.INgModelController): void => {
				// defaults to true
				var hasDate: boolean = scope.useDate != null ? scope.useDate : true;
				var hasTime: boolean = scope.useTime != null ? scope.useTime : true;
	
				var defaults: bootstrapDateTimePicker.IConfiguration = element.datetimepicker.defaults;
				var min: string | Date | moment.Moment
					= scope.min != null ? scope.min : defaults.minDate;
				var max: string | Date | moment.Moment
					= scope.max != null ? scope.max : defaults.maxDate;
	
				scope.$watch('ngModel', (newValue: any): void => {
					if (newValue !== '') {
						scope.validFormat = moment(newValue).isValid();
					}
				});
	
				// --- Implementation ---
				element.datetimepicker({
					stepping: scope.minuteStepping || 1,
					format: scope.format || defaultFormat(hasDate, hasTime),
					direction: 'bottom',
					elementHeight: 32,
					pickDate: hasDate,
					pickTime: hasTime,
					minDate: min,
					maxDate: max,
				}).on('change.dp', function (): void {
					var newValue: any = $(this).find('input').val();
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
		.directive(directiveName, dateTime);
}
