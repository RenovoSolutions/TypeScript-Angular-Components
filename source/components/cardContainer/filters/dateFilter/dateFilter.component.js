// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __date = typescript_angular_utilities_1.services.date;
exports.componentName = 'rlDateFilter';
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
                return moment(this.filter.selectedDate1);
            }
            else {
                //clear input field of date value. and rest past day/week count
                this.inputField.val('');
                this.clearCount();
                return null;
            }
        },
        set: function (dateString) {
            if (this.dateUtility.isDate(dateString)) {
                this.filter.selectedDate1 = moment(dateString);
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
        set: function (date) {
            this.filter.selectedDate2 = date;
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
            this.selectedDate2 = moment(this.selectedDate1).add((this.count * -1), this.type);
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
            this.selectedDate1 = this.dateUtility.getNow();
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
}());
exports.DateFilterController = DateFilterController;
exports.dateFilter = {
    template: require('./dateFilter.html'),
    controller: exports.controllerName,
    controllerAs: 'filter',
    bindings: {
        filter: '<',
        source: '<?',
        label: '@',
        includeTime: '<?',
        includeDateRange: '<?',
        clearButton: '<?'
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlRmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7QUFFM0QsWUFBWSxDQUFDO0FBR2IsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakMsNkNBQXVCLDhCQUE4QixDQUFDLENBQUE7QUFDdEQsSUFBTyxNQUFNLEdBQUcsdUNBQVEsQ0FBQyxJQUFJLENBQUM7QUFNbkIscUJBQWEsR0FBVyxjQUFjLENBQUM7QUFDdkMsc0JBQWMsR0FBVyx3QkFBd0IsQ0FBQztBQUU3RCwwQ0FBMEM7QUFDMUMsSUFBSyxXQUFnQztBQUFyQyxXQUFLLFdBQVc7SUFBRywyQ0FBRyxDQUFBO0lBQUUsNkNBQUksQ0FBQTtJQUFFLCtDQUFLLENBQUE7QUFBQyxDQUFDLEVBQWhDLFdBQVcsS0FBWCxXQUFXLFFBQXFCO0FBQUEsQ0FBQztBQWN0QztJQVlDLDhCQUFvQixNQUFzQixFQUFVLFdBQWdDLEVBQVUsUUFBa0M7UUFBNUcsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBcUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQVZoSSxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBTWxCLFNBQUksR0FBVyxNQUFNLENBQUM7UUFLckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQTtRQUMxQywwRUFBMEU7UUFDMUUsa0ZBQWtGO1FBQ2xGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFD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