'use strict';
// /// <reference path='../../../typings/bootstrapDateTimePicker.d.ts' />
var angular = require('angular');
var moment = require('moment');
exports.moduleName = 'rl.ui.components.dateTimeStatic';
exports.componentName = 'rlDateTimeStatic';
exports.controllerName = 'DateTimeStaticController';
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __date = typescript_angular_utilities_1.services.date;
var DateTimeStaticController = (function () {
    function DateTimeStaticController(dateUtility) {
        this.dateUtility = dateUtility;
        if (this.dateValue != null && this.dateUtility.isDate(this.dateValue)) {
            this.dateValue = moment(this.dateValue);
            this.displayValue = this.dateValue.format(__date.defaultFormats.dateFormat);
            this.timezone = this.dateValue.zoneAbbr();
            if (this.includeTime) {
                this.displayTimeZone = true;
                this.displayValue = this.displayValue + ' ' + this.dateValue.format(__date.defaultFormats.timeFormat);
            }
        }
    }
    DateTimeStaticController.$inject = [__date.serviceName];
    return DateTimeStaticController;
}());
exports.DateTimeStaticController = DateTimeStaticController;
var dateTimeStaticComponent = {
    template: require('./dateTimeStatic.html'),
    controller: exports.controllerName,
    controllerAs: 'view',
    bindings: {
        dateValue: '<',
        includeTime: '<?',
        displayTimeZone: '<?',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, dateTimeStaticComponent)
    .controller(exports.controllerName, DateTimeStaticController);
//# sourceMappingURL=dateTimeStatic.js.map