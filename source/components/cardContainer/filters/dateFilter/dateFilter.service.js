'use strict';
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __date = typescript_angular_utilities_1.services.date;
exports.factoryName = 'rlDateFilterFactory';
var DateFilter = (function () {
    function DateFilter(valueSelector, dateUtility, type) {
        this.valueSelector = valueSelector;
        this.dateUtility = dateUtility;
        this.type = type;
        this.includeTime = false;
    }
    DateFilter.prototype.filter = function (item) {
        if (!this.dateUtility.isDate(this.selectedDate1)) {
            return true;
        }
        if (this.dateRange) {
            var itemDate = this.getValue(item);
            var selectedDate1;
            //have to set the selectedDate1 to a valid Date object for comparisons.
            if (this.includeTime) {
                selectedDate1 = moment(this.selectedDate1).toDate();
            }
            else {
                //increase it by 1 days. to inlcude the selectec date in the range.
                selectedDate1 = moment(this.selectedDate1).add(1, 'days').toDate();
            }
            return this.dateUtility.dateInRange(itemDate, this.selectedDate2, this.selectedDate1);
        }
        else {
            if (this.includeTime) {
                return this.dateUtility.sameDateTime(this.getValue(item), this.selectedDate1);
            }
            else {
                return this.dateUtility.sameDate(this.getValue(item), this.selectedDate1);
            }
        }
    };
    DateFilter.prototype.getValue = function (item) {
        var property = this.valueSelector;
        return item[property];
    };
    return DateFilter;
})();
dateFilterFactory.$inject = [__date.serviceName];
function dateFilterFactory(dateUtility) {
    return {
        getInstance: function (settings) {
            return new DateFilter(settings.valueSelector, dateUtility, settings.type);
        },
    };
}
exports.dateFilterFactory = dateFilterFactory;
//# sourceMappingURL=dateFilter.service.js.map