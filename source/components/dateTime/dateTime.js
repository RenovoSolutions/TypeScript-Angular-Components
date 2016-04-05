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
            _this.timezone = __timezone.timezones.get(value.tz());
            return moment(value).format(_this.getFormatOrDefault());
        });
        this.ngModel.$parsers.push(function (value) {
            return __timezone.timezoneService.buildMomentWithTimezone(value, _this.timezone, _this.getFormatOrDefault());
        });
        this.$scope.$watch(function () { return _this.ngModel.$modelValue; }, function (newValue) {
            _this.validFormat = __object.objectUtility.isNullOrEmpty(newValue)
                ? true
                : moment(newValue).isValid();
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
    DateTimeController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName, '$element'];
    return DateTimeController;
}(input_1.InputController));
exports.DateTimeController = DateTimeController;
var dateTime = _.clone(input_1.input);
dateTime.template = require('./dateTime.html');
dateTime.controller = exports.controllerName;
dateTime.controllerAs = 'dateTime';
var dateTimeBindings = dateTime.bindings;
dateTimeBindings.minuteStepping = '<?';
dateTimeBindings.useDate = '<?';
dateTimeBindings.useTime = '<?';
dateTimeBindings.min = '<?';
dateTimeBindings.max = '<?';
dateTimeBindings.clearButton = '<?';
dateTimeBindings.onClearEvent = '<?';
angular.module(exports.moduleName, [typescript_angular_utilities_1.services.moment.moduleName, typescript_angular_utilities_1.services.date.moduleName, input_1.moduleName, __object.moduleName])
    .component(exports.componentName, dateTime)
    .controller(exports.controllerName, DateTimeController);
//# sourceMappingURL=dateTime.js.map