// /// <reference path='../../../typings/node/node.d.ts' />
"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlRmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7O0FBRzNELElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpDLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBTXhELHFCQUFhLEdBQVcsY0FBYyxDQUFDO0FBQ3ZDLHNCQUFjLEdBQVcsd0JBQXdCLENBQUM7QUFFN0QsMENBQTBDO0FBQzFDLElBQUssV0FBZ0M7QUFBckMsV0FBSyxXQUFXO0lBQUcsMkNBQUcsQ0FBQTtJQUFFLDZDQUFJLENBQUE7SUFBRSwrQ0FBSyxDQUFBO0FBQUMsQ0FBQyxFQUFoQyxXQUFXLEtBQVgsV0FBVyxRQUFxQjtBQUFBLENBQUM7QUFjdEM7SUFjQyw4QkFBb0IsTUFBc0IsRUFBVSxXQUFnQyxFQUFVLFFBQWtDO1FBZGpJLGlCQTBIQztRQTVHb0IsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBcUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQVpoSSxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBTWxCLFNBQUksR0FBVyxNQUFNLENBQUM7UUFPckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQTtRQUMxQywwRUFBMEU7UUFDMUUsa0ZBQWtGO1FBQ2xGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFekIsTUFBTSxDQUFDLE1BQU0s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