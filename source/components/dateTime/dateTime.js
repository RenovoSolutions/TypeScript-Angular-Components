'use strict';
// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />
require('../../../libraries/bootstrap-datetimepicker/index');
var angular = require('angular');
var $ = require('jquery');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __dateTimeFormatStrings = typescript_angular_utilities_1.services.date;
var __object = typescript_angular_utilities_1.services.object;
var __guid = typescript_angular_utilities_1.services.guid;
var required_1 = require('../../behaviors/required/required');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.dateTime';
exports.directiveName = 'rlDateTime';
exports.controllerName = 'DateTimeController';
var DateTimeController = (function () {
    function DateTimeController($scope, $attrs, componentValidatorFactory) {
        var _this = this;
        if (__object.objectUtility.isNullOrEmpty($attrs.name)) {
            $attrs.$set('name', 'date-time-' + __guid.guid.random());
        }
        var unregister = $scope.$watch(function () { return _this.ngModel; }, function (value) {
            var validators = [];
            if (!_.isUndefined(_this.validator)) {
                validators.push(_this.validator);
            }
            if (_this.required != null) {
                validators.push({
                    name: 'rlRequired',
                    validate: function () { return !__object.objectUtility.isNullOrEmpty(_this.ngModel.$viewValue); },
                    errorMessage: _this.required.message,
                });
            }
            if (_.some(validators)) {
                _this.dateTimeValidator = componentValidatorFactory.getInstance({
                    ngModel: _this.ngModel,
                    $scope: $scope,
                    validators: validators,
                });
            }
            unregister();
        });
    }
    DateTimeController.prototype.onClearClick = function () {
        this.ngModel.$setViewValue('');
        this.onClearEvent();
    };
    DateTimeController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName];
    return DateTimeController;
}());
exports.DateTimeController = DateTimeController;
dateTime.$inject = [typescript_angular_utilities_1.services.moment.serviceName, __dateTimeFormatStrings.dateTimeFormatServiceName, __object.serviceName];
function dateTime(moment, dateTimeFormatStrings, object) {
    'use strict';
    return {
        restrict: 'E',
        template: require('./dateTime.html'),
        require: ['ngModel', '?' + required_1.directiveName],
        controller: exports.controllerName,
        controllerAs: 'dateTime',
        scope: {},
        bindToController: {
            minuteStepping: '=',
            useDate: '=',
            useTime: '=',
            min: '=',
            max: '=',
            validator: '=',
            clearButton: '=',
            onClearEvent: '&'
        },
        link: function (scope, element, attrs, controllers) {
            var dateTime = scope.dateTime;
            var ngModel = controllers[0];
            dateTime.required = controllers[1];
            dateTime.ngModel = ngModel;
            // defaults to true
            var hasDate = _.isUndefined(dateTime.useDate) ? true : dateTime.useDate;
            var hasTime = _.isUndefined(dateTime.useTime) ? true : dateTime.useTime;
            var defaults = element.datetimepicker.defaults;
            var min = dateTime.min != null ? dateTime.min : defaults.minDate;
            var max = dateTime.max != null ? dateTime.max : defaults.maxDate;
            scope.$watch(function () { return ngModel.$viewValue; }, function (newValue) {
                dateTime.validFormat = object.isNullOrEmpty(newValue)
                    ? true
                    : moment(newValue).isValid();
            });
            element.find('.show-date-picker').datetimepicker({
                stepping: dateTime.minuteStepping || 1,
                format: dateTime.format || defaultFormat(hasDate, hasTime),
                direction: 'bottom',
                elementHeight: 2,
                pickDate: hasDate,
                pickTime: hasTime,
                minDate: min,
                maxDate: max,
            }).on('change.dp', function () {
                var newValue = $(this).find('input').val();
                ngModel.$setViewValue(newValue);
                scope.$apply();
            });
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
angular.module(exports.moduleName, [typescript_angular_utilities_1.services.moment.moduleName, typescript_angular_utilities_1.services.date.moduleName, componentValidator_service_1.moduleName, __object.moduleName])
    .directive(exports.directiveName, dateTime)
    .controller(exports.controllerName, DateTimeController);
//# sourceMappingURL=dateTime.js.map