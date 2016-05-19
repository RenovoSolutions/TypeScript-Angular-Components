"use strict";
var moment = require('moment');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __transform = typescript_angular_utilities_1.services.transform.transform;
exports.factoryName = 'rlDateFilterFactory';
var DateFilter = (function () {
    function DateFilter(settings, dateUtility) {
        this.dateUtility = dateUtility;
        this.valueSelector = settings.valueSelector;
        this.type = settings.type;
        this.clearButton = settings.clearButton;
        this.includeDateRange = settings.includeDateRange;
        this.includeTime = settings.includeTime != null ? settings.includeTime : false;
        this.label = settings.label;
        this.template = "<rl-date-filter filter=\"filter\" source=\"dataSource\" label=\"{{filter.label}}\" include-time=\"filter.includeTime\"\n\t\t\t\t\t\t\t\t\t     include-date-range=\"filter.includeDateRange\" clear-button=\"filter.clearButton\"></rl-date-filter>";
    }
    DateFilter.prototype.filter = function (item) {
        if (!this.dateUtility.isDate(this.selectedDate1)) {
            return true;
        }
        if (this.dateRange) {
            var itemDate = this.getValue(item);
            var selectedDate1 = void 0;
            //have to set the selectedDate1 to a valid Date object for comparisons.
            if (this.includeTime) {
                selectedDate1 = moment(this.selectedDate1);
            }
            else {
                //increase it by 1 days. to inlcude the selectec date in the range.
                selectedDate1 = moment(this.selectedDate1).add(1, 'days');
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
        return __transform.getValue(item, this.valueSelector);
    };
    return DateFilter;
}());
dateFilterFactory.$inject = [typescript_angular_utilities_1.downgrade.dateServiceName];
function dateFilterFactory(dateUtility) {
    return {
        getInstance: function (settings) {
            return new DateFilter(settings, dateUtility);
        },
    };
}
exports.dateFilterFactory = dateFilterFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUZpbHRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0ZUZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFZLE1BQU0sV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUVqQyw2Q0FBMkMsOEJBQThCLENBQUMsQ0FBQTtBQUUxRSxJQUFPLFdBQVcsR0FBRyx1Q0FBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFFdkMsbUJBQVcsR0FBVyxxQkFBcUIsQ0FBQztBQXVCdkQ7SUFlQyxvQkFBWSxRQUE2QixFQUFVLFdBQWdDO1FBQWhDLGdCQUFXLEdBQVgsV0FBVyxDQUFxQjtRQUNsRixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDL0UsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcscVBBQzZGLENBQUM7SUFDL0csQ0FBQztJQUVELDJCQUFNLEdBQU4sVUFBTyxJQUFTO1FBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDYixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxRQUFRLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakQsSUFBSSxhQUFhLFNBQWUsQ0FBQztZQUVqQyx1RUFBdUU7WUFDdkUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxtRUFBbUU7Z0JBQ25FLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDM0QsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdkYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNFLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztJQUVPLDZCQUFRLEdBQWhCLFVBQWlCLElBQVM7UUFDekIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUYsaUJBQUM7QUFBRCxDQUFDLEFBekRELElBeURDO0FBTUQsaUJBQWlCLENBQUMsT0FBTyxHQUFHLENBQUMsd0NBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN4RCwyQkFBa0MsV0FBZ0M7SUFDakUsTUFBTSxDQUFDO1FBQ04sV0FBVyxZQUFDLFFBQTZCO1lBQ3hDLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBTmUseUJBQWlCLG9CQU1oQyxDQUFBIn0=