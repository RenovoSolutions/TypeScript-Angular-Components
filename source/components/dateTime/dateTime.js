'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />
require('../../../libraries/bootstrap-datetimepicker/index');
var angular = require('angular');
var moment = require('moment');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __dateTimeFormatStrings = typescript_angular_utilities_1.services.date;
var __object = typescript_angular_utilities_1.services.object;
var __timezone = typescript_angular_utilities_1.services.timezone;
var input_1 = require('../input/input');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.dateTime';
exports.componentName = 'rlDateTime';
exports.controllerName = 'DateTimeController';
var DateTimeController = (function (_super) {
    __extends(DateTimeController, _super);
    function DateTimeController($scope, $attrs, componentValidatorFactory, $element) {
        _super.call(this, $scope, $attrs, componentValidatorFactory);
        this.$element = $element;
        this.inputType = 'date-time';
        this.useDate = _.isUndefined(this.useDate) ? true : this.useDate;
        this.useTime = _.isUndefined(this.useTime) ? true : this.useTime;
    }
    DateTimeController.prototype.onClearClick = function () {
        this.ngModel.$setViewValue(null);
        this.onClearEvent();
    };
    DateTimeController.prototype.$postLink = function () {
        var _this = this;
        var defaults = this.$element.datetimepicker.defaults;
        var min = this.min != null ? this.min : defaults.minDate;
        var max = this.max != null ? this.max : defaults.maxDate;
        this.setValidity(this.ngModel.$viewValue);
        this.ngModel.$formatters.push(function (value) {
            if (value == null) {
                _this.timezone = __timezone.timezoneService.currentTimezone;
                return null;
            }
            var date = moment(value);
            _this.setValidity(date);
            _this.timezone = __timezone.timezones.get(date.tz());
            return date.format(_this.getFormatOrDefault());
        });
        this.ngModel.$parsers.push(function (value) {
            if (__object.objectUtility.isNullOrEmpty(value)) {
                return null;
            }
            var newMoment = __timezone.timezoneService.buildMomentWithTimezone(value, _this.timezone, _this.getFormatOrDefault());
            _this.setValidity(newMoment);
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
        }).on('change.dp', function () {
            var newValue = _this.$element.find('input').val();
            _this.ngModel.$setViewValue(newValue);
            _this.$scope.$apply();
        });
    };
    DateTimeController.prototype.getFormatOrDefault = function () {
        return this.format || this.defaultFormat(this.useDate, this.useTime);
    };
    DateTimeController.prototype.defaultFormat = function (hasDate, hasTime) {
        if (hasDate && hasTime) {
            return __dateTimeFormatStrings.defaultFormats.dateTimeFormat;
        }
        else if (hasDate) {
            return __dateTimeFormatStrings.defaultFormats.dateFormat;
        }
        else if (hasTime) {
            return __dateTimeFormatStrings.defaultFormats.timeFormat;
        }
        else {
            // revert to default format
            return false;
        }
    };
    DateTimeController.prototype.setValidity = function (date) {
        this.validFormat = __object.objectUtility.isNullOrEmpty(date)
            ? true
            : moment(date).isValid();
    };
    DateTimeController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName, '$element'];
    return DateTimeController;
}(input_1.InputController));
exports.DateTimeController = DateTimeController;
var dateTime = input_1.buildInput({
    template: require('./dateTime.html'),
    controller: exports.controllerName,
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
angular.module(exports.moduleName, [input_1.moduleName])
    .component(exports.componentName, dateTime)
    .controller(exports.controllerName, DateTimeController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlVGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQUViLHlFQUF5RTtBQUV6RSxRQUFPLG1EQUFtRCxDQUFDLENBQUE7QUFFM0QsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQW9DLDhCQUE4QixDQUFDLENBQUE7QUFFbkUsSUFBTyx1QkFBdUIsR0FBRyx1Q0FBUSxDQUFDLElBQUksQ0FBQztBQUMvQyxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxJQUFPLFVBQVUsR0FBRyx1Q0FBUSxDQUFDLFFBQVEsQ0FBQztBQUV0QyxzQkFBeUYsZ0JBQWdCLENBQUMsQ0FBQTtBQUMxRywyQ0FBeUYsOERBQThELENBQUMsQ0FBQTtBQUs3SSxrQkFBVSxHQUFXLDJCQUEyQixDQUFDO0FBQ2pELHFCQUFhLEdBQVcsWUFBWSxDQUFDO0FBQ3JDLHNCQUFjLEdBQVcsb0JBQW9CLENBQUM7QUF3QnpEO0lBQXdDLHNDQUFlO0lBb0J0RCw0QkFBWSxNQUFzQixFQUM5QixNQUF3QixFQUN4Qix5QkFBcUQsRUFDN0MsUUFBa0M7UUFDN0Msa0JBQU0sTUFBTSxFQUFFLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBRHRDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBRzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBRTdCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsV0FBVyxD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