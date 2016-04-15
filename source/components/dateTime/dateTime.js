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
        this.ngModel.$setViewValue('');
        this.onClearEvent();
    };
    DateTimeController.prototype.$postLink = function () {
        var _this = this;
        var defaults = this.$element.datetimepicker.defaults;
        var min = this.min != null ? this.min : defaults.minDate;
        var max = this.max != null ? this.max : defaults.maxDate;
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