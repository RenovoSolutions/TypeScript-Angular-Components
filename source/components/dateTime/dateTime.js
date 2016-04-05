'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />
require('../../../libraries/bootstrap-datetimepicker/index');
var angular = require('angular');
var $ = require('jquery');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __dateTimeFormatStrings = typescript_angular_utilities_1.services.date;
var __object = typescript_angular_utilities_1.services.object;
var __timezone = typescript_angular_utilities_1.services.timezone;
var input_1 = require('../input/input');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
var required_1 = require('../../behaviors/required/required');
exports.moduleName = 'rl.ui.components.dateTime';
exports.directiveName = 'rlDateTime';
exports.controllerName = 'DateTimeController';
var DateTimeController = (function (_super) {
    __extends(DateTimeController, _super);
    function DateTimeController($scope, $attrs, componentValidatorFactory) {
        _super.call(this, $scope, $attrs, componentValidatorFactory);
        this.inputType = 'date-time';
        this.useDate = _.isUndefined(this.useDate) ? true : this.useDate;
        this.useTime = _.isUndefined(this.useTime) ? true : this.useTime;
    }
    DateTimeController.prototype.onClearClick = function () {
        this.ngModel.$setViewValue('');
        this.onClearEvent();
    };
    DateTimeController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName];
    return DateTimeController;
}(input_1.InputController));
exports.DateTimeController = DateTimeController;
dateTime.$inject = [typescript_angular_utilities_1.services.moment.serviceName, __dateTimeFormatStrings.dateTimeFormatServiceName, __object.serviceName];
function dateTime(moment, dateTimeFormatStrings, object) {
    'use strict';
    return {
        restrict: 'E',
        template: require('./dateTime.html'),
        require: { ngModel: 'ngModel', required: '?' + required_1.directiveName },
        controller: exports.controllerName,
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
        link: function (scope, element, attrs, controllers) {
            var dateTime = scope.dateTime;
            var ngModel = controllers.ngModel;
            dateTime.ngModel = ngModel;
            var defaults = element.datetimepicker.defaults;
            var min = dateTime.min != null ? dateTime.min : defaults.minDate;
            var max = dateTime.max != null ? dateTime.max : defaults.maxDate;
            ngModel.$formatters.push(function (value) {
                if (value == null) {
                    dateTime.timezone = __timezone.timezoneService.currentTimezone;
                    return null;
                }
                dateTime.timezone = __timezone.timezones.get(value.tz());
                return moment(value).format(getFormatOrDefault());
            });
            ngModel.$parsers.push(function (value) {
                return __timezone.timezoneService.buildMomentWithTimezone(value, dateTime.timezone, getFormatOrDefault());
            });
            scope.$watch(function () { return ngModel.$modelValue; }, function (newValue) {
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
            }).on('change.dp', function () {
                var newValue = $(this).find('input').val();
                ngModel.$setViewValue(newValue);
                scope.$apply();
            });
            function getFormatOrDefault() {
                return dateTime.format || defaultFormat(dateTime.useDate, dateTime.useTime);
            }
            function defaultFormat(hasDate, hasTime) {
                if (hasDate && hasTime) {
                    return dateTimeFormatStrings.dateTimeFormat;
                }
                else if (hasDate) {
                    return dateTimeFormatStrings.dateFormat;
                }
                else if (hasTime) {
                    return dateTimeFormatStrings.timeFormat;
                }
                else {
                    // revert to default format
                    return false;
                }
            }
        },
    };
}
angular.module(exports.moduleName, [typescript_angular_utilities_1.services.moment.moduleName, typescript_angular_utilities_1.services.date.moduleName, input_1.moduleName, __object.moduleName])
    .directive(exports.directiveName, dateTime)
    .controller(exports.controllerName, DateTimeController);
//# sourceMappingURL=dateTime.js.map