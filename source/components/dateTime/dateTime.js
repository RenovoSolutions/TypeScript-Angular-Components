'use strict';
// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />
var angular = require('angular');
var $ = require('jquery');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
exports.moduleName = 'rl.ui.components.dateTime';
exports.directiveName = 'rlDateTime';
var __dateTimeFormatStrings = typescript_angular_utilities_1.services.date;
dateTime.$inject = [typescript_angular_utilities_1.services.moment.serviceName, __dateTimeFormatStrings.dateTimeFormatServiceName];
function dateTime(moment, dateTimeFormatStrings) {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<div class=\"input-group\" ng-class=\"{ 'has-warning': !validFormat}\" id=\"{{inputId}}\">\n\t\t\t\t<input type=\"text\" class=\"form-control\" ng-model=\"ngModel\" />\n\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t<button class=\"btn btn-default show-date-picker\" ng-click=\"toggle()\"><i class=\"fa fa-calendar\"></i></button>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t",
        require: '?^ngModel',
        scope: {
            minuteStepping: '=',
            ngModel: '=',
            useDate: '=',
            useTime: '=',
            min: '=',
            max: '=',
        },
        link: function (scope, element, attrs, ngModel) {
            // defaults to true
            var hasDate = scope.useDate != null ? scope.useDate : true;
            var hasTime = scope.useTime != null ? scope.useTime : true;
            var defaults = element.datetimepicker.defaults;
            var min = scope.min != null ? scope.min : defaults.minDate;
            var max = scope.max != null ? scope.max : defaults.maxDate;
            scope.$watch('ngModel', function (newValue) {
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
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, dateTime);
//# sourceMappingURL=dateTime.js.map