'use strict';
var angular = require('angular');
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __date = typescript_angular_utilities_1.services.date;
var __object = typescript_angular_utilities_1.services.object;
exports.moduleName = 'rl.ui.filters.date';
exports.filterName = 'rlDate';
dateFilter.$inject = [];
function dateFilter() {
    'use strict';
    return function (date, includeTime) {
        if (__object.objectUtility.isNullOrEmpty(date)) {
            return '';
        }
        var momentDate = moment(date);
        if (includeTime) {
            return momentDate.format(__date.defaultFormats.dateTimeFormat) + ' ' + momentDate.zoneAbbr();
        }
        else {
            return momentDate.format(__date.defaultFormats.dateFormat);
        }
    };
}
angular.module(exports.moduleName, [])
    .filter(exports.filterName, dateFilter);
//# sourceMappingURL=date.filter.js.map