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
angular.module(exports.moduleName, [typescript_angular_utilities_1.services.moment.moduleName, typescript_angular_utilities_1.services.date.moduleName, input_1.moduleName, __object.moduleName])
    .component(exports.componentName, dateTime)
    .controller(exports.controllerName, DateTimeController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlVGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQUViLHlFQUF5RTtBQUV6RSxRQUFPLG1EQUFtRCxDQUFDLENBQUE7QUFFM0QsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFFeEQsSUFBTyx1QkFBdUIsR0FBRyx1Q0FBUSxDQUFDLElBQUksQ0FBQztBQUMvQyxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxJQUFPLFVBQVUsR0FBRyx1Q0FBUSxDQUFDLFFBQVEsQ0FBQztBQUV0QyxzQkFBeUYsZ0JBQWdCLENBQUMsQ0FBQTtBQUMxRywyQ0FBeUYsOERBQThELENBQUMsQ0FBQTtBQUs3SSxrQkFBVSxHQUFXLDJCQUEyQixDQUFDO0FBQ2pELHFCQUFhLEdBQVcsWUFBWSxDQUFDO0FBQ3JDLHNCQUFjLEdBQVcsb0JBQW9CLENBQUM7QUF3QnpEO0lBQXdDLHNDQUFlO0lBb0J0RCw0QkFBWSxNQUFzQixFQUM5QixNQUF3QixFQUN4Qix5QkFBcUQsRUFDN0MsUUFBa0M7UUFDN0Msa0JBQU0sTUFBTSxFQUFFLE1BQU0sRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBRHRDLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBRzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBRTdCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsV0FBVyxD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