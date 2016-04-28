// /// <reference path='../../../typings/node/node.d.ts' />
'use strict';
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
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
        var _this = this;
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
        $scope.$watch('filter.selectedDate1', function (date) {
            if (date == null) {
                _this.inputField.val('');
                _this.clearCount();
            }
            _this.filter.selectedDate1 = date;
            _this.refreshDataSource();
        });
    }
    Object.defineProperty(DateFilterController.prototype, "selectedDate2", {
        // public get selectedDate1(): moment.Moment {
        // 	if (this.filter.selectedDate1 != null) {
        // 		return moment(this.filter.selectedDate1);
        // 	} else {
        // 		return null;
        // 	}
        // }
        // public set selectedDate1(dateString: moment.Moment) {
        // 	if (this.dateUtility.isDate(dateString)) {
        // 		this.filter.selectedDate1 = moment(dateString);
        // 	} else {
        // 		//clear input field of date value. and rest past day/week count
        // 		this.inputField.val('');
        // 		this.clearCount();
        // 		this.filter.selectedDate1 = null;
        // 	}
        // 	this.refreshDataSource();
        // }
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
    DateFilterController.$inject = ['$scope', typescript_angular_utilities_1.downgrade.dateServiceName, '$element'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlRmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7QUFFM0QsWUFBWSxDQUFDO0FBR2IsSUFBWSxNQUFNLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakMsNkNBQW9DLDhCQUE4QixDQUFDLENBQUE7QUFNeEQscUJBQWEsR0FBVyxjQUFjLENBQUM7QUFDdkMsc0JBQWMsR0FBVyx3QkFBd0IsQ0FBQztBQUU3RCwwQ0FBMEM7QUFDMUMsSUFBSyxXQUFnQztBQUFyQyxXQUFLLFdBQVc7SUFBRywyQ0FBRyxDQUFBO0lBQUUsNkNBQUksQ0FBQTtJQUFFLCtDQUFLLENBQUE7QUFBQyxDQUFDLEVBQWhDLFdBQVcsS0FBWCxXQUFXLFFBQXFCO0FBQUEsQ0FBQztBQWN0QztJQWNDLDhCQUFvQixNQUFzQixFQUFVLFdBQWdDLEVBQVUsUUFBa0M7UUFkakksaUJBMEhDO1FBNUdvQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFxQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBWmhJLFVBQUssR0FBVyxDQUFDLENBQUM7UUFNbEIsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQU9yQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFBO1FBQzFDLDBFQUEwRTtRQUMxRSxrRkFBa0Y7UUFDbEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQztZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV6QixN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