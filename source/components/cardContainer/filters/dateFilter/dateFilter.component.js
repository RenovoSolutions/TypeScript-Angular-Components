// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __date = typescript_angular_utilities_1.services.date;
exports.directiveName = 'rlDateFilter';
exports.controllerName = 'rlDateFilterController';
// Optional interface for bound attributes
var DateOptions;
(function (DateOptions) {
    DateOptions[DateOptions["Day"] = 0] = "Day";
    DateOptions[DateOptions["Week"] = 1] = "Week";
    DateOptions[DateOptions["Month"] = 2] = "Month";
})(DateOptions || (DateOptions = {}));
;
var DateFilterController = (function () {
    function DateFilterController($scope, dateUtility, $element) {
        this.$scope = $scope;
        this.dateUtility = dateUtility;
        this.$element = $element;
        this.count = 0;
        this.type = "days";
        this.filter.includeTime = this.includeTime;
        //this is added to address an agular quirk on the service event list page.
        //the input field was not clearing correclty when the selectedDate1 value is null.
        this.inputField = this.$element.find('rl-date-time input');
        this.filter.dateRange = false;
        if (this.clearButton == null)
            this.clearButton = true;
    }
    Object.defineProperty(DateFilterController.prototype, "selectedDate1", {
        get: function () {
            if (this.filter.selectedDate1 != null) {
                return moment(this.filter.selectedDate1).format('M/D/YYYY');
            }
            else {
                //clear input field of date value. and rest past day/week count
                this.inputField.val('');
                this.clearCount();
                return null;
            }
        },
        set: function (v) {
            if (this.dateUtility.isDate(v)) {
                this.filter.selectedDate1 = moment(v).toDate();
            }
            else {
                //clear input field of date value. and rest past day/week count
                this.inputField.val('');
                this.clearCount();
                this.filter.selectedDate1 = null;
            }
            this.refreshDataSource();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFilterController.prototype, "selectedDate2", {
        get: function () {
            return this.filter.selectedDate2;
        },
        set: function (v) {
            this.filter.selectedDate2 = v;
            this.refreshDataSource();
        },
        enumerable: true,
        configurable: true
    });
    DateFilterController.prototype.refreshDataSource = function () {
        if (this.source != null) {
            this.source.refresh();
        }
        else {
            this.$scope.$emit('dataSource.requestRefresh'); //*event?
        }
    };
    DateFilterController.prototype.clearCount = function () {
        this.count = 0;
        this.countChange();
    };
    DateFilterController.prototype.decreaseCount = function () {
        this.count -= 1;
        this.setDateTimeNowIfNull();
        //do not allow count below 0
        if (this.count < 0 || this.count === 0) {
            this.count = 0;
        }
        this.countChange();
    };
    DateFilterController.prototype.countChange = function () {
        if (this.count == null) {
            this.count = 0;
        }
        if (this.count > 0) {
            this.filter.dateRange = true;
            // add days has to be a negative number to go backwords.
            this.selectedDate2 = moment(this.selectedDate1).add(this.type, (this.count * -1)).toDate();
        }
        else if (this.count == 0) {
            //only change this values the first time.
            if (this.filter.dateRange) {
                this.filter.dateRange = false;
                this.selectedDate2 = null;
            }
        }
    };
    DateFilterController.prototype.increaseCount = function () {
        this.count += 1;
        this.setDateTimeNowIfNull();
        this.countChange();
    };
    DateFilterController.prototype.setDateTimeNowIfNull = function () {
        if (this.selectedDate1 == null) {
            this.selectedDate1 = moment(Date.now()).format('M/D/YYYY');
        }
    };
    DateFilterController.prototype.toggle = function () {
        if (this.type === 'days') {
            this.type = 'weeks';
        }
        else {
            this.type = 'days';
        }
        this.countChange();
    };
    DateFilterController.$inject = ['$scope', __date.serviceName, '$element'];
    return DateFilterController;
})();
exports.DateFilterController = DateFilterController;
function dateFilter() {
    'use strict';
    return {
        restrict: 'E',
        template: require('./dateFilter.html'),
        controller: exports.controllerName,
        controllerAs: 'filter',
        scope: {},
        bindToController: {
            filter: '=',
            source: '=',
            label: '@',
            selector: '=',
            includeTime: '=',
            includeDateRange: '=',
            clearButton: '='
        },
    };
}
exports.dateFilter = dateFilter;
//# sourceMappingURL=dateFilter.component.js.map